import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { firstValueFrom, from, Subscription } from 'rxjs';
import { ActivitiesService } from 'src/app/activity/services/activities.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Game, newGame } from '../../interfaces/game.dto';
import { GroupGameService } from '../../services/group-game.service';
import { GreaterThanTodayValidator } from '../../validators/greater-than-today.validator';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.sass'],
})
export class GameDashboardComponent implements OnInit {
  activity: any;
  gameSubscription!: Subscription;
  defaultConstants: Partial<Game>;

  newGame: boolean;

  gameForm: FormGroup;
  activityId: FormControl;
  activityTitle: FormControl;
  maxTime: FormControl;
  start: FormControl;
  title: FormControl;
  id: string;

  constructor(
    private gameService: GroupGameService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute,
    private db: GroupGameService
  ) {
    console.log('wow, game-dashboard has been built!');
    this.newGame = true;
    this.id = '';
    this.defaultConstants = {
      status: {
        timed: true,
        scheduled: true,
        started: false,
        closed: false,
      },
    } as Partial<Game>;

    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(50),
    ]);
    this.activityId = new FormControl({ value: '', disabled: true });
    this.activityTitle = new FormControl({ value: '', disabled: true });
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
      title: '',
      info: {
        activityId: this.activityId,
        activityTitle: this.activityTitle,
      },
      status: {
        maxTime: this.maxTime,
        start: this.start,
        timed: this.defaultConstants?.status?.timed,
        scheduled: this.defaultConstants?.status?.scheduled,
        started: this.defaultConstants?.status?.started,
        closed: this.defaultConstants?.status?.closed,
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
    this.loadGame();
  }

  // ngOnDestroy(): void {
  //   this.activity$.unsubscribe();
  // }

  loadGame() {
    const promiseSource = from(
      this.db.refs.gameDoc(this.id).then((snapshot: DocumentData) => {
        return snapshot['data']();
      })
    );
    this.gameSubscription = promiseSource.subscribe((data: any) => {
      console.log('iuhu, data >>> ', data);
      this.title.setValue(data.title);
      this.activityId.setValue(data.info.activityId);
      this.activityTitle.setValue(data.info.activityTitle);
      this.maxTime.setValue(data.status.maxTime);
      this.start.setValue(data.status.start);
    });
  }

  getId(): string {
    const id = this.activatedRoute.snapshot.paramMap.get('id') || '';
    if (id) {
      this.newGame = false;
    }
    return id;
  }

  getActivityId(): string {
    return !this.newGame ? this.activityId.value : '';
  }

  pickedActivity(eventData: { id: string; title: string }): void {
    console.log('picked activity event >>>', eventData);
    this.activityId.setValue(eventData.id);
    this.activityTitle.setValue(eventData.title);
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
    const game = { id: this.id, title: this.title, info: {}, status: {} };

    game.info = {
      activityTitle: this.activity.title,
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
