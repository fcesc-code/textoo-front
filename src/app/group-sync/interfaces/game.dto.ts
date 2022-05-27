export interface gameStatus {
  activityId: string;
  scheduled: boolean;
  started: boolean;
  closed: boolean;
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
  users: gameUser[];
  scores: gameScore[];
  status: gameStatus;
}

export interface Game extends newGame {
  id: string;
}
