import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  Game,
  gameScore,
  gameStatus,
  gameUser,
} from '../../interfaces/game.dto';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent {
  status: gameStatus;
  scores: gameScore[];
  users: gameUser[];
  status$!: Subscription;

  constructor(private authService: AuthService) {
    this.status = {
      gameId: '',
      scheduled: true,
      started: false,
      closed: false,
    };
    (this.users = []), (this.scores = []);
  }

  @Input() accessCode: string = '';
}
