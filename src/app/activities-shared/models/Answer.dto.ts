export class Answer {
  protected _total: number;
  protected _correct: number;
  protected _incorrect: number;
  protected _time: number;
  protected _maxTime: number;
  protected _pointsPerQuestion: number;
  protected _activityId: string;
  protected _userId: string;
  protected _answers: AnswerOption[];
  protected _created: Date;

  constructor({
    total,
    correct,
    incorrect,
    pointsPerQuestion,
    activityId,
    userId,
    answers,
    time,
    maxTime,
  }: AnswerConstructor) {
    this._total = total;
    this._correct = correct;
    this._incorrect = incorrect;
    this._time = time ? time : 0;
    this._maxTime = maxTime ? maxTime : 0;
    this._pointsPerQuestion = pointsPerQuestion === 0 ? 1 : pointsPerQuestion;
    this._activityId = activityId;
    this._userId = userId;
    this._answers = answers;
    this._created = new Date();
  }

  get scores(): AnswerScores {
    return {
      questions: {
        total: this._total,
        correct: this._correct,
        incorrect: this._incorrect,
        answered: this._correct + this._incorrect,
        unanswered: this._total - this._correct - this._incorrect,
      },
      rates: {
        answered: (this._correct + this._incorrect) / this._total,
        correct: this._correct / this._total,
        incorrect: this._incorrect / this._total,
      },
      points: {
        total: this._pointsPerQuestion * this._correct,
        maxPoints: this._pointsPerQuestion * this._total,
        percent: this._correct / this._total,
      },
      reference: {
        activityId: this._activityId,
        userId: this._userId,
        scoreCreated: this._created,
      },
    };
  }

  get basicData(): AnswerConstructor {
    return {
      total: this._total,
      correct: this._correct,
      incorrect: this._incorrect,
      pointsPerQuestion: this._pointsPerQuestion,
      activityId: this._activityId,
      userId: this._userId,
      answers: this._answers,
      time: this._time,
      maxTime: this._maxTime,
    };
  }

  get time(): AnswerTime {
    return {
      time: {
        total: this._time,
        maxTime: this._maxTime,
        percent: this._time === 0 ? 0 : this._time / this._maxTime,
      },
      reference: {
        activityId: this._activityId,
        userId: this._userId,
        scoreCreated: this._created,
      },
    };
  }

  get insights(): AnswerInsights {
    return {
      insights: {
        correct: this._answers.filter((answer) => answer.value === 'correct'),
        incorrect: this._answers.filter(
          (answer) => answer.value === 'incorrect'
        ),
        unanswered: this._answers.filter(
          (answer) => answer.value === 'unanswered'
        ),
      },
      reference: {
        activityId: this._activityId,
        userId: this._userId,
        scoreCreated: this._created,
      },
    };
  }
}

export interface AnswerScores {
  questions: {
    total: number;
    correct: number;
    incorrect: number;
    unanswered: number;
    answered: number;
  };
  rates: {
    answered: number;
    correct: number;
    incorrect: number;
  };
  points: {
    total: number;
    maxPoints: number;
    percent: number;
  };
  reference: {
    activityId: string;
    userId: string;
    scoreCreated: Date;
  };
}

export interface AnswerTime {
  time: {
    total: number;
    maxTime: number;
    percent: number;
  };
  reference: {
    activityId: string;
    userId: string;
    scoreCreated: Date;
  };
}

export interface AnswerInsights {
  insights: {
    correct: AnswerOption[];
    incorrect: AnswerOption[];
    unanswered: AnswerOption[];
  };
  reference: {
    activityId: string;
    userId: string;
    scoreCreated: Date;
  };
}

export interface AnswerConstructor {
  total: number;
  correct: number;
  incorrect: number;
  time?: number;
  maxTime?: number;
  pointsPerQuestion: number;
  activityId: string;
  userId: string;
  answers: AnswerOption[];
}

export interface AnswerOption {
  id: string;
  selected: string;
  value: AnswerType;
  position?: {
    start: number;
    end: number;
  };
}

export enum AnswerType {
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
  UNANSWERED = 'unanswered',
}
