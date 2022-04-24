import { UserRoles } from '../../shared/interfaces/global.interfaces';
import {
  UserConstructor,
  ExistingUserConstructor,
  Preferences,
  UserInfo,
} from '../interfaces/user.interfaces';

export class NewUserDto {
  alias: string;
  avatar: string;
  activeGroups: string[];
  roles: UserRoles[];
  likedActivities: string[];
  preferences: Preferences;
  email: string;
  password: string;

  constructor({
    alias,
    avatar,
    activeGroups,
    roles,
    likedActivities,
    preferences,
    email,
    password,
  }: UserConstructor) {
    this.alias = alias;
    this.avatar = avatar;
    this.activeGroups = activeGroups;
    this.roles = roles;
    this.likedActivities = likedActivities;
    this.preferences = preferences;
    this.email = email;
    this.password = password;
  }
}

export class UserDto extends NewUserDto {
  _id: string;

  constructor({
    _id,
    alias,
    avatar,
    activeGroups,
    roles,
    likedActivities,
    preferences,
    email,
    password,
  }: ExistingUserConstructor) {
    super({
      alias,
      avatar,
      activeGroups,
      roles,
      likedActivities,
      preferences,
      email,
      password,
    });
    this._id = _id;
  }

  setId(id: string) {
    if (this._id === null) {
      this._id = id;
    } else {
      throw new Error('ID already set');
    }
  }
  getUserInfo(): UserInfo {
    return {
      _id: this._id === null ? '' : this._id,
      alias: this.alias,
      avatar: this.avatar,
      preferences: this.preferences,
      email: this.email,
    };
  }
  getLikedActivities(): string[] {
    return this.likedActivities;
  }
  addLikedActivity(newLikedActivityId: string) {
    this.likedActivities = Array.from(
      new Set([...this.likedActivities, newLikedActivityId])
    );
  }
  removeLikedActivity(removedLikedActivityId: string) {
    this.likedActivities = [...this.likedActivities].filter(
      (activityId) => activityId !== removedLikedActivityId
    );
  }
  getActiveGroups(): string[] {
    return this.activeGroups;
  }
  addActiveGroup(newGroupId: string) {
    this.activeGroups = Array.from(new Set([...this.activeGroups, newGroupId]));
  }
  removeActiveGroup(removedGroupId: string) {
    this.activeGroups = [...this.activeGroups].filter(
      (groupId) => groupId !== removedGroupId
    );
  }
  getRoles(): UserRoles[] {
    return this.roles;
  }
  addRole(newRole: UserRoles) {
    this.roles = Array.from(new Set([...this.roles, newRole]));
  }
  removeRole(removedRole: UserRoles) {
    this.roles = [...this.roles].filter((role) => role !== removedRole);
  }
}
