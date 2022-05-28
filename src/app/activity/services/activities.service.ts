import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { ActivityType, Timestamps } from 'src/app/activity/models/Activity.dto';
import { ActivityBestOption } from '../../activity-best-option/models/ActivityBestOption.dto';
import { ActivitySelectText } from '../../activity-select-text/models/ActivitySelectText.dto';
import { ActivityTransformAspect } from '../models/ActivityTransformAspect.dto';
import { API_ROUTES, API_CONTROLLERS } from 'src/routes/API_ROUTES';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  API: string;
  currentActivity!:
    | ActivityBestOption
    | ActivitySelectText
    | ActivityTransformAspect;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.API = `${API_ROUTES.production}/${API_CONTROLLERS.activities}`;
  }

  getActivityById(id: string): Observable<any> {
    return this.http
      .get<any>(`${this.API}/${id}`)
      .pipe(catchError(this.sharedService.handleError));
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
        return new ActivityBestOption(activity);
      },
      selectText(): ActivitySelectText {
        return new ActivitySelectText(activity);
      },
      transformAspect(): ActivityTransformAspect {
        return new ActivityTransformAspect(activity);
      },
    };
  }

  generateTiemstamps(): Timestamps {
    return {
      created: new Date(),
      modified: new Date(),
    };
  }
}
