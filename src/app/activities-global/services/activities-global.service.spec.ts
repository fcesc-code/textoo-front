import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SharedService } from 'src/app/shared/services/shared.service';
import { API_CONTROLLERS, API_ROUTES } from 'src/routes/API_ROUTES';
import {
  MOCK_ACTIVITY_TRANSFORM_ASPECT,
  MOCK_ACTIVITY_BEST_OPTION,
  MOCK_ACTIVITY_SELECT_TEXT,
} from 'mockdata/activity.mock';
import { ActivitiesGlobalService } from './activities-global.service';

describe('activities-global > services > sharedService', () => {
  const TITLE = 'test';
  let mockHttp: HttpTestingController;
  let sharedService: SharedService;
  let service: ActivitiesGlobalService;
  const MOCK_ACTIVITIES = [
    MOCK_ACTIVITY_BEST_OPTION,
    MOCK_ACTIVITY_SELECT_TEXT,
    MOCK_ACTIVITY_TRANSFORM_ASPECT,
  ];

  const API = `${API_ROUTES.production}/${API_CONTROLLERS.activities}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivitiesGlobalService, SharedService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    sharedService = TestBed.inject(SharedService);
    service = TestBed.inject(ActivitiesGlobalService);
    mockHttp = TestBed.inject(HttpTestingController);
  });

  it(`${TITLE} 1 > should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`${TITLE} 2 > getAllActivities method should return a list of activities`, () => {
    service.getAllActivities().subscribe((activities) => {
      expect(activities).not.toBeFalsy();
      expect(activities).toEqual(MOCK_ACTIVITIES);
      expect(activities.length).toEqual(3);
    });

    const req = mockHttp.expectOne(`${API}/all`);

    expect(req.request.method).toBe('GET');

    req.flush(MOCK_ACTIVITIES);
  });

  it(`${TITLE} 3 > getAllActivitiesByUserId should return a list of activites from a given user`, () => {
    const MOCK_USER_ID = 'ef4f0e28-86f8-4d2d-a56a-8b24d3286867';
    const FILTERED_MOCK_ACTIVITIES = MOCK_ACTIVITIES.filter(
      (activity) => activity.author === MOCK_USER_ID
    );
    service.getAllActivitiesByUserId(MOCK_USER_ID).subscribe((activities) => {
      expect(activities).not.toBeFalsy();
      expect(activities).toEqual(FILTERED_MOCK_ACTIVITIES);
      expect(activities.length).toEqual(2);
    });

    const req = mockHttp.expectOne(`${API}/byUser/${MOCK_USER_ID}`);

    expect(req.request.method).toBe('GET');

    req.flush(FILTERED_MOCK_ACTIVITIES);
  });
});
