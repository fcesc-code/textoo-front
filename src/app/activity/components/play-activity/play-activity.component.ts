import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { ActivityBestOption } from 'src/app/models/ActivityBestOption.dto';
import { ActivitySelectText } from 'src/app/models/ActivitySelectText.dto';
import { ActivityTransformAspect } from 'src/app/models/ActivityTransformAspect.dto';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play-activity',
  templateUrl: './play-activity.component.html',
  styleUrls: ['./play-activity.component.sass'],
})
export class PlayActivityComponent implements OnInit, OnDestroy {
  activity$!: Subscription;
  activity!: ActivityBestOption | ActivitySelectText | ActivityTransformAspect;

  constructor(
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const activityId: string | null =
      this.activatedRoute.snapshot.paramMap.get('id');

    if (activityId) {
      console.log('activity id detected:', activityId);
      this.activity$ = this.activitiesService
        .getActivity(activityId)
        .pipe(
          tap((data) => {
            console.table(data);
          })
        )
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

  ngOnDestroy(): void {
    this.activity$.unsubscribe();
  }

  classInitializer(activity: any): void {
    switch (activity.type) {
      case 'best-option':
        this.activity = new ActivityBestOption();
        break;
      case 'select-text':
        this.activity = new ActivitySelectText();
        break;
      case 'transform-aspect':
        this.activity = new ActivityTransformAspect();
        break;
    }
  }
}
