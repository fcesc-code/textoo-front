import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { firstValueFrom, from, Subscription } from 'rxjs';
import { ActivitiesSharedService } from 'src/app/activities-shared/services/activities-shared.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Game } from '../../interfaces/game.dto';
import { GroupGameService } from '../../services/group-game.service';
import { DatePickValidator } from '../../validators/greater-than-today.validator';

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
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activitiesSharedService: ActivitiesSharedService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService,
    private db: GroupGameService
  ) {
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
      DatePickValidator(),
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
    this.id = this.getId();
    this.loadGame();
  }

  loadGame() {
    if (this.id) {
      const promiseSource = from(
        this.db.refs.gameDoc(this.id).then((snapshot: DocumentData) => {
          return snapshot['data']();
        })
      );
      this.gameSubscription = promiseSource.subscribe((data: any) => {
        this.title.setValue(data.title);
        this.activityId.setValue(data.info.activityId);
        this.activityTitle.setValue(data.info.activityTitle);
        this.maxTime.setValue(data.status.maxTime);
        this.start.setValue(data.status.start);
      });
    }
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
    this.activityId.setValue(eventData.id);
    this.activityTitle.setValue(eventData.title);
  }

  createGame(newGame: Game) {
    this.db
      .createGame(newGame)
      .then(() => {
        this.success(`El joc s'ha creat correctament`);
      })
      .catch((error: any) => {
        this.sharedService.errorLog(error);
        this.failure(`El joc no s'ha pogut crear`, error);
      });
  }

  updateGame(updatedGame: Partial<Game>) {
    this.db
      .updateGame(this.id, updatedGame)
      .then(() => {
        this.success(`El joc ${this.id} s'ha actualitzat correctament`);
      })
      .catch((error: any) => {
        this.failure(`El joc ${this.id}no ha pogut ser eliminat`, error);
      });
  }

  deleteGame(id: string) {
    this.db
      .deleteGame(id)
      .then(() => {
        this.success(`El joc ${id} s'ha eliminat correctament`);
      })
      .catch((error: any) => {
        this.failure(`El joc ${id}no ha pogut ser eliminat`, error);
      });
  }

  async getActivityBasicInfo() {
    this.activity = await firstValueFrom(
      this.activitiesSharedService.getActivityById(this.activityId.value)
    );
  }

  getOrganizerId(): string {
    const { userId } = this.authService.getUser();
    return userId;
  }

  buildGame(): any {
    const game = { id: this.id, title: this.title.value, info: {}, status: {} };

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
    console.log(
      'createOrUpdate called, form is currently valid ? ',
      this.gameForm.valid
    );
    console.log(
      'createOrUpdate called, form is currently dirty ? ',
      this.gameForm.dirty
    );
    if (this.gameForm.valid) {
      await this.getActivityBasicInfo();
      const game = this.buildGame();
      this.newGame ? this.createGame(game) : this.updateGame(game);
    }
  }

  success(message: string) {
    console.log('SUCCESS: ', message);
    this.router.navigateByUrl('/games/dashboard');
  }

  failure(message: string, error: any) {
    console.log('FAILURE: ', message);
    this.sharedService.errorLog(error);
    // this.sharedService.managementToast(
    //   // `L'operació esborrar joc no s'ha completat.`,
    //   'gameDashboardFeedback',
    //   false,
    //   error
    // );
  }
}
