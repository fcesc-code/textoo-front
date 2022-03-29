export abstract class Activity {
  protected _id!: string | null;
  protected _timestamps!: Timestamps;
  protected _type!: ActivityType;
  protected _scores!: Score;
  protected _author!: string;
  protected _language!: SupportedLanguages;
  protected _task!: string;
  protected _font!: Font;
  protected _title!: string;
  protected _keywords!: string[];

  constructor({
    type,
    language,
    author,
    task,
    font,
    title,
    scores,
    id,
  }: AbstractActivityConstructor) {
    this._id = id || null;
    this._type = type;
    this._language = language;
    this._author = author;
    this._task = task;
    this._font = font;
    this._title = title;
    this._scores = scores;
  }

  get id(): string {
    return this._id === null ? '' : this._id;
  }
  set id(id: string) {
    if (this._id === null) {
      this._id = id;
    } else {
      throw new Error('ID already set');
    }
  }
  get type(): ActivityType {
    return this._type;
  }
  set type(type: ActivityType) {
    this._type = type;
  }
  get author(): string {
    return this._author;
  }
  set author(id: string) {
    this._author = id;
  }
  get task(): string {
    return this._task;
  }
  set task(task: string) {
    this._task = task;
  }
  get language(): SupportedLanguages {
    return this._language;
  }
  set language(language: SupportedLanguages) {
    this._language = language;
  }
  get title(): string {
    return this._title;
  }
  set title(title: string) {
    this._title = title;
  }
  get scores(): Score {
    return this._scores;
  }
  set scores({ timeToComplete, questions, scorePerQuestion }: Score) {
    this._scores.timeToComplete = timeToComplete;
    this._scores.scorePerQuestion = scorePerQuestion;
    this._scores.questions = questions;
    this._scores.maxPossibleScore =
      this._scores.questions * this._scores.scorePerQuestion;
  }
  get timestamps(): Timestamps {
    return this._timestamps;
  }
  set timestamps(timestamps: Timestamps) {
    this._timestamps = timestamps;
  }
  createTimestamps(date: Date) {
    if (this._timestamps.created === null) {
      this._timestamps.created = new Date(date);
    }
    this._timestamps.modified = new Date(date);
  }
  get font(): Font {
    return this._font;
  }
  set font({ display, author, year, work, reference }: Font) {
    this._font.display = display;
    this._font.author = author;
    this._font.year = year;
    this._font.work = work;
    this._font.reference = reference;
    if (this._font.author === '' || this._font.author === null) {
      this._font.display = false;
    }
  }
  get keywords(): string[] {
    return this._keywords;
  }
  set keywords(keywords: string[]) {
    this._keywords = keywords;
  }
  addKeyword(newKeyword: string) {
    this._keywords = Array.from(
      new Set([...this._keywords, newKeyword.toLowerCase()])
    );
  }
  removeKeyword(removedKeyword: string) {
    this._keywords = [...this._keywords].filter(
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
  questions: number;
  scorePerQuestion: number;
  timeToComplete: number;
}

export interface Font {
  display: boolean;
  author: string;
  year: number;
  work: string;
  reference: string;
}

export interface ActivityConstructor {
  id?: string;
  language: SupportedLanguages;
  task: string;
  font: Font;
  title: string;
  author: string;
  activityId?: string;
  scores: Score;
}

interface AbstractActivityConstructor extends ActivityConstructor {
  type: ActivityType;
}

export enum ActivityType {
  SELECT_TEXT = 'select_text',
  FILL_GAPS = 'fill_gaps',
  BEST_OPTION = 'best_option',
  INTRUDER_OPTION = 'intruder_option',
  CORRECT_TEXT = 'correct_text',
  ORDER_ELEMENTS = 'order_elements',
  ASSOCIATE_HEADLINES = 'associate_headlines',
  TRANSLATE_TEXT = 'translate_text',
  FLEXIVE_WORDS = 'flexive_words',
  REMOVE_SURPLUS_WORDS = 'remove_surplus_words',
  ADD_MISSING_WORDS = 'add_missing_words',
  TRANSFORM_ASPECT = 'transform_aspect',
}

export enum SupportedLanguages {
  ES = 'es',
  CA = 'ca',
  EN = 'en',
}
