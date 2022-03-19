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
// import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-play-activity',
  templateUrl: './play-select-text.component.html',
  styleUrls: ['./play-select-text.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaySelectTextComponent implements OnInit, OnDestroy {
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
      this.activity$ = this.activitiesService
        .getActivity(activityId)
        // .pipe(
        //   tap((data) => {
        //     console.table(data);
        //   })
        // )
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
    const ACTIVITY = this.activitiesService.initializeActivity(activity);
    this.activity = ACTIVITY;
  }
}
