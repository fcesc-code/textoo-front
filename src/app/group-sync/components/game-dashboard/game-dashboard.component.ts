import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
// import { Subscription } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';
// import { AuthService } from 'src/app/auth/services/auth.service';
import { newGame } from '../../interfaces/game.dto';
import { GroupGameService } from '../../services/group-game.service';
import { GreaterThanTodayValidator } from '../../validators/greater-than-today.validator';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.sass'],
})
export class GameDashboardComponent implements OnInit, OnDestroy {
  private emptyGame: newGame = {
    users: [],
    scores: [],
    status: {
      activityId: '1234',
      scheduled: true,
      started: false,
      closed: false,
      organizer: '',
      timed: false,
      maxTime: 180,
      start: new Date(),
    },
  };

  newGame: boolean;

  gameForm: FormGroup;
  activityId: FormControl;
  maxTime: FormControl;
  start: FormControl;

  // constructor(private gameService: GroupGameService) {}
  constructor(
    private gameService: GroupGameService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    console.log('wow, game-dashboard has been built!');
    this.newGame = true;

    this.activityId = new FormControl('', [Validators.required]);
    this.maxTime = new FormControl(0, [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]);
    const now = new Date();
    const tenMinutesFromNow = now.getTime() + 600_000;
    const defaultDateTime = new Date(tenMinutesFromNow);
    this.start = new FormControl(defaultDateTime, [
      Validators.required,
      GreaterThanTodayValidator,
    ]);

    const { userId } = this.authService.getUser();

    this.gameForm = this.formBuilder.group({
      activityId: this.activityId,
      maxTime: this.maxTime,
      start: this.start,
      timed: true,
      scheduled: true,
      started: false,
      closed: false,
      organizer: userId,
    });
  }

  ngOnInit(): void {
    console.log('onInit lifecycle started');
  }

  ngOnDestroy(): void {
    console.log('onDestroy lifecycle started');
  }

  createGame() {
    console.log('about to create a game', this.emptyGame);
    this.gameService
      .createGame(this.emptyGame)
      .then((data: any) => {
        console.log('game created, receiving data >>>> ', data);
      })
      .catch((error: Error) => console.log(error));
  }

  updateGame() {
    console.log('about to update a game', this.emptyGame);
    const MOCK_ID = '1234';
    this.gameService
      .updateGame(MOCK_ID, this.emptyGame)
      .then((data: any) => {
        console.log('game updated, receiving data >>>> ', data);
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

  constCreateOrUpdate() {
    this.newGame ? this.createGame() : this.updateGame();
  }
}
