import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { Timer } from '../../interfaces/timer';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.sass'],
})
export class CountdownComponent implements OnInit, OnDestroy {
  initialValue = 0;
  remainingTime!: Timer;
  counter$!: Subscription;
  finishTime: number;

  constructor() {
    this.finishTime = 0;
    this.remainingTime = {
      days: {
        value: this.initialValue,
        display: false,
      },
      hours: {
        value: this.initialValue,
        display: false,
      },
      minutes: {
        value: this.initialValue,
        display: true,
      },
      seconds: {
        value: this.initialValue,
        display: true,
      },
    };
  }
  @Input() targetDate: Date = new Date();
  @Input() title: string = '';

  ngOnInit(): void {
    this.finishTime = new Date(this.targetDate).getTime();
    this.counter$ = interval(1000).subscribe(() => this.updateTime());
  }

  ngOnDestroy() {
    if (this.counter$) this.counter$.unsubscribe();
  }

  updateTime() {
    const now = new Date();
    const timeGap = this.finishTime - now.getTime();

    const days = Math.floor(timeGap / (1000 * 60 * 60 * 24));
    const hours = Math.floor(timeGap / (1000 * 60 * 60));
    const mins = Math.floor(timeGap / (1000 * 60));
    const secs = Math.floor(timeGap / 1000);

    this.remainingTime.days.value = days;
    this.remainingTime.hours.value = hours - days * 24;
    this.remainingTime.minutes.value = mins - hours * 60;
    this.remainingTime.seconds.value = secs - mins * 60;

    this.remainingTime.days.display =
      this.remainingTime.days.value >= 1 ? true : false;
    this.remainingTime.hours.display =
      this.remainingTime.days.value >= 1
        ? true
        : this.remainingTime.days.value < 1 &&
          this.remainingTime.hours.value >= 1
        ? true
        : false;
    this.remainingTime.minutes.display =
      this.remainingTime.days.value < 1 ? true : false;
    this.remainingTime.seconds.display =
      this.remainingTime.days.value < 1 && this.remainingTime.hours.value < 1
        ? true
        : false;
  }
}
