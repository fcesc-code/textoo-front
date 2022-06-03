import { UserDto } from './user.dto';
import { MOCK_USERS } from 'mockdata/user.mock';
import { Preferences } from '../interfaces/user.interfaces';
import { USER_ACTIONS } from '../actions/user.actions';
import { UserRoles } from 'src/app/shared/interfaces/global.interfaces';

describe('user > models > user.dto', () => {
  const TITLE = 'test';
  const MOCK_USER = MOCK_USERS[0];
  let user: UserDto;

  beforeEach(() => {
    user = new UserDto({
      _id: MOCK_USER._id,
      alias: MOCK_USER.alias,
      email: MOCK_USER.email,
      password: MOCK_USER.password,
      avatar: MOCK_USER.avatar,
      activeGroups: MOCK_USER.activeGroups,
      roles: MOCK_USER.roles,
      likedActivities: MOCK_USER.likedActivities,
      preferences: MOCK_USER.preferences as Preferences,
    });
  });

  it(`${TITLE} 1 > an instance should be created`, () => {
    expect(user).toBeTruthy();
  });

  it(`${TITLE} 2 > setId throws an error if id already existing`, () => {
    try {
      user.setId('1234');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it(`${TITLE} 3 > getUserInfo returns basic info from the user`, () => {
    const RESULT = user.getUserInfo();
    expect(RESULT).toEqual(
      jasmine.objectContaining({
        _id: user._id,
        alias: user.alias,
        avatar: user.avatar,
        preferences: user.preferences,
        email: user.email,
      })
    );
  });

  it(`${TITLE} 4 > getLikedActivities returns all liked activities`, () => {
    expect(user.getLikedActivities()).toEqual(MOCK_USER.likedActivities);
  });

  it(`${TITLE} 5 > addLikedActivities adds a liked activity`, () => {
    const MOCK_ACTIVITY = 'superactivity';
    user.addLikedActivity(MOCK_ACTIVITY);
    expect(user.getLikedActivities()).not.toEqual(MOCK_USER.likedActivities);
    expect(user.getLikedActivities()).toEqual([
      ...MOCK_USER.likedActivities,
      MOCK_ACTIVITY,
    ]);
    expect(
      user.getLikedActivities().length > MOCK_USER.likedActivities.length
    ).toBe(true);
  });

  it(`${TITLE} 6 > removeLikedActivities removes a liked activity`, () => {
    const MOCK_ACTIVITY = 'superactivity';
    user.likedActivities = MOCK_USER.likedActivities;
    user.addLikedActivity(MOCK_ACTIVITY);
    user.removeLikedActivity(MOCK_ACTIVITY);
    expect(user.getLikedActivities()).toEqual(MOCK_USER.likedActivities);
    expect(
      user.getLikedActivities().length === MOCK_USER.likedActivities.length
    ).toBe(true);
  });

  it(`${TITLE} 7 > getActiveGroups returns all active groups`, () => {
    expect(user.getActiveGroups()).toEqual(MOCK_USER.activeGroups);
  });

  it(`${TITLE} 8 > addActiveGroups adds an active group`, () => {
    const MOCK_GROUP = 'fancy group';
    user.addActiveGroup(MOCK_GROUP);
    expect(user.getActiveGroups()).not.toEqual(MOCK_USER.activeGroups);
    expect(user.getActiveGroups()).toEqual([
      ...MOCK_USER.activeGroups,
      MOCK_GROUP,
    ]);
    expect(user.getActiveGroups().length > MOCK_USER.activeGroups.length).toBe(
      true
    );
  });

  it(`${TITLE} 9 > removeActiveGroups removes an active group`, () => {
    const MOCK_GROUP = 'fancy group';
    user.activeGroups = MOCK_USER.activeGroups;
    user.addActiveGroup(MOCK_GROUP);
    user.removeActiveGroup(MOCK_GROUP);
    expect(user.getActiveGroups()).toEqual(MOCK_USER.activeGroups);
    expect(
      user.getActiveGroups().length === MOCK_USER.activeGroups.length
    ).toBe(true);
  });

  it(`${TITLE} 10 > getRoles returns all roles`, () => {
    expect(user.getRoles()).toEqual(MOCK_USER.roles);
  });

  it(`${TITLE} 11 > addRole adds a user role`, () => {
    const MOCK_ROLE = UserRoles.teacher;
    user.addRole(MOCK_ROLE);
    expect(user.getRoles()).not.toEqual(MOCK_USER.roles);
    expect(user.getRoles()).toEqual([...MOCK_USER.roles, MOCK_ROLE]);
    expect(user.getRoles().length > MOCK_USER.roles.length).toBe(true);
  });

  it(`${TITLE} 12 > removeRole removes a user role`, () => {
    const MOCK_ROLE = UserRoles.teacher;
    user.roles = MOCK_USER.roles;
    user.addRole(MOCK_ROLE);
    user.removeRole(MOCK_ROLE);
    expect(user.getRoles()).toEqual(MOCK_USER.roles);
    expect(user.getRoles().length === MOCK_USER.roles.length).toBe(true);
  });
});
