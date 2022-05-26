import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { API_ROUTES, API_CONTROLLERS } from 'src/routes/API_ROUTES';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable({
  providedIn: 'root',
})
export class ActivitiesService {
  API: string;
  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.API = `${API_ROUTES.production}/${API_CONTROLLERS.activities}`;
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
