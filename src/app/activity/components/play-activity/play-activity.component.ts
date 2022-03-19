import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { ActivityBestOption } from 'src/app/models/ActivityBestOption.dto';
import { ActivitySelectText } from 'src/app/models/ActivitySelectText.dto';
import { ActivityTransformAspect } from 'src/app/models/ActivityTransformAspect.dto';
import { Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play-activity',
  templateUrl: './play-activity.component.html',
  styleUrls: ['./play-activity.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    console.group('classInitializer');
    console.log(`classInitializer called with`, activity);
    const ACTIVITY = this.activitiesService.initializeActivity(activity);
    console.log(`classInitializer got from service:`, ACTIVITY);
    this.activity = ACTIVITY;
    console.log(`classInitializer saved activity in component:`, this.activity);
    console.groupEnd();
  }
}
