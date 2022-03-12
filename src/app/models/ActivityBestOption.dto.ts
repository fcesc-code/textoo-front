import { Activity } from './Activity.dto';

export class ActivityBestOption extends Activity {
  private text!: string;
  private questions!: Question_ActivityBestOption[];

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
  getQuestions(): Question_ActivityBestOption[] {
    return this.questions;
  }
  setQuestion(question: Question_ActivityBestOption) {
    const stringifiedQuestions = [...this.questions].map((element) =>
      JSON.stringify(element)
    );
    const stringifiedNewQuestion = JSON.stringify(question);
    this.questions = Array.from(
      new Set([...stringifiedQuestions, stringifiedNewQuestion])
    ).map((element) => JSON.parse(element));
  }
}

export interface Question_ActivityBestOption {
  position: number;
  options: Option_ActivityBestOption[];
}

export interface Option_ActivityBestOption {
  text: string;
  correct: boolean;
}
