import { TestBed } from '@angular/core/testing';
import {
  MOCK_ACTIVITY_BEST_OPTION,
  MOCK_ACTIVITY_SELECT_TEXT,
  MOCK_ACTIVITY_TRANSFORM_ASPECT,
} from 'mockdata/activity.mock';
import { ActivityBestOption } from '../models/ActivityBestOption.dto';
import { ActivitySelectText } from '../models/ActivitySelectText.dto';
import { ActivityTransformAspect } from '../models/ActivityTransformAspect.dto';

import { ActivitiesService } from './activities.service';

describe('ActivitiesService', () => {
  let service: ActivitiesService;
  let TITLE = 'activities service';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitiesService);
  });

  it(`${TITLE} 1 > service should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`${TITLE} 2 > should create an instance of ActivityBestOption type`, () => {
    const EXPECTED = service.initializeActivity(
      MOCK_ACTIVITY_BEST_OPTION
    ) as ActivityBestOption;
    const EXPECTED_CONDITION = EXPECTED instanceof ActivityBestOption;

    const MOCK_ID = MOCK_ACTIVITY_BEST_OPTION.id;
    let result;
    let condition;
    const subscription$ = service
      .getActivity(MOCK_ID)
      .subscribe((activity: ActivityBestOption) => {
        result = service.initializeActivity(activity) as ActivityBestOption;
        condition = result instanceof ActivityBestOption;
        expect(result).toEqual(EXPECTED);
      });

    expect(condition).toBeTrue();
    expect(EXPECTED_CONDITION).toBeTrue();

    subscription$.unsubscribe();
  });

  it(`${TITLE} 3 > should create an instance of ActivitySelectText type`, () => {
    const EXPECTED = service.initializeActivity(
      MOCK_ACTIVITY_SELECT_TEXT
    ) as ActivitySelectText;
    const EXPECTED_CONDITION = EXPECTED instanceof ActivitySelectText;

    const MOCK_ID = MOCK_ACTIVITY_SELECT_TEXT.id;
    let result;
    let condition;
    const subscription$ = service
      .getActivity(MOCK_ID)
      .subscribe((activity: ActivitySelectText) => {
        result = service.initializeActivity(activity) as ActivitySelectText;
        condition = result instanceof ActivitySelectText;
        expect(result).toEqual(EXPECTED);
      });

    expect(condition).toBeTrue();
    expect(EXPECTED_CONDITION).toBeTrue();

    subscription$.unsubscribe();
  });

  it(`${TITLE} 4 > should create an instance of ActivityTransformAspect type`, () => {
    const EXPECTED = service.initializeActivity(
      MOCK_ACTIVITY_TRANSFORM_ASPECT
    ) as ActivityTransformAspect;
    const EXPECTED_CONDITION = EXPECTED instanceof ActivityTransformAspect;

    const MOCK_ID = MOCK_ACTIVITY_TRANSFORM_ASPECT.id;
    let result;
    let condition;
    const subscription$ = service
      .getActivity(MOCK_ID)
      .subscribe((activity: ActivityTransformAspect) => {
        result = service.initializeActivity(
          activity
        ) as ActivityTransformAspect;
        condition = result instanceof ActivityTransformAspect;
        expect(result).toEqual(EXPECTED);
      });

    expect(condition).toBeTrue();
    expect(EXPECTED_CONDITION).toBeTrue();

    subscription$.unsubscribe();
  });
});
