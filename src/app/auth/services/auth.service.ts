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
    this.API = `${API_ROUTES.production}/${API_CONTROLLERS.auth}/`;
  }

  login(auth: AuthLogin): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(this.API, auth)
      .pipe(catchError(this.sharedService.handleError));
  }

  getLocalStorageToken(): Observable<AuthToken> {
    const { userId, accessToken } = this.getUser();
    return of({
      userId: userId,
      accessToken: accessToken,
    });
  }

  getUser(): AuthToken {
    const userData: AuthToken = {
      userId: this.localStorageService.get('userId') || '',
      accessToken: this.localStorageService.get('accessToken') || '',
    };
    return userData;
  }

  getToken(): string {
    return this.localStorageService.get('accessToken') || '';
  }

  setUser(user: AuthToken): void {
    const { userId, accessToken } = user;
    this.localStorageService.set('userId', userId);
    this.localStorageService.set('accessToken', accessToken);
  }

  removeUser(): void {
    this.localStorageService.remove('userId');
    this.localStorageService.remove('accessToken');
  }
}
