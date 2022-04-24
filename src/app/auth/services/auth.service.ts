import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLogin, AuthToken } from '../models/Auth.dto';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlBlogUocApi: string;
  private controller: string;

  constructor(
    private sharedService: SharedService,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {
    this.controller = 'auth';
    this.urlBlogUocApi = 'http://localhost:3000/' + this.controller;
  }

  login(auth: AuthLogin): Observable<AuthToken> {
    return this.http
      .post<AuthToken>(this.urlBlogUocApi, auth)
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
