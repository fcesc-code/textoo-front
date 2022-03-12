export abstract class Activity {
  protected id!: string | null;
  protected timestamps!: Timestamps;
  protected type!: ActivityType;
  protected score!: Score;
  protected author!: string;
  protected language!: SupportedLanguages;
  protected task!: string;
  protected font!: Font;
  protected title!: string;
  protected keywords!: string[];

  constructor() {
    this.id = null;
    this.setTimeStamps();
    this.score.timesPlayed = 0;
    this.font.display = false;
  }

  getId(): string {
    return this.id === null ? '' : this.id;
  }
  setId(id: string) {
    if (this.id === null) {
      this.id = id;
    } else {
      throw new Error('ID already set');
    }
  }
  getType(): ActivityType {
    return this.type;
  }
  setType(type: ActivityType) {
    this.type = type;
  }
  getAuthor(): string {
    return this.author;
  }
  setAuthor(id: string) {
    this.author = id;
  }
  getTask(): string {
    return this.task;
  }
  setTask(task: string) {
    this.task = task;
  }
  getLanguage(): SupportedLanguages {
    return this.language;
  }
  setLanguage(language: SupportedLanguages) {
    this.language = language;
  }
  getTitle(): string {
    return this.title;
  }
  setTitle(title: string) {
    this.title = title;
  }
  getScores(): Score {
    return this.score;
  }
  setScores({
    correctAnswers,
    incorrectAnswers,
    timeToComplete,
    questions,
    scorePerQuestion,
  }: Score) {
    this.score.timeToComplete = timeToComplete;
    this.score.scorePerQuestion = scorePerQuestion;
    this.score.questions = questions;
    this.score.correctAnswers = correctAnswers;
    this.score.incorrectAnswers = incorrectAnswers;
    this.score.timesPlayed++;

    this.score.unansweredAnswers =
      this.score.questions -
      (this.score.correctAnswers + this.score.incorrectAnswers);
    this.score.maxPossibleScore =
      this.score.questions * this.score.scorePerQuestion;
    this.score.lastScore = this.score.currentScore;
    this.score.currentScore =
      this.score.correctAnswers * this.score.scorePerQuestion;
    if (this.score.currentScore > this.score.bestScore) {
      this.score.bestScore = this.score.currentScore;
    }
    const currentAverageScore: number =
      typeof this.score.averageScore === 'number' &&
      !isNaN(this.score.averageScore)
        ? this.score.averageScore
        : 0;
    if (currentAverageScore === 0) {
      this.score.averageScore = this.score.currentScore;
    } else {
      (currentAverageScore * this.score.timesPlayed +
        this.score.currentScore * (this.score.timesPlayed - 1)) /
        ((this.score.timesPlayed - 1) * this.score.timesPlayed);
    }
  }
  getTimestamps(): Timestamps {
    return this.timestamps;
  }
  setTimeStamps() {
    if (this.timestamps.created === null) {
      return (this.timestamps.created = new Date());
    }
    return (this.timestamps.modified = new Date());
  }
  getFont(): Font {
    return this.font;
  }
  setFont({ display, author, year, work, reference }: Font) {
    this.font.display = display;
    this.font.author = author;
    this.font.year = year;
    this.font.work = work;
    this.font.reference = reference;
    if (this.font.author === '' || this.font.author === null) {
      this.font.display = false;
    }
  }
  getKeywords(): string[] {
    return this.keywords;
  }
  addKeyword(newKeyword: string) {
    this.keywords = Array.from(
      new Set([...this.keywords, newKeyword.toLowerCase()])
    );
  }
  removeKeyword(removedKeyword: string) {
    this.keywords = [...this.keywords].filter(
      (keyword) => keyword !== removedKeyword.toLowerCase()
    );
  }
}

export interface Timestamps {
  created: Date;
  modified: Date;
}

export interface Score {
  maxPossibleScore: number;
  currentScore: number;
  lastScore: number;
  bestScore: number;
  averageScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredAnswers: number;
  questions: number;
  scorePerQuestion: number;
  timeToComplete: number;
  timesPlayed: number;
}

export interface Font {
  display: boolean;
  author: string;
  year: number;
  work: string;
  reference: string;
}

export enum ActivityType {
  'select_text',
  'fill_gaps',
  'best_option',
  'intruder_option',
  'correct_text',
  'order_elements',
  'associate_headlines',
  'translate_text',
  'flexive_words',
  'remove_surplus_words',
  'add_missing_words',
  'transform_aspect',
}

export enum SupportedLanguages {
  'es',
  'ca',
  'en',
}
