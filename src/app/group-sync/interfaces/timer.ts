export interface Timer {
  days: TimerElement;
  hours: TimerElement;
  minutes: TimerElement;
  seconds: TimerElement;
}

export interface TimerElement {
  value: number;
  display: boolean;
}
