import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UserService } from './user.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserDto } from '../models/user.dto';
import {
  SupportedLanguages,
  UserRoles,
} from 'src/app/shared/interfaces/global.interfaces';

describe(`USER SERVICE TEST SUITE`, () => {
  const tested = '[user service]';
  let service: UserService;
  let httpMock: HttpTestingController;
  const API = {
    URL: 'http://localhost:3000',
    userController: 'users',
  };
  const mockUserId = 'b3e7a302-0052-4622-8781-dc7934e7bac5';
  const mockUser: UserDto = {
    _id: mockUserId,
    avatar: 'http://thispersondoesnotexist.com/image',
    alias: 'Murciano',
    email: 'uoc@test.mail',
    password: '$2b$10$b2zKD5KqMFA2JioeM.w66OVt.EGhSMpIy1XP6y3IH6vIFMA/5tkAG',
    preferences: {
      language: SupportedLanguages.EN,
    },
    likedActivities: ['b3e7a302-0052-4622-8781-dc7934e7bac6'],
    roles: [UserRoles.learner],
    activeGroups: ['b3e7a302-0052-4622-8781-dc7934e7bac7'],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // TEST1: service is created
  it(`${tested} > should be created`, () => {
    expect(service).toBeTruthy();
  });

  // TEST2: register method
  it(`${tested} method: register > is called with POST method and returns a user`, () => {
    service.register(mockUser).subscribe((user: UserDto) => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne(`${API.URL}/${API.userController}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockUser);
  });

  // TEST3: updateUser method
  it(`${tested} method: updateUser > is called with PUT method and returns the updated user`, () => {
    service.updateUser(mockUserId, mockUser).subscribe((user: UserDto) => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne(
      `${API.URL}/${API.userController}/${mockUserId}`
    );
    expect(req.request.method).toBe('PUT');
    req.flush(mockUser);
  });

  // TEST4: getUserById method
  it(`${tested} method: getCategoryByIdPost > is called with GET method and returns the specific category`, () => {
    service.getUSerById(mockUserId).subscribe((user: UserDto) => {
      expect(user).toEqual(mockUser);
    });
    const req = httpMock.expectOne(
      `${API.URL}/${API.userController}/${mockUserId}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
});
