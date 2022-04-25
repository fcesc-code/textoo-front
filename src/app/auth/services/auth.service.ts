import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLogin, AuthToken } from '../models/Auth.dto';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { API_ROUTES, API_CONTROLLERS } from 'src/routes/API_ROUTES';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API: string;

  constructor(
    private sharedService: SharedService,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.API = `${API_ROUTES.development}/${API_CONTROLLERS.auth}/`;
  }

  login(auth: AuthLogin): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(this.API, auth)
      .pipe(catchError(this.sharedService.handleError));
  }

  getLocalStorageToken(): Observable<AuthToken> {
    const user_id = this.localStorageService.get('user_id') || '';
    const access_token = this.localStorageService.get('access_token') || '';
    return of({
      user_id: user_id,
      access_token: access_token,
    });
  }
}
