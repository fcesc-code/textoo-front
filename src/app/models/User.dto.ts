import { SupportedLanguages } from './Activity.dto';

export abstract class User {
  private id!: string | null;
  private alias!: string;
  private avatar!: string;
  private activeGroups!: string[];
  private roles!: Roles[];
  private likedActivities!: string[];
  private preferences!: Preferences;

  setId(id: string) {
    if (this.id === null) {
      this.id = id;
    } else {
      throw new Error('ID already set');
    }
  }
  getUserInfo(): UserInfo {
    return {
      id: this.id === null ? '' : this.id,
      alias: this.alias,
      avatar: this.avatar,
      preferences: this.preferences,
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
  getRoles(): Roles[] {
    return this.roles;
  }
  addRole(newRole: Roles) {
    this.roles = Array.from(new Set([...this.roles, newRole]));
  }
  removeRole(removedRole: Roles) {
    this.roles = [...this.roles].filter((role) => role !== removedRole);
  }
}

export interface Preferences {
  language: SupportedLanguages;
}

export interface UserInfo {
  id: string;
  alias: string;
  avatar: string;
  preferences: Preferences;
}

export enum Roles {
  'administrator',
  'teacher',
  'learner',
}
