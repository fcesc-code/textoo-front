import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthLogin, AuthToken } from '../../models/Auth.dto';

import { AuthService } from './auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { of } from 'rxjs';

describe('AUTH SERVICE TEST SUITE', () => {
  const tested = '[auth service]';
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

  // TEST1: should be created
  it(`${tested} > should be created`, () => {
    expect(service).toBeTruthy();
  });

  // TEST2: login method
  it(`${tested} method: login > should be called with login and return an auth token`, () => {
    const mockAuth: AuthLogin = {
      email: 'uoc_test@test.mail',
      password: 's0m3tH1nGpR3tTy',
    };
    service.login(mockAuth).subscribe((authData: AuthToken) => {
      expect(authData).toEqual(mockAuthToken);
    });
    const req = httpMock.expectOne(`${API.URL}/${API.authController}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockAuthToken);
  });

  // TEST3: getLocalStorage method
  it(`${tested} method: getLocalStorageToken > should return an auth token`, () => {
    const spy = spyOn(service, 'getLocalStorageToken')
      .and.returnValue(of(mockAuthToken))
      .and.callThrough();
    service.getLocalStorageToken();
    expect(spy).toHaveBeenCalled();
  });
});
