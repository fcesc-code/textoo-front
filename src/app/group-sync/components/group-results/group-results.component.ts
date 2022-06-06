import { Component, Input } from '@angular/core';
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
