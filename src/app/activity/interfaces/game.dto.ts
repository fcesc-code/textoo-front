export interface gameStatus {
  gameId: string;
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

export interface Game {
  users: gameUser[];
  scores: gameScore[];
  status: gameStatus;
}
