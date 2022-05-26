import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivitiesService } from '../../../activity/services/activities.service';
import { ActivitySelectText } from '../../../activity/models/ActivitySelectText.dto';
import {
  debounceTime,
  filter,
  fromEvent,
  map,
  merge,
  Subscription,
  tap,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TextSelection } from '../../../activity/models/ActivitySelectText.dto';
import { CustomArrayMethods } from 'src/app/shared/utils/arrays';
import {
  Answer,
  AnswerOption,
  AnswerType,
} from '../../../activity/models/Answer.dto';
import { textSelection } from './play-select-text.get-selection-utils';
import {
  addSelection,
  mergeAdjacents,
  orderSelectionArray,
  removeSubsets,
} from './play-select-text.selections-utils';

@Component({
  selector: 'app-play-select-text',
  templateUrl: './play-select-text.component.html',
  styleUrls: ['./play-select-text.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class PlaySelectTextComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  activity$!: Subscription;
  activity!: ActivitySelectText;
  UIevents$!: Subscription;
  selectedText!: TextSelection[];
  idMainSelector: string = 'activityMainText';
  idSecondarySelector: string = 'activitySecondaryText';
  idSecondarySelectorExp: RegExp = new RegExp(
    `${this.idSecondarySelector}-[0-9]+`,
    ''
  );
  idHighlightedSelector: string = 'activityHighlightedText';
  answers!: Answer;
  completed: boolean = false;

  constructor(
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedText = [];
    const activityId: string | null =
      this.activatedRoute.snapshot.paramMap.get('id');

    if (activityId) {
      this.activity$ = this.activitiesService
        .getActivityById(activityId)
        .subscribe((activity: ActivitySelectText) => {
          this.classInitializer(activity);
        });
    }
  }

  ngAfterViewInit(): void {
    const UItouchEvents$ = fromEvent(document, 'touchend');
    const UImouseEvents$ = fromEvent(document, 'mouseup');
    this.UIevents$ = merge(UItouchEvents$, UImouseEvents$)
      .pipe(
        debounceTime(500),
        map((): Selection => {
          const selection: Selection | null = window.getSelection();
          return selection as Selection;
        }),
        filter((data: any) => data !== undefined || data !== null),
        filter((selection: Selection) => {
          const directParentId = selection?.anchorNode?.parentElement?.id || '';
          const isMainSelector = directParentId === this.idMainSelector;
          const isSecondarySelector = this.idSecondarySelectorExp.test(
            directParentId || ''
          );
          const isHighlightedSelector =
            directParentId === this.idHighlightedSelector;
          return isMainSelector || isSecondarySelector || isHighlightedSelector;
        }),
        filter((selection: Selection) => !selection.isCollapsed),
        map(
          (selection: Selection): TextSelection =>
            this.getTextSelection(selection)
        )
      )
      .subscribe((textSelection: TextSelection) => {
        this.updateSelectionArray(textSelection);
      });
  }

  ngOnDestroy(): void {
    this.activity$.unsubscribe();
    this.UIevents$.unsubscribe();
  }

  classInitializer(activity: ActivitySelectText): void {
    this.activity = this.activitiesService.initializeActivity(
      activity
    ) as ActivitySelectText;
  }

  getTextSelection(selection: Selection): TextSelection {
    return textSelection(selection, this.activity?.text);
  }

  updateSelectionArray(newSelection: TextSelection): void {
    const newArray = addSelection(newSelection, this.selectedText);
    const orderedArray = orderSelectionArray(newArray);
    const withoutSubsets = removeSubsets(orderedArray);
    const mergedAdjacents = mergeAdjacents(withoutSubsets);
    console.log('current >>> ', mergedAdjacents);
    this.selectedText = mergedAdjacents;
  }

  getText(): string {
    return this.activity?.text ? this.activity.text : '';
  }

  setAnswers(): Answer {
    let correct = 0;
    let incorrect = 0;
    let counter = this.activity.positions.length;
    let answersMap = new Map(
      this.activity.positions.map((position) => [
        position.start,
        { start: position.start, end: position.end, id: position.index },
      ])
    );
    let userAnswers = CustomArrayMethods.arraySort(this.selectedText, 'start');
    let formatedAnswers: AnswerOption[] = [];

    for (let answer of userAnswers) {
      let foundAnswer = answersMap.get(answer.start);
      if (foundAnswer) {
        if (
          foundAnswer.start === answer.start &&
          foundAnswer.end === answer.end
        ) {
          correct++;
          formatedAnswers.push({
            id: String(foundAnswer.id),
            selected: answer.selected,
            value: AnswerType.CORRECT,
            position: {
              start: Number(answer.start),
              end: Number(answer.end),
            },
          });
        } else {
          incorrect++;
          counter++;
          formatedAnswers.push({
            id: String(counter),
            selected: answer.selected,
            value: AnswerType.INCORRECT,
            position: {
              start: Number(answer.start),
              end: Number(answer.end),
            },
          });
        }
      }
    }

    return new Answer({
      total: this.activity?.positions?.length,
      correct: correct,
      incorrect: incorrect,
      pointsPerQuestion: this.activity?.scores.scorePerQuestion,
      activityId: this.activity?.id,
      userId: 'MOCK_USER_ID',
      answers: formatedAnswers,
    });
  }

  getResults(): void {
    this.answers = this.setAnswers();
    console.log('answers', this.answers);
    console.log('scores', this.answers.scores);
    this.completed = true;
  }

  replay(): void {
    this.completed = !this.completed;
  }

  removeSelections(): void {
    this.selectedText = [];
  }
}