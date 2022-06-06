import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthToken } from '../models/Auth.dto';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import { UserService } from 'src/app/user/services/user.service';
import { API_CONTROLLERS, API_ROUTES } from 'src/routes/API_ROUTES';

describe('auth > services > authInterceptorService', () => {
  const TITLE = 'test';
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let spinnerService: SpinnerService;
  let httpClient: HttpClient;
  let userService: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        {
          provide: HTTP_INTERCEPTORS,
          useValue: new AuthInterceptorService(authService, spinnerService),
          multi: true,
        },
        SpinnerService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    authService = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it(`${TITLE} 1 > intercept method should set some headers for an authorized request`, () => {
    const mockUser: AuthToken = {
      accessToken: 'some very long token',
      userId: '626584019fd54ca5d5fbc940',
    };
    authService.setUser(mockUser);

    const user$ = userService.getUSerById(mockUser.userId).subscribe((user) => {
      let httpRequest = httpMock.expectOne(
        `${API_ROUTES.production}/${API_CONTROLLERS.users}/${mockUser.userId}`
      );
      expect(httpRequest.request.headers.get('Content-Type')).toBe(
        'application/json; charset=utf-8'
      );
      expect(httpRequest.request.headers.get('Accept')).toBe(
        'application/json'
      );
      expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    });

    authService.removeUser();
    user$.unsubscribe();
  });
});
