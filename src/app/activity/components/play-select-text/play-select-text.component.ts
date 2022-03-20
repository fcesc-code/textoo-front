import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { ActivityBestOption } from 'src/app/models/ActivityBestOption.dto';
import { ActivitySelectText } from 'src/app/models/ActivitySelectText.dto';
import { ActivityTransformAspect } from 'src/app/models/ActivityTransformAspect.dto';
import { debounceTime, filter, fromEvent, map, Subscription, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TextSelection } from 'src/app/models/ActivitySelectText.dto';
import { CustomArrayMethods } from 'src/app/shared/utils/arrays';

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
  activity!: ActivityBestOption | ActivitySelectText | ActivityTransformAspect;
  UIevents$!: Subscription;
  selectedText!: TextSelection[];
  idSelector: string = 'activityMainText';

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
        .getActivity(activityId)
        .subscribe(
          (
            activity:
              | ActivityBestOption
              | ActivitySelectText
              | ActivityTransformAspect
          ) => {
            this.classInitializer(activity);
          }
        );
    }
  }

  ngAfterViewInit(): void {
    console.log('Entering AfterViewInit');
    this.UIevents$ = fromEvent(document, 'mouseup')
      .pipe(
        debounceTime(500),
        filter(() => document.getSelection()?.toString() !== ''),
        tap(() => console.log('passed filter: it has selected content')),
        map((event) => {
          const { target } = event;
          return target as HTMLPreElement;
        }),
        // filter((target) => target.id === this.idSelector),
        // tap(() => console.log('passed filter: it has the right id')),
        filter(
          () =>
            document.getSelection()?.anchorNode?.parentElement?.id ===
            this.idSelector
        ),
        tap(() => console.log('passed filter: it has the right parent')),
        map(this.getTextSelection),
        map((textSelection: TextSelection): TextSelection => {
          const realPosition = this.calculateRealPosition(this.activity.text);
          const adaptedTextSelection: TextSelection = {
            selected: textSelection.selected,
            start: realPosition + textSelection.start,
            end: realPosition + textSelection.end,
          };
          return adaptedTextSelection;
        })
      )
      .subscribe((textSelection: TextSelection) => {
        console.log('Adapted text selection:', textSelection);
        this.addSelection(textSelection);
      });
  }

  ngOnDestroy(): void {
    this.activity$.unsubscribe();
    this.UIevents$.unsubscribe();
  }

  classInitializer(activity: any): void {
    this.activity = this.activitiesService.initializeActivity(activity);
  }

  getTextSelection(): TextSelection {
    const selection = document.getSelection()?.toString() || '';
    let offsets = {
      start: 0,
      end: 0,
    };
    if (selection.length !== 0) {
      offsets.start = selection.length - selection.trimStart().length;
      offsets.end = selection.length - selection.trimEnd().length;
    }
    const anchor = document.getSelection()?.anchorOffset || 0;
    const focus = document.getSelection()?.focusOffset || 0;
    const start = Math.min(anchor, focus);
    const end = Math.max(anchor, focus);
    const length = end - start;
    return {
      selected: selection.trim(),
      start: length !== 0 ? start + offsets.start : 0,
      end: length !== 0 ? end - offsets.end - 1 : 0,
    };
  }

  // considerPreviousSelections(baseText: string): Function {
  //   // let previousPrefixes = [ ...this.selectedText ].filter( ( selection ) => selection.start < textSelection.start )
  //   function calculateRealPosition(
  //     textSelection: TextSelection
  //   ): TextSelection {
  //     const endText =
  //       document.getSelection()?.anchorNode?.nodeValue?.toString() || '';
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
  calculateRealPosition(baseText: string): number {
    const endText =
      document.getSelection()?.anchorNode?.nodeValue?.toString() || '';
    const expression = new RegExp(endText, '');
    const realPosition = baseText?.match(expression)?.index || 0;
    console.log('realPosition:', realPosition);
    return realPosition;
  }

  addSelection(newSelection: TextSelection): void {
    /* first checks colliding selections */
    let nonCollidingSelections: TextSelection[] = [];
    let collidingSelections: TextSelection[] = [newSelection];
    const allCurrentlySelected: TextSelection[] = this.selectedText || [];
    for (let selection of allCurrentlySelected) {
      const collidingLeftOverlap =
        newSelection.start < selection.end && selection.end < newSelection.end; // new selection overlaps with the right side of an existing selection
      const collidingRightOverlap =
        selection.start < newSelection.end &&
        newSelection.start < selection.start; // new selection overlaps with the left side of an existing selection
      const collidingSuperset =
        newSelection.start <= selection.start &&
        selection.end <= newSelection.end; // an existing selection is a subset of the new selection
      const collidingSubset =
        selection.start < newSelection.start &&
        newSelection.end < selection.end; // the new selection is a subset of an existing selection
      const collisionCriteria =
        collidingLeftOverlap ||
        collidingRightOverlap ||
        collidingSuperset ||
        collidingSubset;
      const filterCriterion =
        newSelection.start === selection.start &&
        newSelection.end === selection.end;
      if (!filterCriterion) {
        collisionCriteria
          ? (collidingSelections = [
              ...collidingSelections,
              selection,
            ] as TextSelection[])
          : (nonCollidingSelections = [
              ...nonCollidingSelections,
              selection,
            ] as TextSelection[]);
      }
    }
    /* merge any colliding selections into one */
    let mergedCollidingSelections: TextSelection[] = [];
    let start: number = -1;
    let end: number = -1;
    for (let collidingSelection of collidingSelections) {
      start =
        start > -1
          ? Math.min(start, collidingSelection.start)
          : collidingSelection.start;
      end =
        end > -1
          ? Math.max(end, collidingSelection.end)
          : collidingSelection.end;
    }
    mergedCollidingSelections = [
      ...mergedCollidingSelections,
      {
        start,
        end,
        selected: this.activity.text.slice(start, end + 1),
      },
    ];
    /* create the new slections array */
    const result = [
      ...nonCollidingSelections,
      ...mergedCollidingSelections,
    ] as TextSelection[];
    /* sort the selections */
    this.selectedText = CustomArrayMethods.arraySort(result, 'start');
    console.log('after checking collisions:', this.selectedText);
  }

  getText(): string {
    return this.activity?.text ? this.activity.text : '';
  }
}
