import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthLogin, AuthToken } from '../models/Auth.dto';

import { AuthService } from './auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { of, tap } from 'rxjs';
import { API_CONTROLLERS, API_ROUTES } from 'src/routes/API_ROUTES';

describe('auth > services > authService', () => {
  const TITLE = 'test';
  let service: AuthService;
  let mockHttp: HttpTestingController;

  const mockAuthToken: AuthToken = {
    userId: 'this is a string',
    accessToken: 'this is another test string',
  };
  const mockAuthLogin: AuthLogin = {
    email: 'uoc_test@test.mail',
    password: 's0m3tH1nGpR3tTy',
  };
  const API = `${API_ROUTES.production}/${API_CONTROLLERS.auth}/`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, LocalStorageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(AuthService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it(`${TITLE} 1 > should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`${TITLE} 2 > login method should return a userid and token`, () => {
    service.login(mockAuthLogin).subscribe((user) => {
      expect(user).not.toBeFalsy();
      expect(user).toEqual(mockAuthToken);
    });

    const req = mockHttp.expectOne(API);

    expect(req.request.method).toBe('POST');

    req.flush(mockAuthToken);
  });

  it(`${TITLE} 3 > getLocalStorageToken method should return a token`, () => {
    service.setUser(mockAuthToken);
    const spy3 = spyOn(service, 'getLocalStorageToken')
      .and.returnValue(of(mockAuthToken))
      .and.callThrough();
    service.getLocalStorageToken().pipe(
      tap((token) => {
        expect(token).toEqual(mockAuthToken);
      })
    );
    expect(spy3).toHaveBeenCalled();
    service.removeUser();
  });

  it(`${TITLE} 4 > method getToken should reutrn the user token`, () => {
    service.setUser(mockAuthToken);
    const spy4 = spyOn(service, 'getToken')
      .and.returnValue(mockAuthToken.accessToken)
      .and.callThrough();
    const RESULT = service.getToken();
    expect(spy4).toHaveBeenCalled();
    expect(RESULT).toEqual(mockAuthToken.accessToken);
    service.removeUser();
  });

  it(`${TITLE} 5 > method getUser should return the user`, () => {
    service.setUser(mockAuthToken);
    const spy5 = spyOn(service, 'getUser')
      .and.returnValue(mockAuthToken)
      .and.callThrough();
    const RESULT = service.getUser();
    expect(spy5).toHaveBeenCalled();
    expect(RESULT).toEqual(mockAuthToken);
    service.removeUser();
  });

  it(`${TITLE} 6 > method setUser should set a User`, () => {
    service.removeUser();
    const spy6 = spyOn(service, 'setUser')
      .and.returnValue(undefined)
      .and.callThrough();
    const RESULT = service.setUser(mockAuthToken);
    expect(spy6).toHaveBeenCalled();
    expect(RESULT).toBeUndefined();
  });

  it(`${TITLE} 7 > method removeUser should not return`, () => {
    service.setUser(mockAuthToken);
    const spy7 = spyOn(service, 'removeUser')
      .and.returnValue(undefined)
      .and.callThrough();
    const RESULT = service.removeUser();
    expect(spy7).toHaveBeenCalled();
    expect(RESULT).toBeUndefined();
    service.removeUser();
  });
});
