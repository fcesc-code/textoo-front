import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AuthToken } from '../models/Auth.dto';

import { AuthInterceptorService } from './auth-interceptor.service';
import { ActivitiesService } from '../../activity/services/activities.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Activity } from '../../activity/models/Activity.dto';

describe('AUTH INTERCEPTOR SERVICE TEST SUITE', () => {
  const TITLE = '[auth interceptor service]';
  let service: AuthInterceptorService;
  let activitiesService: ActivitiesService;
  let localStorageService: LocalStorageService;
  let httpMock: HttpTestingController;
  const API = {
    URL: 'http://localhost:3000',
    authController: 'auth',
    activityController: 'activity',
    userController: 'users',
  };
  const mockAuthToken: AuthToken = {
    user_id: 'this is a string',
    access_token: 'this is another test string',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthInterceptorService,
        ActivitiesService,
        LocalStorageService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(AuthInterceptorService);
    localStorageService = TestBed.inject(LocalStorageService);
    activitiesService = TestBed.inject(ActivitiesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // TEST1: should be created
  it(`${TITLE} > should be created`, () => {
    expect(service).toBeTruthy();
  });

  // TEST2: intercept method
  xit(`${TITLE} method: intercept > should set some headers for an authorized request`, () => {
    // const mockPostsList: Activity[] = [];
    const mockUserId = 'b3e7a302-0052-4622-8781-dc7934e7bac5';
    localStorageService.set('user_id', mockAuthToken.user_id);
    localStorageService.set('access_token', mockAuthToken.access_token);

    activitiesService
      .getActivityById(mockUserId)
      .subscribe((activities: Activity[]) => {
        expect(activities.length).toBe(0);
      });
    // postService.getPostsByUserId(mockUserId);
    const httpRequest = httpMock.expectOne(
      `${API.URL}/${API.userController}/${API.activityController}/${mockUserId}`
    );
    // httpRequest.flush(mockPostsList);
    // console.log('HERE', httpRequest);
    expect(httpRequest.request.headers.get('Content-Type')).toBe(
      'application/json; charset=utf-8'
    );
    expect(httpRequest.request.headers.get('Accept')).toBe('application/json');
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    localStorageService.remove('user_id');
    localStorageService.remove('access_token');
  });
});
