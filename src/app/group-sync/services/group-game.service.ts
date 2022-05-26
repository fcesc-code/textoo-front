import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { ActivityType } from 'src/app/activity/models/Activity.dto';
import { ActivityBestOption } from '../../activity/models/ActivityBestOption.dto';
import { ActivitySelectText } from '../../activity/models/ActivitySelectText.dto';
import { ActivityTransformAspect } from '../../activity/models/ActivityTransformAspect.dto';
import { API_SYNC_ROUTES } from 'src/routes/API_ROUTES';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Game, gameScore, gameStatus, gameUser } from '../interfaces/game.dto';

@Injectable({
  providedIn: 'root',
})
export class GroupGameService {
  API: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.API = `${API_SYNC_ROUTES.production}`;
  }

  listenGroupGameStream(id: string): Observable<Game> {
    console.log(
      'listenGroupGameStream called in group-game service, calling backend...'
    );
    return this.http
      .get<Game>(`${this.API}/live/game/${id}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getGroupGameOnce(id: string): Observable<Game> {
    return this.http
      .get<Game>(`${this.API}/static/game/${id}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  activateGroupGame(id: string, game: any): Observable<Game> {
    return this.http
      .post<Game>(`${this.API}/static/game/${id}`, game)
      .pipe(catchError(this.sharedService.handleError));
  }
  deleteGroupGame(id: string): Observable<Game> {
    return this.http
      .delete<Game>(`${this.API}/static/game/${id}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  listenStatusStream(id: string): Observable<gameStatus> {
    console.log(
      `listenStatusStream: about to call: ${this.API}/live/status/${id}`
    );
    return this.http
      .get<gameStatus>(`${this.API}/live/status/${id}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getStatusOnce(id: string): Observable<gameStatus> {
    return this.http
      .get<gameStatus>(`${this.API}/static/status/${id}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateStatus(
    id: string,
    changes: Partial<gameStatus>
  ): Observable<gameStatus> {
    return this.http
      .put<gameStatus>(`${this.API}/static/status/${id}`, changes)
      .pipe(catchError(this.sharedService.handleError));
  }

  listenPlayersStream(id: string): Observable<gameUser> {
    return this.http
      .get<gameUser>(`${this.API}/live/users/${id}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getPlayersOnce(id: string): Observable<gameUser> {
    return this.http
      .get<gameUser>(`${this.API}/static/users/${id}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  addUserToGame(id: string, user: gameUser): Observable<gameUser> {
    return this.http
      .post<gameUser>(`${this.API}/static/users/${id}`, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  removeUserFromGame(gameId: string, userId: string): Observable<any> {
    return this.http
      .delete<any>(`${this.API}/static/users/${gameId}/${userId}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  listenScoresStream(id: string): Observable<gameUser> {
    return this.http
      .get<gameUser>(`${this.API}/live/scores/${id}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getScoresOnce(id: string): Observable<gameUser> {
    return this.http
      .get<gameUser>(`${this.API}/static/scores/${id}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  listenUserScoresStream(gameId: string, userId: string): Observable<gameUser> {
    return this.http
      .get<gameUser>(`${this.API}/live/scores/${gameId}/${userId}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUserScoresOnce(gameId: string, userId: string): Observable<gameUser> {
    return this.http
      .get<gameUser>(`${this.API}/static/scores/${gameId}/${userId}`)
      .pipe(catchError(this.sharedService.handleError));
  }

  addScoreToGame(id: string, record: gameUser): Observable<gameScore> {
    return this.http
      .post<gameScore>(`${this.API}/static7scores/${id}`, record)
      .pipe(catchError(this.sharedService.handleError));
  }
}
