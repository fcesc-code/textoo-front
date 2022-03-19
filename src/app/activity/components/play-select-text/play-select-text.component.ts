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
import { HTMLElementEvent } from 'src/app/types/eventTypes';
// import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TextSelection } from 'src/app/models/ActivitySelectText.dto';

@Component({
  selector: 'app-play-select-text',
  templateUrl: './play-select-text.component.html',
  styleUrls: ['./play-select-text.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaySelectTextComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  activity$!: Subscription;
  activity!: ActivityBestOption | ActivitySelectText | ActivityTransformAspect;
  UIevents$!: Subscription;
  selectedText!: TextSelection;
  idSelector: string = 'activityMainText';

  constructor(
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
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
        map((event) => {
          const { target } = event;
          return target as HTMLPreElement;
        }),
        filter((target) => target.id === this.idSelector),
        filter(
          () =>
            document.getSelection()?.anchorNode?.parentElement?.id ===
            this.idSelector
        ),
        map(() => {
          return {
            selected: document.getSelection()?.toString().trim() || '',
            start: document.getSelection()?.anchorOffset || 0,
            end: document.getSelection()?.focusOffset || 0,
          };
        })
      )
      .subscribe((data) => {
        console.log('data received in the subscription:', data);
        this.selectedText = data;
      });
  }

  ngOnDestroy(): void {
    this.activity$.unsubscribe();
    this.UIevents$.unsubscribe();
  }

  classInitializer(activity: any): void {
    const ACTIVITY = this.activitiesService.initializeActivity(activity);
    this.activity = ACTIVITY;
  }
}
