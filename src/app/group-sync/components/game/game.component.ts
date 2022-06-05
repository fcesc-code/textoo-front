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
import {
  CollectionReference,
  DocumentData,
  FirestoreError,
  onSnapshot,
  Query,
  QueryConstraint,
  QueryDocumentSnapshot,
  QuerySnapshot,
} from 'firebase/firestore';
import { ActivityType } from 'src/app/activities-shared/models/Activity.dto';
import { Player } from '../../interfaces/player.dto';
import { limit, orderBy, query } from '@angular/fire/firestore';
import { Unsubscribe } from '@firebase/util';

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
  unsubscribePlayers!: Unsubscribe;
  playersInGame: Player[] = [];

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
    if (this.game) this.game$.unsubscribe();
    this.unsubscribePlayers();
  }

  getTime(date: string | Date): number {
    return new Date(date).getTime();
  }

  getTwoMinutesFromNow(): number {
    return new Date().getTime() + 2 * 60 * 1000;
  }

  getCurrentTime(): number {
    return this.getTime(new Date());
  }

  getStartTime(): number {
    let result = 0;
    if (this.game?.status?.start) {
      result = this.getTime(this.game.status.start);
    }
    return result;
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

  listenToUsers(): void {
    const DBREF: CollectionReference = this.db.refs.gameUsersCol(this.game.id);
    const ORDER: QueryConstraint = orderBy('teamAlias', 'asc');
    const LIMIT: QueryConstraint = limit(10);
    const QUERY: Query<DocumentData> = query(DBREF, ORDER, LIMIT);

    this.unsubscribePlayers = onSnapshot(QUERY, {
      next: (snapshot: QuerySnapshot<DocumentData>) => {
        const PLAYERS: Player[] = [];
        snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const DOCUMENT = doc.data();
          console.log('adding player >>> ', DOCUMENT);
          const PLAYER = {
            id: doc.id,
            teamId: DOCUMENT['teamId'],
            teamAlias: DOCUMENT['teamAlias'],
            teamAvatar: DOCUMENT['teamAvatar'],
            teamColor: DOCUMENT['teamColor'],
            userId: DOCUMENT['userId'],
            userAlias: DOCUMENT['userAlias'],
            userAvatar: DOCUMENT['userAvatar'],
          };
          PLAYERS.push(PLAYER);
        });
        console.info(PLAYERS);
        this.playersInGame = PLAYERS;
      },
      error: (error: FirestoreError) => {
        console.error(`${error.code}: ${error.message}`);
      },
    });

    // this.db.refs.gameUsersCol(this.gameId).onSnapshot((snapshot) => {
    //   const users = snapshot.docs.map((doc: Player) => doc.data());
    //   this.game.users = users;
    // });
  }
}
