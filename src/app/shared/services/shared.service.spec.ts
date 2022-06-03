import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ResponseError, SharedService } from './shared.service';

describe('shared > services > sharedService', () => {
  const TEST = 'test';
  let service: SharedService;
  const mockError: ResponseError = {
    statusCode: 401,
    message: 'not authorized',
    messageDetail: 'at third attempt the account will be autatically blocked',
    code: 'ERR3092',
    timestamp: 'A timestamp from the server',
    path: '/yourapi/path',
    method: 'GET',
  };
  const mockErrorWithoutDetail: ResponseError = {
    statusCode: 401,
    message: 'not authorized',
    messageDetail: '',
    code: 'ERR3093',
    timestamp: 'A timestamp from the server',
    path: '/yourapi/path',
    method: 'GET',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(SharedService);
  });

  it(`${TEST} 1 > should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`${TEST} 2 > method managementToast should be called with a valid request`, () => {
    const mockData = {
      element: 'Funny message!',
      validRequest: true,
    };
    const spy = spyOn(service, 'managementToast').and.callThrough();
    service.managementToast(mockData.element, mockData.validRequest);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(mockData.element, mockData.validRequest);
  });

  it(`${TEST} 3 > method managementToast should be called with certain arguments and an error`, () => {
    const mockData = {
      element: 'Error message!',
      validRequest: false,
      error: mockError,
    };
    const spy = spyOn(service, 'managementToast').and.callThrough();
    service.managementToast(
      mockData.element,
      mockData.validRequest,
      mockData.error
    );
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
      mockData.element,
      mockData.validRequest,
      mockData.error
    );
  });

  it(`${TEST} 4 > method managementToast should be called with certain arguments and an error`, () => {
    const mockData = {
      element: 'Error message!',
      validRequest: false,
      error: mockErrorWithoutDetail,
    };
    const spy = spyOn(service, 'managementToast').and.callThrough();
    service.managementToast(
      mockData.element,
      mockData.validRequest,
      mockData.error
    );
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
      mockData.element,
      mockData.validRequest,
      mockData.error
    );
  });

  it(`${TEST} 5 > method errorLog should be called with an error`, () => {
    const spy = spyOn(service, 'errorLog').and.callThrough();
    service.errorLog(mockError);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(mockError);
  });

  it(`${TEST} 6 > method wait should be called with a number`, () => {
    const mockMs: number = 10;
    const spy = spyOn(service, 'wait').and.callThrough();
    service.wait(mockMs);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(mockMs);
  });

  it(`${TEST} 7 > method handleError should be called with an error`, () => {
    const mockHttpErrorResponse = {
      name: 'HttpErrorResponse',
      message: 'error message',
      error: mockError,
    };
    const spy = spyOn(service, 'handleError').and.callThrough();
    service.handleError(mockHttpErrorResponse);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(mockHttpErrorResponse);
  });
});
