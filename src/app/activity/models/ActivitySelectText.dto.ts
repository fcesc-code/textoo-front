import {
  Activity,
  ActivityConstructor,
  ActivityType,
  Timestamps,
} from './Activity.dto';

export class ActivitySelectText extends Activity {
  private _text!: string;
  private _positions!: Position[];

  constructor({
    language,
    author,
    task,
    font,
    title,
    activityId,
    scores,
    keywords,
    timestamps,
    text,
    positions,
    _id,
  }: ActivitySelectTextConstructor) {
    super({
      type: ActivityType.SELECT_TEXT,
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
    this.positions = positions;
  }

  get text(): string {
    return this._text;
  }
  set text(text: string) {
    this._text = text;
  }
  get positions(): Position[] {
    return this._positions;
  }
  set positions(positions: Position[]) {
    this._positions = positions;
  }
  addPosition(position: Position) {
    const stringifiedPositions = [...this._positions].map((element) =>
      JSON.stringify(element)
    );
    const stringifiedNewPosition = JSON.stringify(position);
    this._positions = Array.from(
      new Set([...stringifiedPositions, stringifiedNewPosition])
    ).map((element) => JSON.parse(element));
  }
  removePosition(position: Position) {
    this._positions = [...this._positions].filter(
      (element) => JSON.stringify(element) !== JSON.stringify(position)
    );
  }
}

export interface Position {
  start: number;
  end: number;
  index: number;
}

export interface ActivitySelectTextConstructor extends ActivityConstructor {
  text: string;
  positions: Position[];
  timestamps: Timestamps;
  keywords: string[];
}

export interface TextSelection {
  selected: string;
  start: number;
  end: number;
  value?: boolean;
}
