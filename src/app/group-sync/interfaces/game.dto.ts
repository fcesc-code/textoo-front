import {
  AnswerConstructor,
  AnswerOption,
} from 'src/app/activities-shared/models/Answer.dto';
import { Player } from './player.dto';

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

export interface gameScore extends AnswerConstructor {
  id: string;
}

export interface newGame {
  title: string;
  players: Player[];
  scores: gameScore[];
  groupScores: GroupScore;
  status: gameStatus;
  info: gameInfo;
}

export interface Game extends newGame {
  id: string;
}

export interface GroupScore {
  average: {
    correct: number;
    incorrect: number;
    answered: number;
    unanswered: number;
  };
  points: {
    average: number;
    highest: number;
  };
  participants: number;
  leaderboard: Classification[];
}

export interface Classification {
  userId: string;
  userAlias: string;
  points: number;
}
