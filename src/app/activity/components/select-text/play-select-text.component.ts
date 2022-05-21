import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { ActivitySelectText } from '../../models/ActivitySelectText.dto';
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
import { TextSelection } from '../../models/ActivitySelectText.dto';
import { CustomArrayMethods } from 'src/app/shared/utils/arrays';
import { Answer, AnswerOption, AnswerType } from '../../models/Answer.dto';
import { ImproveBreaklinesPipe } from '../../pipes/improve-breaklines.pipe';
import { ID_HIGHLIGHT } from '../../pipes/highlight-text.marks';

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
          // console.log(
          //   'raw selection >>>',
          //   selection?.anchorOffset,
          //   selection?.focusOffset,
          //   selection?.anchorNode?.parentElement?.id
          // );
          return selection as Selection;
        }),
        filter((data: any) => data !== undefined || data !== null),
        filter(
          (selection: Selection) =>
            selection?.anchorNode?.parentElement?.id === this.idMainSelector ||
            this.idSecondarySelectorExp.test(
              selection?.anchorNode?.parentElement?.id || ''
            ) ||
            selection?.anchorNode?.parentElement?.id ===
              this.idHighlightedSelector
        ),
        map(
          (selection: Selection): TextSelection =>
            this.getTextSelection(selection)
        )
        // map((textSelection: TextSelection): TextSelection => {
        //   const realPosition = this.calculateRealPosition(this.activity.text);
        //   const adaptedTextSelection: TextSelection = {
        //     selected: textSelection.selected,
        //     start: realPosition + textSelection.start,
        //     end: realPosition + textSelection.end,
        //     parent: textSelection.parent,
        //   };
        //   return adaptedTextSelection;
        // })
      )
      .subscribe((textSelection: TextSelection) => {
        // console.log('Adapted text selection:', textSelection);
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
    const stringSelection = selection?.toString() || '';
    // const anchorParent = selection?.anchorNode?.parentElement?.id;
    // const focusParent = selection?.focusNode?.parentElement?.id;
    // const anchorParentNumber = Number(anchorParent?.split('-')[1]);
    // const focusParentNumber = Number(focusParent?.split('-')[1]);
    const superText = new ImproveBreaklinesPipe().transform(
      this.activity?.text
    );

    const partition = new RegExp(`<p id=\"activitySecondaryText-[0-9]+\">`, '');
    const pieces = superText.split(partition);
    let count = 0;
    const cleanPieces = pieces
      .slice(1, pieces.length)
      .map((piece) => piece.replace('</p>', ''))
      .map((piece) => ({
        value: piece,
        length: piece.length,
        start: 0,
        end: 0,
        startParentNumber: 0,
      }));
    cleanPieces[0].end = cleanPieces[0].length - 1;
    for (let i = 1; i < cleanPieces.length; i++) {
      cleanPieces[i].start =
        cleanPieces[i - 1].start + cleanPieces[i - 1].length - 1 + 2;
      count = cleanPieces[i].start;
      cleanPieces[i].end = cleanPieces[i].start + cleanPieces[i].length - 1;
      cleanPieces[i].startParentNumber = i;
    }
    console.log('pieces >>> ', cleanPieces);
    const anchor = selection?.anchorOffset || 0;
    const focus = selection?.focusOffset || 0;
    // treats RTL selection as LTR selection
    let start = 0;
    let end = 0;
    let startParentOffset = 0;
    let endParentOffset = 0;
    let startParent = '';
    let endParent = '';
    let startParentNumber = 0;
    let endParentNumber = 0;
    let startHighlighted = false;
    let endHighlighted = false;

    if (startParentNumber === endParentNumber) {
      start = Math.min(anchor, focus);
      end = Math.max(anchor, focus);
      startHighlighted =
        selection?.anchorNode?.parentElement?.id === ID_HIGHLIGHT;
      endHighlighted = selection?.focusNode?.parentElement?.id === ID_HIGHLIGHT;
      startParent =
        (startHighlighted
          ? selection?.anchorNode?.parentElement?.parentElement?.id
          : selection?.anchorNode?.parentElement?.id) || '';
      endParent =
        (endHighlighted
          ? selection?.focusNode?.parentElement?.parentElement?.id
          : selection?.focusNode?.parentElement?.id) || '';
      startParentNumber = Number(startParent?.split('-')[1]);
      endParentNumber = Number(endParent?.split('-')[1]);
      startParentOffset =
        cleanPieces.find(
          (piece) => piece.startParentNumber === startParentNumber
        )?.start || 0;
      endParentOffset =
        cleanPieces.find((piece) => piece.startParentNumber === endParentNumber)
          ?.start || 0;
    }
    if (startParentNumber < endParentNumber) {
      start = anchor;
      end = focus;
      startHighlighted =
        selection?.anchorNode?.parentElement?.id === ID_HIGHLIGHT;
      endHighlighted = selection?.focusNode?.parentElement?.id === ID_HIGHLIGHT;
      startParent =
        (startHighlighted
          ? selection?.anchorNode?.parentElement?.parentElement?.id
          : selection?.anchorNode?.parentElement?.id) || '';
      endParent =
        (endHighlighted
          ? selection?.focusNode?.parentElement?.parentElement?.id
          : selection?.focusNode?.parentElement?.id) || '';
      startParentNumber = Number(startParent?.split('-')[1]);
      endParentNumber = Number(endParent?.split('-')[1]);
      startParentOffset =
        cleanPieces.find(
          (piece) => piece.startParentNumber === startParentNumber
        )?.start || 0;
      endParentOffset =
        cleanPieces.find((piece) => piece.startParentNumber === endParentNumber)
          ?.start || 0;
    }
    if (startParentNumber > endParentNumber) {
      start = focus;
      end = anchor;
      startHighlighted =
        selection?.focusNode?.parentElement?.id === ID_HIGHLIGHT;
      endHighlighted =
        selection?.anchorNode?.parentElement?.id === ID_HIGHLIGHT;
      startParent =
        (startHighlighted
          ? selection?.focusNode?.parentElement?.parentElement?.id
          : selection?.focusNode?.parentElement?.id) || '';
      endParent =
        (endHighlighted
          ? selection?.anchorNode?.parentElement?.parentElement?.id
          : selection?.anchorNode?.parentElement?.id) || '';
      startParentNumber = Number(endParent?.split('-')[1]);
      endParentNumber = Number(startParent?.split('-')[1]);
      startParentOffset =
        cleanPieces.find((piece) => piece.startParentNumber === endParentNumber)
          ?.start || 0;
      endParentOffset =
        cleanPieces.find(
          (piece) => piece.startParentNumber === startParentNumber
        )?.start || 0;
    }
    // console.log(
    //   `parentOffsets >>> startPaernt: id ${startParentNumber} offset ${startParentOffset}, id ${endParentNumber} offset ${endParentOffset}`
    // );
    // display selObject
    // const selObj = {
    //   anchorNode: selection?.anchorNode,
    //   anchorOffset: selection?.anchorOffset,
    //   focusNode: selection?.focusNode,
    //   focusOffset: selection?.focusOffset,
    //   isCollapsed: selection?.isCollapsed,
    //   type: selection?.type,
    // };
    // console.log('getTextSelection >>> selObj', selObj);
    // console.log('getTextSelection >>> offsets: ', offsets.start, offsets.end);
    // console.log(
    //   `ends >>> previous: ${
    //     length !== 0 ? end - offsets.end - 1 + parentOffset : 0
    //   }, current: ${
    //     (length !== 0 ? start + offsets.start + parentOffset : 0) +
    //     stringSelection.length -
    //     1
    //   }`
    // );
    const leftWhitespaces =
      stringSelection.length - stringSelection.trimStart().length;
    const rightWhitespaces =
      stringSelection.length - stringSelection.trimEnd().length;
    console.log(
      `whiteSpaces >>> l:${stringSelection.length}, cl:${
        stringSelection.trim().length
      }, lw:${leftWhitespaces}, rw:${rightWhitespaces}`
    );
    const calculatedStart = start + startParentOffset + leftWhitespaces;
    const calculatedEnd =
      calculatedStart +
      stringSelection.length -
      1 -
      rightWhitespaces -
      leftWhitespaces -
      (endParentNumber - startParentNumber);
    // const calculatedEnd = length !== 0 ? end - offsets.end - 1 + parentOffset : 0;
    const result = {
      selected: stringSelection.trim(),
      start: calculatedStart,
      end: calculatedEnd,
      startParent: startParent,
      endParent: endParent,
    };
    // const result = {
    //   selected: stringSelection,
    //   start: {
    //     start: calculatedStart,
    //     end: endParentOffset - 1,
    //     id: startParent,
    //   },
    //   end: {
    //     start: endParentOffset,
    //     end: calculatedStart + stringSelection.length - 1,
    //     id: endParent,
    //   }
    // }
    console.log('getTextSelection >>> result: ', result);
    return result;
  }

  // considerPreviousSelections(baseText: string): Function {
  //   // let previousPrefixes = [ ...this.selectedText ].filter( ( selection ) => selection.start < textSelection.start )
  //   function calculateRealPosition(
  //     textSelection: TextSelection
  //   ): TextSelection {
  //     const endText =
  //       window.getSelection()?.anchorNode?.nodeValue?.toString() || '';
  //     const expression = new RegExp(endText, '');
  //     const realPosition = baseText?.match(expression)?.index || 0;
  //     console.log('realPosition:', realPosition);
  //     const adaptedTextSelection = {
  //       ...textSelection,
  //       start: realPosition + textSelection.start,
  //       end: realPosition + textSelection.end,
  //     };
  //     return adaptedTextSelection;
  //   }
  //   return calculateRealPosition;
  // }
  // calculateRealPosition(baseText: string): number {
  //   const endText =
  //     window.getSelection()?.anchorNode?.nodeValue?.toString() || '';
  //   const expression = new RegExp(endText, 'g');
  //   const matches = Array.from(baseText?.matchAll(expression));
  //   if (matches.length > 1)
  //     console.log(
  //       'ooops, it seems there are multiple matches, I cannot decide which is which'
  //     );
  //   const realPosition = matches[0]?.index || 0;
  //   console.log('start counting selection from :', realPosition);
  //   return realPosition;
  // }

  updateSelectionArray(newSelection: TextSelection): void {
    const newArray = this.addSelection(newSelection);
    const orderedArray = this.orderSelectionArray(newArray);
    const withoutSubsets = this.removeSubsets(orderedArray);
    const mergedAdjacents = this.mergeAdjacents(withoutSubsets);
    console.log('current >>> ', mergedAdjacents);
    this.selectedText = mergedAdjacents;
  }

  addSelection(newSelection: TextSelection): TextSelection[] {
    return [...this.selectedText, newSelection];
  }

  orderSelectionArray(unorderedArray: TextSelection[]): TextSelection[] {
    return CustomArrayMethods.arraySort(unorderedArray, 'start');
  }

  removeSubsets(arr: TextSelection[]): TextSelection[] {
    const subsets: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (j === i) {
        } else {
          let first = arr[i].start < arr[j].start ? arr[i] : arr[j];
          let last = arr[i].start < arr[j].start ? arr[j] : arr[i];
          let index = arr[i].start < arr[j].start ? j : i;
          if (first.start <= last.start && last.end <= first.end) {
            if (!subsets.includes(index)) subsets.push(index);
          }
        }
      }
    }
    subsets.sort();
    return arr.filter((e, i) => !subsets.includes(i));
  }

  mergeAdjacents(arr: TextSelection[]): TextSelection[] {
    if (arr.length === 1) return arr;
    const results: TextSelection[] = [];
    let skip = false;
    for (let i = 0; i < arr.length - 1; i++) {
      let first = arr[i];
      let next = arr[i + 1];
      if (skip) {
        skip = false;
        if (i === arr.length - 2) results.push(next);
        continue;
      }
      if (first.end + 1 === next.start) {
        const merged: TextSelection = {
          start: first.start,
          end: next.end,
          selected: `${first.selected}${next.selected}`,
        };
        results.push(merged);
        skip = true;
      } else {
        results.push(first);
        if (i === arr.length - 2) results.push(next);
      }
    }
    return results;
  }

  // oldAddSelection(newSelection: TextSelection): void {
  //   /* first checks colliding selections */
  //   let nonCollidingSelections: TextSelection[] = [];
  //   let collidingSelections: TextSelection[] = [newSelection];
  //   const allCurrentlySelected: TextSelection[] = this.selectedText || [];
  //   for (let selection of allCurrentlySelected) {
  //     const collidingLeftOverlap =
  //       newSelection.start < selection.end && selection.end < newSelection.end; // new selection overlaps with the right side of an existing selection
  //     const collidingRightOverlap =
  //       selection.start < newSelection.end &&
  //       newSelection.start < selection.start; // new selection overlaps with the left side of an existing selection
  //     const collidingSuperset =
  //       newSelection.start <= selection.start &&
  //       selection.end <= newSelection.end; // an existing selection is a subset of the new selection
  //     const collidingSubset =
  //       selection.start < newSelection.start &&
  //       newSelection.end < selection.end; // the new selection is a subset of an existing selection
  //     const collisionCriteria =
  //       collidingLeftOverlap ||
  //       collidingRightOverlap ||
  //       collidingSuperset ||
  //       collidingSubset;
  //     const filterCriterion =
  //       newSelection.start === selection.start &&
  //       newSelection.end === selection.end;
  //     if (!filterCriterion) {
  //       collisionCriteria
  //         ? (collidingSelections = [
  //             ...collidingSelections,
  //             selection,
  //           ] as TextSelection[])
  //         : (nonCollidingSelections = [
  //             ...nonCollidingSelections,
  //             selection,
  //           ] as TextSelection[]);
  //     }
  //   }
  //   /* merge any colliding selections into one */
  //   let mergedCollidingSelections: TextSelection[] = [];
  //   let start: number = -1;
  //   let end: number = -1;
  //   for (let collidingSelection of collidingSelections) {
  //     start =
  //       start > -1
  //         ? Math.min(start, collidingSelection.start)
  //         : collidingSelection.start;
  //     end =
  //       end > -1
  //         ? Math.max(end, collidingSelection.end)
  //         : collidingSelection.end;
  //   }
  //   mergedCollidingSelections = [
  //     ...mergedCollidingSelections,
  //     {
  //       start,
  //       end,
  //       selected: this.activity.text.slice(start, end + 1),
  //     },
  //   ];
  //   /* create the new slections array */
  //   const result = [
  //     ...nonCollidingSelections,
  //     ...mergedCollidingSelections,
  //   ] as TextSelection[];
  //   /* sort the selections */
  //   this.selectedText = CustomArrayMethods.arraySort(result, 'start');
  //   console.log('after checking collisions:', this.selectedText);
  // }

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
    // console.log('time', this.answers.time);
    // console.log('insights', this.answers.insights);
    this.completed = true;
  }

  replay(): void {
    this.completed = !this.completed;
  }
}
