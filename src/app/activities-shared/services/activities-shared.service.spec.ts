import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  MOCK_ACTIVITY_BEST_OPTION,
  MOCK_ACTIVITY_SELECT_TEXT,
  MOCK_ACTIVITY_TRANSFORM_ASPECT,
} from 'mockdata/activity.mock';
import { ActivityBestOption } from '../../activity-best-option/models/ActivityBestOption.dto';
import { ActivitySelectText } from '../../activity-select-text/models/ActivitySelectText.dto';
import { ActivityTransformAspect } from '../models/ActivityTransformAspect.dto';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivitiesSharedService } from './activities-shared.service';

describe('activities-shared > services > ActivitiesSharedService', () => {
  let service: ActivitiesSharedService;
  let TITLE = 'test';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(ActivitiesSharedService);
  });

  it(`${TITLE} 1 > service should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`${TITLE} 2 > should create an instance of ActivityBestOption type`, () => {
    const EXPECTED = service.initializeActivity(
      MOCK_ACTIVITY_BEST_OPTION
    ) as ActivityBestOption;
    const RESULT = EXPECTED instanceof ActivityBestOption;

    expect(RESULT).toBeTrue();
  });

  it(`${TITLE} 3 > should create an instance of ActivitySelectText type`, () => {
    const EXPECTED = service.initializeActivity(
      MOCK_ACTIVITY_SELECT_TEXT
    ) as ActivitySelectText;
    const RESULT = EXPECTED instanceof ActivitySelectText;

    expect(RESULT).toBeTrue();
  });

  it(`${TITLE} 4 > should create an instance of ActivityTransformAspect type`, () => {
    const EXPECTED = service.initializeActivity(
      MOCK_ACTIVITY_TRANSFORM_ASPECT
    ) as ActivityTransformAspect;
    const RESULT = EXPECTED instanceof ActivityTransformAspect;

    expect(RESULT).toBeTrue();
  });

  it(`${TITLE} 5 > method new should create an activity type of ActivityTransformAspect when .transformAspect() is called`, () => {
    const EXPECTED = service
      .new(MOCK_ACTIVITY_TRANSFORM_ASPECT)
      .transformAspect();
    const RESULT = EXPECTED instanceof ActivityTransformAspect;

    expect(RESULT).toBeTrue();
  });

  it(`${TITLE} 6 > method new should create an activity type of ActivityBestOption when .bestOption() is called`, () => {
    const EXPECTED = service.new(MOCK_ACTIVITY_BEST_OPTION).bestOption();
    const RESULT = EXPECTED instanceof ActivityBestOption;

    expect(RESULT).toBeTrue();
  });

  it(`${TITLE} 7 > method new should create an activity type of ActivitySelectText when .selectText() is called`, () => {
    const EXPECTED = service.new(MOCK_ACTIVITY_SELECT_TEXT).selectText();
    const RESULT = EXPECTED instanceof ActivitySelectText;

    expect(RESULT).toBeTrue();
  });

  it(`${TITLE} 8 > method generateTimeStamps should reutrn an object of type Timestamps`, () => {
    const TIMESTAMPS = service.generateTiemstamps();
    const RESULT1 = TIMESTAMPS.created !== undefined;
    const RESULT2 = TIMESTAMPS.modified !== undefined;

    expect(RESULT1 && RESULT2).toBeTrue();
  });
});
