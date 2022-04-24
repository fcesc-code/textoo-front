import { SupportedLanguages } from '../../shared/interfaces/global.interfaces';
import { UserRoles } from '../../shared/interfaces/global.interfaces';

export interface Preferences {
  language: SupportedLanguages;
}

export interface UserInfo {
  _id: string;
  alias: string;
  avatar: string;
  preferences: Preferences;
  email: string;
}

export interface UserConstructor {
  alias: string;
  avatar: string;
  activeGroups: string[];
  roles: UserRoles[];
  likedActivities: string[];
  preferences: Preferences;
  email: string;
  password: string;
}

export interface ExistingUserConstructor extends UserConstructor {
  _id: string;
}
