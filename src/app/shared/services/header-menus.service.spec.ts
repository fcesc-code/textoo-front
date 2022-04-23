import { TestBed } from '@angular/core/testing';

import { HeaderMenusService } from './header-menus.service';

describe('HEADER MENU SERVICE TEST SUITE', () => {
  const tested = '[header menu service]';
  let service: HeaderMenusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderMenusService);
  });

  // TEST1: service should be created
  it(`${tested} > should be created`, () => {
    expect(service).toBeTruthy();
  });
});
