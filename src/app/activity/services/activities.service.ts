import { Injectable } from '@angular/core';
import {
  MOCK_ACTIVITY_BEST_OPTION,
  MOCK_ACTIVITY_SELECT_TEXT,
  MOCK_ACTIVITY_TRANSFORM_ASPECT,
} from 'mockdata/activity.mock';
import { Observable, of } from 'rxjs';
import { ActivityType } from 'src/app/models/Activity.dto';
import { ActivityBestOption } from 'src/app/models/ActivityBestOption.dto';
import { ActivitySelectText } from 'src/app/models/ActivitySelectText.dto';
import { ActivityTransformAspect } from 'src/app/models/ActivityTransformAspect.dto';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  activities: any[];
  currentActivity!:
    | ActivityBestOption
    | ActivitySelectText
    | ActivityTransformAspect;

  constructor() {
    this.activities = [
      MOCK_ACTIVITY_BEST_OPTION,
      MOCK_ACTIVITY_SELECT_TEXT,
      MOCK_ACTIVITY_TRANSFORM_ASPECT,
    ];
  }

  getActivity(id: string): Observable<any> {
    const MOCKDATA = this.activities.filter((activity) => activity.id === id);
    return of(MOCKDATA[0]);
  }

  initializeActivity(
    activity: any
  ): ActivityBestOption | ActivitySelectText | ActivityTransformAspect {
    switch (activity.type) {
      case ActivityType.BEST_OPTION:
        this.currentActivity = new ActivityBestOption({ ...activity });
        break;
      case ActivityType.SELECT_TEXT:
        this.currentActivity = new ActivitySelectText({ ...activity });
        break;
      case ActivityType.TRANSFORM_ASPECT:
        this.currentActivity = new ActivityTransformAspect({ ...activity });
        break;
    }
    return this.currentActivity;
  }
}
