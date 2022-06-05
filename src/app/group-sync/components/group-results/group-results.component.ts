import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  Answer,
  AnswerScores,
} from 'src/app/activities-shared/models/Answer.dto';
import { gameScore, GroupScore } from '../../interfaces/game.dto';

@Component({
  selector: 'app-group-results',
  templateUrl: './group-results.component.html',
  styleUrls: ['./group-results.component.sass'],
})
export class GroupResultsComponent {
  @Input() answers: gameScore[] = [];
  @Input() groupScores: GroupScore = {} as GroupScore;
}
