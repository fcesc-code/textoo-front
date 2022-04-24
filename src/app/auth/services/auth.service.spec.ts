import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthLogin, AuthToken } from '../models/Auth.dto';

import { AuthService } from './auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { of } from 'rxjs';

describe('AUTH SERVICE TEST SUITE', () => {
  const TITLE = '[auth service]';
  let service: AuthService;
  let localStorageService: LocalStorageService;
  let httpMock: HttpTestingController;
  const API = {
    URL: 'http://localhost:3000',
    authController: 'auth',
  };
  const mockAuthToken: AuthToken = {
    user_id: 'this is a string',
    access_token: 'this is another test string',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, LocalStorageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(AuthService);
  });

  it(`${TITLE} 1 > should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`${TITLE} 2 login > should be called with login and return an auth token`, () => {
    const mockAuth: AuthLogin = {
      email: 'uoc_test@test.mail',
      password: 's0m3tH1nGpR3tTy',
    };
    const spy = spyOn(service, 'login')
      .and.returnValue(of(mockAuthToken))
      .and.callThrough();
    service.login(mockAuth);
    expect(spy).toHaveBeenCalled();
  });

  it(`${TITLE} 3 getLocalStorageToken > should return an auth token`, () => {
    const spy = spyOn(service, 'getLocalStorageToken')
      .and.returnValue(of(mockAuthToken))
      .and.callThrough();
    service.getLocalStorageToken();
    expect(spy).toHaveBeenCalled();
  });
});
