import { Component, Input } from '@angular/core';
import { AnswerScores } from 'src/app/activities-shared/models/Answer.dto';

@Component({
  selector: 'app-activity-results',
  templateUrl: './activity-results.component.html',
  styleUrls: ['./activity-results.component.sass'],
})
export class ActivityResultsComponent {
  constructor() {}

  @Input() answer: AnswerScores = {} as AnswerScores;
  @Input() multiplayer: boolean = false;
}
