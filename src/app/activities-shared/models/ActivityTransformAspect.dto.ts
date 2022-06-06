import {
  Activity,
  ActivityConstructor,
  ActivityType,
  Timestamps,
} from './Activity.dto';

export class ActivityTransformAspect extends Activity {
  private _text!: string;
  private _questions!: QuestionActivityTransformAspect[];

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
    _id,
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
      _id,
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
  get questions(): QuestionActivityTransformAspect[] {
    return this._questions;
  }
  set questions(questions: QuestionActivityTransformAspect[]) {
    this._questions = questions;
  }
  addQuestion(question: QuestionActivityTransformAspect) {
    const stringifiedQuestions = [...this._questions].map((element) =>
      JSON.stringify(element)
    );
    const stringifiedNewQuestion = JSON.stringify(question);
    this._questions = Array.from(
      new Set([...stringifiedQuestions, stringifiedNewQuestion])
    ).map((element) => JSON.parse(element));
  }
  removeQuestion(question: QuestionActivityTransformAspect) {
    this._questions = [...this._questions].filter(
      (element) => JSON.stringify(element) !== JSON.stringify(question)
    );
  }
}

export interface QuestionActivityTransformAspect {
  start: number;
  end: number;
  providedText: string;
  validSolutions: string[];
}

export interface ActivityTransformAspectConstructor
  extends ActivityConstructor {
  text: string;
  questions: QuestionActivityTransformAspect[];
  keywords: string[];
  timestamps: Timestamps;
}
