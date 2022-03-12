import { Activity } from './Activity.dto';

export class ActivitySelectText extends Activity {
  private text!: string;
  private positions!: Position[];

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
  getPositions(): Position[] {
    return this.positions;
  }
  setPosition(position: Position) {
    const stringifiedPositions = [...this.positions].map((element) =>
      JSON.stringify(element)
    );
    const stringifiedNewPosition = JSON.stringify(position);
    this.positions = Array.from(
      new Set([...stringifiedPositions, stringifiedNewPosition])
    ).map((element) => JSON.parse(element));
  }
}

export interface Position {
  start: number;
  end: number;
}
