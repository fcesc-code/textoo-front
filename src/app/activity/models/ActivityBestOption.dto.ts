import {
  Activity,
  ActivityConstructor,
  ActivityType,
  Timestamps,
} from './Activity.dto';

export class ActivityBestOption extends Activity {
  private _text!: string;
  private _questions!: Question_ActivityBestOption[];

  constructor({
    language,
    author,
    task,
    font,
    title,
    activityId,
    scores,
    timestamps,
    keywords,
    text,
    questions,
    id,
  }: ActivityBestOptionConstructor) {
    super({
      type: ActivityType.BEST_OPTION,
      language,
      author,
      task,
      font,
      title,
      activityId,
      scores,
      id,
    });
    this.keywords = keywords;
    this.timestamps = timestamps;
    this.text = text;
    this.questions = questions;
  }

  get text(): string {
    return this._text;
  }
  set text(text: string) {
    this._text = text;
  }
  get questions(): Question_ActivityBestOption[] {
    return this._questions;
  }
  set questions(questions: Question_ActivityBestOption[]) {
    this._questions = questions;
  }
  addQuestion(question: Question_ActivityBestOption) {
    const stringifiedQuestions = [...this._questions].map((element) =>
      JSON.stringify(element)
    );
    const stringifiedNewQuestion = JSON.stringify(question);
    this._questions = Array.from(
      new Set([...stringifiedQuestions, stringifiedNewQuestion])
    ).map((element) => JSON.parse(element));
  }
  removeQuestion(question: Question_ActivityBestOption) {
    this._questions = [...this._questions].filter(
      (element) => JSON.stringify(element) !== JSON.stringify(question)
    );
  }
}

export interface Question_ActivityBestOption {
  id: string;
  position: number;
  options: Option_ActivityBestOption[];
}

export interface Option_ActivityBestOption {
  text: string;
  correct: boolean;
  index: number;
}

export interface ActivityBestOptionConstructor extends ActivityConstructor {
  text: string;
  questions: Question_ActivityBestOption[];
  keywords: string[];
  timestamps: Timestamps;
}

export interface OptionSelection {
  position: number;
  option: string;
  index: number;
}
