import { UserRoles } from '../../shared/interfaces/global.interfaces';
import {
  UserConstructor,
  ExistingUserConstructor,
  Preferences,
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
}
