import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
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
import { ActivitiesSharedService } from 'src/app/activities-shared/services/activities-shared.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DocumentData } from 'firebase/firestore';
import { ActivityType } from 'src/app/activities-shared/models/Activity.dto';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass'],
})
export class GameComponent implements OnInit, OnDestroy {
  game$!: Subscription;
  game!: Game;
  protected gameId: string;
  protected userId: string;
  activityTypes = ActivityType;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private activitiesSharedService: ActivitiesSharedService,
    private sharedService: SharedService,
    private db: GroupGameService
  ) {
    this.gameId = '';
    this.userId = '';
  }

  ngOnInit(): void {
    this.gameId = this.activatedRoute.snapshot.paramMap.get('id') || '';
    const { userId } = this.authService.getUser();
    this.userId = userId;
    if (this.gameId) {
      const promiseSource = from(
        this.db.refs.gameDoc(this.gameId).then((snapshot: DocumentData) => {
          return snapshot['data']();
        })
      );
      this.game$ = promiseSource.subscribe((data: any) => {
        this.game = data;
      });
    }
  }

  ngOnDestroy(): void {
    this.game$.unsubscribe();
  }

  getTime(date: string | Date): number {
    return new Date(date).getTime();
  }

  getCurrentTime(): number {
    return this.getTime(new Date());
  }

  getStartTime(): number {
    return this.getTime(this.game.status.start);
  }

  getEndTime(): number {
    return this.getTime(this.getEndDate());
  }

  getStartDate(): Date {
    return new Date(this.game.status.start);
  }

  getEndDate(): Date {
    const start = this.getStartTime();
    const lag = this.game.status.maxTime * 1000;
    const end = new Date(start + lag);
    return end;
  }
}
