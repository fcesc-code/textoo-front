import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Subscription } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';
// import { AuthService } from 'src/app/auth/services/auth.service';
import { newGame } from '../../interfaces/game.dto';
import { GroupGameService } from '../../services/group-game.service';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.sass'],
})
export class GameDashboardComponent implements OnInit, OnDestroy {
  // constructor(private gameService: GroupGameService) {}
  constructor(private gameService: GroupGameService) {
    console.log('wow, game-dashboard has been built!');
  }

  ngOnInit(): void {
    console.log('onInit lifecycle started');
  }

  ngOnDestroy(): void {
    console.log('onDestroy lifecycle started');
  }

  createGame() {
    const game: newGame = {
      users: [],
      scores: [],
      status: {
        activityId: '1234',
        scheduled: true,
        started: false,
        closed: false,
      },
    };
    console.log('about to create a game', game);
    this.gameService
      .createGame(game)
      .then((data: any) => {
        console.log('game created, receiving data >>>> ', data);
      })
      .catch((error: Error) => console.log(error));
  }

  deleteGame(id: string) {
    console.log('about to delete a game');
    this.gameService
      .deleteGame(id)
      .then(() => {
        console.log('game deleted');
      })
      .catch((error: Error) => console.log(error));
  }
}
