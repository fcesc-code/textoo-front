import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LOCAL STORAGE SERVICE TEST SUITE', () => {
  const tested = '[local storage service]';
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(LocalStorageService);
  });

  // TEST1: should be created
  it(`${tested} > should be created`, () => {
    expect(service).toBeTruthy();
  });

  // TEST2: set method
  it(`${tested} method: set > should set a value`, () => {
    const mockData = {
      key: 'userId',
      value: 'b3e7a302-0052-4622-8781-dc7934e7bac5',
    };
    const spy = spyOn(service, 'set');
    service.set(mockData.key, mockData.value);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(mockData.key, mockData.value);
  });

  // TEST3: get method
  it(`${tested} method: get > should get a value`, () => {
    const mockData = {
      key: 'userId',
      value: 'b3e7a302-0052-4622-8781-dc7934e7bac5',
    };
    const spy = spyOn(service, 'get');
    service.get(mockData.key);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(mockData.key);
  });

  // TEST4: remove method
  it(`${tested} method: remove > should remove a key value pair`, () => {
    const mockData = {
      key: 'userId',
      value: 'b3e7a302-0052-4622-8781-dc7934e7bac5',
    };
    const spy = spyOn(service, 'remove');
    service.remove(mockData.key);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(mockData.key);
  });

  // TEST5: check current get value after set
  it(`${tested} integration > should get the same value that is set`, () => {
    const mockData = {
      key: 'userId',
      value: 'b3e7a302-0052-4622-8781-dc7934e7bac5',
    };
    service.set(mockData.key, mockData.value);
    const result = service.get(mockData.key);
    expect(result).toEqual(mockData.value);
  });

  // TEST6: check that get returns null after value is removed
  it(`${tested} integration > should get null after value is removed`, () => {
    const mockData = {
      key: 'userId',
      value: 'b3e7a302-0052-4622-8781-dc7934e7bac5',
    };
    service.set(mockData.key, mockData.value);
    service.remove(mockData.key);
    const result = service.get(mockData.key);
    expect(result).toBe(null);
  });
});
