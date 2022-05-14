import { Injectable } from '@angular/core';
// import {
//   MOCK_ACTIVITY_BEST_OPTION,
//   MOCK_ACTIVITY_SELECT_TEXT,
//   MOCK_ACTIVITY_TRANSFORM_ASPECT,
// } from 'mockdata/activity.mock';
// import { catchError, Observable, of, tap } from 'rxjs';
import { catchError, Observable, tap } from 'rxjs';
import { ActivityType, Timestamps } from 'src/app/activity/models/Activity.dto';
import { ActivityBestOption } from '../models/ActivityBestOption.dto';
import { ActivitySelectText } from '../models/ActivitySelectText.dto';
import { ActivityTransformAspect } from '../models/ActivityTransformAspect.dto';
import { API_ROUTES, API_CONTROLLERS } from 'src/routes/API_ROUTES';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  API: string;
  // mockActivities: any[];
  // activities: any[];
  currentActivity!:
    | ActivityBestOption
    | ActivitySelectText
    | ActivityTransformAspect;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    // this.mockActivities = [
    //   MOCK_ACTIVITY_BEST_OPTION,
    //   MOCK_ACTIVITY_SELECT_TEXT,
    //   MOCK_ACTIVITY_TRANSFORM_ASPECT,
    // ];
    // this.activities = [];
    this.API = `${API_ROUTES.development}/${API_CONTROLLERS.activities}`;
  }

  // getActivity(id: string): Observable<any> {
  //   const MOCKDATA = this.mockActivities.filter(
  //     (activity) => activity.id === id
  //   );
  //   return of(MOCKDATA[0]);
  // }

  getActivityById(id: string): Observable<any> {
    return this.http.get<any>(`${this.API}/${id}`).pipe(
      tap((data) => console.log('incoming >>> ', data)),
      catchError(this.sharedService.handleError)
    );
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

  new(activity: any) {
    return {
      bestOption(): ActivityBestOption {
        return new ActivityBestOption({
          ...activity,
          type: ActivityType.BEST_OPTION,
        });
      },
      selectText(): ActivitySelectText {
        return new ActivitySelectText({
          ...activity,
          type: ActivityType.SELECT_TEXT,
        });
      },
      transformAspect(): ActivityTransformAspect {
        return new ActivityTransformAspect({
          ...activity,
          type: ActivityType.TRANSFORM_ASPECT,
        });
      },
    };
  }

  generateTiemstamps(): Timestamps {
    return {
      created: new Date(),
      modified: new Date(),
    };
  }

  getAllActivities(): Observable<any> {
    return this.http
      .get<any>(`${this.API}/all`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getAllActivitiesByUserId(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.API}/byUser/${id}`)
      .pipe(catchError(this.sharedService.handleError));
  }
}
