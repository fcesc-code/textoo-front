import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { ActivitiesService } from 'src/app/activity/services/activities.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { newGame } from '../../interfaces/game.dto';
import { GroupGameService } from '../../services/group-game.service';
import { GreaterThanTodayValidator } from '../../validators/greater-than-today.validator';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.sass'],
})
export class GameDashboardComponent implements OnInit {
  // private emptyGame: newGame = {
  //   users: [],
  //   scores: [],
  //   status: {
  //     scheduled: true,
  //     started: false,
  //     closed: false,
  //     organizer: '',
  //     timed: false,
  //     maxTime: 180,
  //     start: new Date(),
  //   },
  //   info: {
  //     activityId: '1234',
  //     language: '',
  //     keywords: [],
  //     type: '',
  //   },
  // };

  // activity$!: Subscription;
  activity: any;

  newGame: boolean;

  gameForm: FormGroup;
  activityId: FormControl;
  maxTime: FormControl;
  start: FormControl;

  id: string;

  constructor(
    private gameService: GroupGameService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute
  ) {
    console.log('wow, game-dashboard has been built!');
    this.newGame = true;
    this.id = '';

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

    this.gameForm = this.formBuilder.group({
      id: '',
      info: {
        activityId: this.activityId,
      },
      status: {
        maxTime: this.maxTime,
        start: this.start,
        timed: true,
        scheduled: true,
        started: false,
        closed: false,
      },
    });
  }

  ngOnInit(): void {
    // this.activity$ = this.activitiesService
    //   .getActivityById(this.activityId.value)
    //   .subscribe((activity) => {
    //     this.activity = activity;
    //   });
    this.id = this.getId();
  }

  // ngOnDestroy(): void {
  //   this.activity$.unsubscribe();
  // }
  getId(): string {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (id) {
      this.newGame = false;
    }
    return id;
  }

  pickedActivity(eventData: { pickedActivity: string }): void {
    console.log('picked activity event >>>', eventData.pickedActivity);
    this.activityId.setValue(eventData.pickedActivity);
  }

  createGame(newGame: any) {
    console.log('about to create a game', newGame);
    this.gameService
      .createGame(newGame)
      .then((data: any) => {
        console.log('game created, receiving data >>>> ', data);
      })
      .catch((error: Error) => console.log(error));
  }

  updateGame(updatedGame: any) {
    console.log('about to update a game', updatedGame);
    this.gameService
      .updateGame(this.id, updatedGame)
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

  async getActivityBasicInfo() {
    this.activity = await firstValueFrom(
      this.activitiesService.getActivityById(this.activityId.value)
    );
  }

  getOrganizerId(): string {
    const { userId } = this.authService.getUser();
    return userId;
  }

  buildGame(): any {
    const game = { id: this.id, info: {}, status: {} };

    game.info = {
      activityId: this.activity._id,
      language: this.activity.language,
      type: this.activity.type,
      keywords: this.activity.keywords,
    };
    game.status = {
      organizer: this.getOrganizerId(),
      started: false,
      scheduled: false,
      closed: false,
      maxTime: this.maxTime.value,
      start: this.start.value,
    };

    return game;
  }

  async createOrUpdate() {
    await this.getActivityBasicInfo();
    const game = this.buildGame();
    console.log('a game was built: ', game);
    this.newGame ? this.createGame(game) : this.updateGame(game);
  }
}
