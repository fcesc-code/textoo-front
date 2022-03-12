import { Activity } from './Activity.dto';

export class ActivityTransformAspect extends Activity {
  private text!: string;
  private questions!: Question_ActivityTransformAspect[];

  constructor() {
    super();
    this.id = null;
    const creationTime = new Date();
    this.timestamps = {
      created: creationTime,
      modified: creationTime,
    };
  }

  getText(): string {
    return this.text;
  }
  setText(text: string) {
    this.text = text;
  }
  getQuestions(): Question_ActivityTransformAspect[] {
    return this.questions;
  }
  setQuestion(question: Question_ActivityTransformAspect) {
    const stringifiedQuestions = [...this.questions].map((element) =>
      JSON.stringify(element)
    );
    const stringifiedNewQuestion = JSON.stringify(question);
    this.questions = Array.from(
      new Set([...stringifiedQuestions, stringifiedNewQuestion])
    ).map((element) => JSON.parse(element));
  }
}

export interface Question_ActivityTransformAspect {
  start: number;
  end: number;
  providedText: string;
  validSolutions: string[];
}
