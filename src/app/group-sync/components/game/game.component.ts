import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  Classification,
  Game,
  gameInfo,
  gameScore,
  gameStatus,
  GroupScore,
} from '../../interfaces/game.dto';
import { GroupGameService } from '../../services/group-game.service';
import { ActivitiesSharedService } from 'src/app/activities-shared/services/activities-shared.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
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
import { Answer } from 'src/app/activities-shared/models/Answer.dto';

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
  unsubscribeGame!: Unsubscribe;
  playersInGame: Player[] = [];
  routeSubscription!: Subscription;
  multiplayer: boolean = true;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private activitiesSharedService: ActivitiesSharedService,
    private sharedService: SharedService,
    private db: GroupGameService,
    private router: Router
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
        this.db.refs.gameDocOnce(this.gameId).then((snapshot: DocumentData) => {
          return snapshot['data']();
        })
      );
      this.game$ = promiseSource.subscribe((data: any) => {
        this.game = data;
        this.connectUser();
        this.listenToGame();
      });
      this.routeSubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.ngOnDestroy();
        }
      });
    }
  }

  ngOnDestroy(): void {
    if (this.game) this.game$.unsubscribe();
    this.disconnectUser();
    this.unsubscribeGame();
    this.routeSubscription.unsubscribe();
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

  hasStarted(): boolean {
    return this.getStartTime() <= this.getCurrentTime();
  }

  hasEnded(): boolean {
    return this.getEndTime() <= this.getCurrentTime();
  }

  lessThanTwoMinutesToStart(): boolean {
    return this.getStartTime() <= this.getTwoMinutesFromNow();
  }

  listenToGame(): void {
    // const CLREF: CollectionReference = this.db.refs.gameUsersCol(this.game.id);
    // const ORDER: QueryConstraint = orderBy('teamAlias', 'asc');
    // const LIMIT: QueryConstraint = limit(10);
    // const QUERY: Query<DocumentData> = query(DBREF, ORDER, LIMIT);
    const DBREF: DocumentReference = this.db.refs.gameDoc(this.game.id);

    this.unsubscribeGame = onSnapshot(DBREF, {
      next: (snapshot: DocumentSnapshot<DocumentData>) => {
        const DOC = snapshot.data();
        if (DOC) {
          console.log('update from DB received >>> ', DOC);
          this.game = DOC as Game;
        }
        this.allOnlineUsersHaveAnswered();
      },
      error: (error: FirestoreError) => {
        console.error(`${error.code}: ${error.message}`);
      },
    });
  }

  connectUser() {
    if (this.game) {
      let changes = false;
      this.game.players.map((player) => {
        if (player.userId === this.userId && !player.online) {
          player.online = true;
          changes = true;
        }
        return player;
      });
      if (changes) this.updateGame();
    }
  }

  disconnectUser() {
    if (this.game) {
      let changes = false;
      this.game.players.map((player) => {
        if (player.userId === this.userId && player.online) {
          player.online = false;
          changes = true;
        }
        return player;
      });
      if (changes) this.updateGame();
    }
  }
  updateGame() {
    console.log('update game was called with game: ', this.game);
    this.db
      .updateGame(this.game.id, this.game)
      .then(() => {
        this.success(`El joc ${this.game.id} s'ha actualitzat correctament`);
      })
      .catch((error: any) => {
        this.failure(`El joc ${this.game.id}no ha pogut ser eliminat`, error);
      });
  }

  success(message: string) {
    console.log('SUCCESS: ', message);
  }

  failure(message: string, error: any) {
    console.log('FAILURE: ', message);
    this.sharedService.errorLog(error);
  }

  onAnswerEvent(eventData: Answer) {
    console.log('answerEvent!');
    const userHasAnswered = this.game.scores.find(
      (score) => score.userId === this.userId
    );
    if (!userHasAnswered) {
      this.game.scores.push({ ...eventData.basicData, id: '' } as gameScore);
      this.updateGame();
    }
  }

  allOnlineUsersHaveAnswered(): boolean {
    const ONLINE_PLAYERS = this.game.players
      .filter((player) => player.online)
      .map((player) => player.userId);
    for (let playerId of ONLINE_PLAYERS) {
      const playerAnswer = this.game.scores.find(
        (score) => score.userId === playerId
      );
      if (!playerAnswer) return false;
    }
    this.calculateGroupScores();
    this.updateGame();
    return true;
  }

  calculateGroupScores() {
    const GROUP_SCORES: GroupScore = {
      average: {
        correct: 0,
        incorrect: 0,
        answered: 0,
        unanswered: 0,
      },
      points: {
        average: 0,
        highest: 0,
      },
      participants: 0,
      leaderboard: [],
    };

    const REDUCER = (accumulator: any, currentValue: any): GroupScore => {
      const SCORES = currentValue.scores;
      accumulator.average.correct += SCORES.rates.correct;
      accumulator.average.incorrect += SCORES.rates.incorrect;
      accumulator.average.answered += SCORES.rates.answered;
      accumulator.average.unanswered += 1 - SCORES.rates.answered;
      accumulator.points.average += SCORES.points.percent;
      accumulator.points.highest =
        accumulator.points.highest >= SCORES.points.total
          ? accumulator.points.highest
          : SCORES.points.total;
      accumulator.participants += 1;
      return accumulator;
    };

    [...this.game.scores].reduce(REDUCER, GROUP_SCORES);

    GROUP_SCORES.participants = this.game.players.length;
    GROUP_SCORES.leaderboard = [...this.game.scores]
      .map((score) => ({
        userId: score.userId,
        userAlias: this.getPlayerName(score.userId),
        points: score.correct * score.pointsPerQuestion,
      }))
      .sort((a, b) => b.points - a.points);

    this.game.groupScores = GROUP_SCORES;
    console.log('groupScores: ', this.game.groupScores);
  }

  getPlayerName(id: string): string {
    const player = this.game.players.find((player) => player.userId === id);
    return player ? player.userAlias : '';
  }
}
