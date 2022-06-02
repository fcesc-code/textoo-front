import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';

import { HeaderMenusService } from './header-menus.service';

describe('shared > services > headerMenuService', () => {
  const TEST = 'test';
  let service: HeaderMenusService;
  let stream$: Subscription;
  const PUBLIC_HEADERS = {
    showAuthSection: false,
    showNoAuthSection: true,
  };
  const PRIVATE_HEADERS = {
    showAuthSection: true,
    showNoAuthSection: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderMenusService);
  });

  it(`${TEST} 1 > should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`${TEST} 2 > should return specific headers for public method`, () => {
    let result = {};
    stream$ = service.headerManagement.subscribe((data) => {
      result = data;
      expect(data).toEqual(PUBLIC_HEADERS);
    });
    stream$.unsubscribe();
  });

  it(`${TEST} 3 > should return specific headers for public method`, () => {
    let result = {};
    stream$ = service.headerManagement.subscribe((data) => {
      result = data;
    });
    service.authorize();
    expect(result).toEqual(PRIVATE_HEADERS);
    stream$.unsubscribe();
  });
});
