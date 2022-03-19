import { Injectable } from '@angular/core';
import {
  MOCK_ACTIVITY_BEST_OPTION,
  MOCK_ACTIVITY_SELECT_TEXT,
  MOCK_ACTIVITY_TRANSFORM_ASPECT,
} from 'mockdata/activity.mock';
import { MOCK_USERS } from 'mockdata/user.mock';
import { of } from 'rxjs';
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

  getActivity(id: string): any {
    const MOCKDATA = this.activities.filter((activity) => activity.id === id);
    return of(MOCKDATA[0]);
  }

  getAuthor(id: string): any {
    return [...MOCK_USERS].filter((user) => user.id === id)[0];
  }

  initializeActivity(
    activity: any
  ): ActivityBestOption | ActivitySelectText | ActivityTransformAspect {
    console.log(`starting with type: ${activity.type}`);
    switch (activity.type) {
      case ActivityType.BEST_OPTION:
        console.log('initializing best-option');
        this.currentActivity = new ActivityBestOption({ ...activity });
        break;
      case ActivityType.SELECT_TEXT:
        console.log('initializing select-text');
        this.currentActivity = new ActivitySelectText({ ...activity });
        break;
      case ActivityType.TRANSFORM_ASPECT:
        console.log('initializing transform-aspect');
        this.currentActivity = new ActivityTransformAspect({ ...activity });
        break;
      default:
        console.log('initializing default');
        break;
    }
    console.warn(`Deep back from service:`, this.currentActivity);
    return this.currentActivity;
  }
}
