import {
  Activity,
  ActivityConstructor,
  ActivityType,
  Timestamps,
} from './Activity.dto';

export class ActivityTransformAspect extends Activity {
  private _text!: string;
  private _questions!: Question_ActivityTransformAspect[];

  constructor({
    language,
    author,
    task,
    font,
    title,
    activityId,
    keywords,
    timestamps,
    scores,
    text,
    questions,
  }: ActivityTransformAspectConstructor) {
    super({
      type: ActivityType.TRANSFORM_ASPECT,
      language,
      author,
      task,
      font,
      title,
      activityId,
      scores,
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
  get questions(): Question_ActivityTransformAspect[] {
    return this._questions;
  }
  set questions(questions: Question_ActivityTransformAspect[]) {
    this._questions = questions;
  }
  addQuestion(question: Question_ActivityTransformAspect) {
    const stringifiedQuestions = [...this._questions].map((element) =>
      JSON.stringify(element)
    );
    const stringifiedNewQuestion = JSON.stringify(question);
    this._questions = Array.from(
      new Set([...stringifiedQuestions, stringifiedNewQuestion])
    ).map((element) => JSON.parse(element));
  }
  removeQuestion(question: Question_ActivityTransformAspect) {
    this._questions = [...this._questions].filter(
      (element) => JSON.stringify(element) !== JSON.stringify(question)
    );
  }
}

export interface Question_ActivityTransformAspect {
  start: number;
  end: number;
  providedText: string;
  validSolutions: string[];
}

export interface ActivityTransformAspectConstructor
  extends ActivityConstructor {
  text: string;
  questions: Question_ActivityTransformAspect[];
  keywords: string[];
  timestamps: Timestamps;
}
