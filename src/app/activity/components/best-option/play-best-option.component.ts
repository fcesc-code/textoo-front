import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import {
  ActivityBestOption,
  Question_ActivityBestOption,
} from 'src/app/models/ActivityBestOption.dto';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OptionSelection } from 'src/app/models/ActivityBestOption.dto';
import { CustomArrayMethods } from 'src/app/shared/utils/arrays';
import { ID_PREFIX } from '../../pipes/add-option.marks';
import { Answer, AnswerOption, AnswerType } from 'src/app/models/Answer.dto';

@Component({
  selector: 'app-play-best-option',
  templateUrl: './play-best-option.component.html',
  styleUrls: ['./play-best-option.component.sass'],
})
export class PlayBestOptionComponent implements OnInit, OnDestroy {
  activity$!: Subscription;
  activity!: ActivityBestOption;
  selectedOptions!: OptionSelection[];
  idSelector: string = 'activityMainText';
  textWithQuestions!: string;
  questions!: Question_ActivityBestOption[];
  answers!: Answer;
  completed: boolean = false;

  constructor(
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedOptions = [];
    const activityId = this.activatedRoute.snapshot.paramMap.get('id');

    if (activityId) {
      this.activity$ = this.activitiesService
        .getActivity(activityId)
        .subscribe((activity: ActivityBestOption) => {
          this.classInitializer(activity);
        });
    }
    this.textWithQuestions = this.activity.text;
    this.questions = CustomArrayMethods.arraySort(
      this.activity?.questions || [],
      'position'
    );
  }

  ngOnDestroy(): void {
    this.activity$.unsubscribe();
  }

  classInitializer(activity: any): void {
    this.activity = this.activitiesService.initializeActivity(
      activity
    ) as ActivityBestOption;
  }

  setAnswers(): Answer {
    let correct = 0;
    let incorrect = 0;
    let answers: AnswerOption[] = [];

    for (let question of this.questions) {
      const USER_ANSWER_ELEMENT: any = document.querySelector(
        `#${ID_PREFIX}${question.id}`
      );

      if (USER_ANSWER_ELEMENT) {
        const USER_ANSWER_SELECTED =
          USER_ANSWER_ELEMENT.options[USER_ANSWER_ELEMENT.selectedIndex];
        const USER_ANSWER_TEXT = USER_ANSWER_SELECTED?.text;
        const OPTIONS = new Map(
          question.options.map((option) => [
            option.text,
            { index: option.index, value: option.correct },
          ])
        );
        const RESULT = OPTIONS.get(USER_ANSWER_TEXT);
        let value = AnswerType.UNANSWERED;

        if (RESULT !== undefined) {
          RESULT.value ? correct++ : incorrect++;
          RESULT.value === true
            ? (value = AnswerType.CORRECT)
            : (value = AnswerType.INCORRECT);
        }

        const answer: AnswerOption = {
          id: question.id,
          selected: String(RESULT?.index || 0),
          value: value,
        };

        answers.push(answer);
      }
    }

    return new Answer({
      total: this.questions?.length,
      correct: correct,
      incorrect: incorrect,
      pointsPerQuestion: this.activity?.scores.scorePerQuestion,
      activityId: this.activity?.id,
      userId: 'MOCK_USER_ID',
      answers: answers,
    });
  }

  getResults(): void {
    this.answers = this.setAnswers();
    this.completed = true;
  }

  replay(): void {
    console.log('Replay feature - not implemented.');
    this.completed = !this.completed;
  }
}
