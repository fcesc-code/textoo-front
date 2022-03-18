import { Injectable } from '@angular/core';
import {
  MOCK_ACTIVITY_BEST_OPTION,
  MOCK_ACTIVITY_SELECT_TEXT,
  MOCK_ACTIVITY_TRANSFORM_ASPECT,
} from 'mockdata/activity.mock';
import { of } from 'rxjs';
import { ActivityBestOption } from 'src/app/models/ActivityBestOption.dto';
import { ActivitySelectText } from 'src/app/models/ActivitySelectText.dto';
import { ActivityTransformAspect } from 'src/app/models/ActivityTransformAspect.dto';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  activities: any[];

  constructor() {
    this.activities = [
      MOCK_ACTIVITY_BEST_OPTION,
      MOCK_ACTIVITY_SELECT_TEXT,
      MOCK_ACTIVITY_TRANSFORM_ASPECT,
    ];
  }

  getActivity(id: string): any {
    const MOCKDATA = this.activities.filter((activity) => activity.id === id);
    return of(MOCKDATA);
  }
}
