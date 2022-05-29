export interface gameStatus {
  scheduled: boolean;
  started: boolean;
  closed: boolean;
  organizer: string;
  timed: boolean;
  maxTime: number;
  start: Date;
}

export interface gameInfo {
  activityId: string;
  activityTitle: string;
  language: string;
  keywords: string[];
  type: string;
}

export interface gameUser {
  id: string;
  team: string;
  role: string;
}

export interface gameScore {
  id: string;
  userId: string;
  teamId: string;
  right: number;
  wrong: number;
  unanswered: number;
  total: number;
  timeToComplete: number;
  inTime: boolean;
  completed: boolean;
}

export interface newGame {
  title: string;
  users: gameUser[];
  scores: gameScore[];
  status: gameStatus;
  info: gameInfo;
}

export interface Game extends newGame {
  id: string;
}
