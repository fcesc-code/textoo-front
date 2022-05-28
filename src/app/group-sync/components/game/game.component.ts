import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  Game,
  gameScore,
  gameStatus,
  gameUser,
} from '../../interfaces/game.dto';
import { GroupGameService } from '../../services/group-game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit, OnDestroy {
  status: gameStatus;
  scores: gameScore[];
  users: gameUser[];
  status$!: Subscription;
  accessCode: string;

  constructor(
    private authService: AuthService,
    private gameService: GroupGameService,
    private activatedRoute: ActivatedRoute
  ) {
    this.status = {
      activityId: '',
      scheduled: true,
      started: false,
      closed: false,
      organizer: '',
      timed: false,
      maxTime: 0,
      start: new Date(),
    };
    (this.users = []), (this.scores = []);
    this.accessCode = '';
  }

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
    this.status$.unsubscribe();
  }
}
