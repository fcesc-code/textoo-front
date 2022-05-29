import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  Game,
  gameInfo,
  gameScore,
  gameStatus,
  gameUser,
} from '../../interfaces/game.dto';
import { GroupGameService } from '../../services/group-game.service';
import { ActivitiesService } from 'src/app/activity/services/activities.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit, OnDestroy {
  game!: Game;
  activity!: any;
  accessCode!: string;

  constructor(
    private authService: AuthService,
    private gameService: GroupGameService,
    private activatedRoute: ActivatedRoute,
    private activitiesService: ActivitiesService
  ) {}

  ngOnInit(): void {
    this.accessCode = this.activatedRoute.snapshot.paramMap.get('id') || '';

    console.log(
      'gameComponent was called with accessCode >>> ',
      this.accessCode
    );

    // this.status$ = this.gameService
    //   .listenStatusStream(this.accessCode)
    //   .subscribe((status: gameStatus) => {
    //     console.log('new game status >>> ', status);
    //     this.status = status;
    //   });
  }

  ngOnDestroy(): void {
    console.log('hi world');
  }
}
