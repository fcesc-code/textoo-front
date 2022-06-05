import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  Answer,
  AnswerScores,
} from 'src/app/activities-shared/models/Answer.dto';
import { GroupScore } from '../../interfaces/game.dto';

@Component({
  selector: 'app-group-results',
  templateUrl: './group-results.component.html',
  styleUrls: ['./group-results.component.sass'],
})
export class GroupResultsComponent implements OnChanges, OnInit {
  scores: unknown[] = [];
  @Input() answers: Answer[] = [];
  @Input() groupScores: GroupScore = {} as GroupScore;

  ngOnInit() {
    this.transform();
  }

  ngOnChanges() {
    this.transform();
  }

  transform() {
    this.scores = this.answers.map((answer) => answer.scores);
  }
}
