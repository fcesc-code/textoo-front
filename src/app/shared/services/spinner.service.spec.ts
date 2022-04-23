import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service';

describe('SPINNER SERVICE TEST SUITE', () => {
  const tested = '[spinner service]';
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinnerService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(SpinnerService);
  });

  // TEST1: should be created
  it(`${tested} > should be created`, () => {
    expect(service).toBeTruthy();
  });

  // TEST2: show method
  it(`${tested} method: show > should set isLoading to true`, () => {
    service.show();
    const result = service.get();
    expect(result.getValue()).toBe(true);
  });

  // TEST2: hide method
  it(`${tested} method: hide > should set isLoading to false`, () => {
    service.hide();
    const result = service.get();
    expect(result.getValue()).toBe(false);
  });

  // TEST3: get method
  it(`${tested} method: get > should get a boolean`, () => {
    service.hide();
    const result = service.get().getValue();
    expect(typeof result).toEqual('boolean');
  });
});
