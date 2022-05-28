import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { API_SYNC_ROUTES } from 'src/routes/API_ROUTES';
import { HttpClient } from '@angular/common/http';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Game, gameScore, gameStatus, gameUser } from '../interfaces/game.dto';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class OldGroupGameService {
  API: string;

  // private http: HttpClient, private sharedService: SharedService,
  constructor(private firestore: Firestore) {
    this.API = `${API_SYNC_ROUTES.production}`;
  }

  // listenGroupGameStream(id: string): Observable<Game> {
  //   console.log(
  //     'listenGroupGameStream called in group-game service, calling backend...'
  //   );
  //   return this.http
  //     .get<Game>(`${this.API}/live/game/${id}`)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // getGroupGameOnce(id: string): Observable<Game> {
  //   return this.http
  //     .get<Game>(`${this.API}/static/game/${id}`)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // activateGroupGame(id: string, game: any): Observable<Game> {
  //   return this.http
  //     .post<Game>(`${this.API}/static/game/${id}`, game)
  //     .pipe(catchError(this.sharedService.handleError));
  // }
  // deleteGroupGame(id: string): Observable<Game> {
  //   return this.http
  //     .delete<Game>(`${this.API}/static/game/${id}`)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // listenStatusStream(id: string): Observable<gameStatus> {
  //   console.log(
  //     `listenStatusStream: about to call: ${this.API}/live/status/${id}`
  //   );
  //   return this.http
  //     .get<gameStatus>(`${this.API}/live/status/${id}`)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // getStatusOnce(id: string): Observable<gameStatus> {
  //   return this.http
  //     .get<gameStatus>(`${this.API}/static/status/${id}`)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // updateStatus(
  //   id: string,
  //   changes: Partial<gameStatus>
  // ): Observable<gameStatus> {
  //   return this.http
  //     .put<gameStatus>(`${this.API}/static/status/${id}`, changes)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // listenPlayersStream(id: string): Observable<gameUser> {
  //   return this.http
  //     .get<gameUser>(`${this.API}/live/users/${id}`)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // getPlayersOnce(id: string): Observable<gameUser> {
  //   return this.http
  //     .get<gameUser>(`${this.API}/static/users/${id}`)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // addUserToGame(id: string, user: gameUser): Observable<gameUser> {
  //   return this.http
  //     .post<gameUser>(`${this.API}/static/users/${id}`, user)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // removeUserFromGame(gameId: string, userId: string): Observable<any> {
  //   return this.http
  //     .delete<any>(`${this.API}/static/users/${gameId}/${userId}`)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // listenScoresStream(id: string): Observable<gameUser> {
  //   return this.http
  //     .get<gameUser>(`${this.API}/live/scores/${id}`)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // getScoresOnce(id: string): Observable<gameUser> {
  //   return this.http
  //     .get<gameUser>(`${this.API}/static/scores/${id}`)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // listenUserScoresStream(gameId: string, userId: string): Observable<gameUser> {
  //   return this.http
  //     .get<gameUser>(`${this.API}/live/scores/${gameId}/${userId}`)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // getUserScoresOnce(gameId: string, userId: string): Observable<gameUser> {
  //   return this.http
  //     .get<gameUser>(`${this.API}/static/scores/${gameId}/${userId}`)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // addScoreToGame(id: string, record: gameUser): Observable<gameScore> {
  //   return this.http
  //     .post<gameScore>(`${this.API}/static7scores/${id}`, record)
  //     .pipe(catchError(this.sharedService.handleError));
  // }

  // deleteGame(ref: string) {
  //   // return admin.database().ref(ref).remove();
  //   return this.firestore.collection(ref).delete();
  // }

  // getGame(ref: string) {
  //   // return admin.database().ref(ref).get();
  //   return this.firestore.collection(ref).doc(id).get();
  // }

  // update(ref: string, id: string, data: any) {
  //   return admin.database().ref(ref).child(id).update(data);
  //   // return this.firestore().collection(ref).doc(id).update(data);
  // }

  // createGame(ref: string, data: any) {
  //   console.log('entering create game service');
  //   // return admin.database().ref(ref).push(data);
  //   return this.firestore.collection(ref).add(data);
  // }

  // // getAllGames(ref: string) {
  // //   return admin.database().ref(ref).once('value');
  // //   // return this.firestore().collection(ref).get();
  // // }

  // // deleteGame(ref: string, id: string) {
  // //   return admin.database().ref(ref).child(id).remove();
  // //   // return this.firestore().collection(ref).get().then(snapshot => {
  // //   //   snapshot.forEach(doc => {
  // //   //     doc.ref.delete();
  // //   //   });
  // //   // });
  // // }

  // // createGame(ref: string, data: any) {
  // //   return admin.database().ref(ref).set(data);
  // //   // return this.firestore().collection(ref).add(data);
  // // }

  // listenGame(ref: string) {
  //   // return admin
  //   //   .database()
  //   //   .ref(ref)
  //   //   .on('value', (snapshot: any) => {
  //   //     console.log('service listenGame >>> update', snapshot.val());
  //   //     return snapshot.val();
  //   //   });
  //   return this.firestore()
  //     .collection(ref)
  //     .onSnapshot((snapshot) => {
  //       snapshot.forEach((doc) => {
  //         console.log(doc.data());
  //       });
  //     });
  // }

  // existsGame(ref: string) {
  //   // return admin
  //   //   .database()
  //   //   .ref(ref)
  //   //   .once('value')
  //   //   .then((snapshot) => {
  //   //     return snapshot.val() !== null;
  //   //   });
  //   return this.firestore()
  //     .collection(ref)
  //     .get()
  //     .then((snapshot) => {
  //       return snapshot.size > 0;
  //     });

  //   addUserToGame(ref: string, user: gameUser) {
  //     return admin.database().ref(ref).child('users').push(user);
  //   }

  //   removeUserFromGame(ref: string, userId: string) {
  //     return admin.database().ref(ref).child('users').child(userId).remove();
  //   }

  //   checkUserInGame(ref: string, userId: string) {
  //     return admin
  //       .database()
  //       .ref(ref)
  //       .child('users')
  //       .once('value')
  //       .then((snapshot) => {
  //         return snapshot.val()[userId] !== undefined;
  //       });
  //   }

  //   listenUsersInGame(ref: string) {
  //     // return admin
  //     //   .database()
  //     //   .ref(ref)
  //     //   .child('users')
  //     //   .on('value', (snapshot: any) => {
  //     //     console.log('service listenUserInGame >>> update', snapshot.val());
  //     //     return snapshot.val();
  //     //   });
  //       return this.firestore().collection(ref).onSnapshot(snapshot => {
  //         snapshot.forEach(doc => {
  //           console.log(doc.data());
  //         });
  //       });
  //   }

  //   getGameStatus(ref: string) {
  //     return admin.database().ref(ref).child('status').once('value');
  //   }

  //   listenGameStatus(ref: string) {
  //     return admin
  //       .database()
  //       .ref(ref)
  //       .child('status')
  //       .on('value', (snapshot: any) => {
  //         console.log('service listenGameStatus >>> update', snapshot.val());
  //         return snapshot.val();
  //       });
  //   }

  //   updateGameStatus(ref: string, data: any) {
  //     // console.log('entering updateGameStatus service with >>>', ref, data);
  //     return admin.database().ref(ref).child('status').update(data);
  //   }

  //   updateGameScores(ref: string, userId: string, data: gameScore) {
  //     return admin.database().ref(ref).child('scores').child(userId).update(data);
  //   }

  //   listenGameScores(ref: string) {
  //     return admin
  //       .database()
  //       .ref(ref)
  //       .child('scores')
  //       .on('value', (snapshot: any) => {
  //         console.log('service listenGameScores >>> update', snapshot.val());
  //         return snapshot.val();
  //       });
  //   }

  //   listenGameScore(ref: string, userId: string) {
  //     return admin
  //       .database()
  //       .ref(ref)
  //       .child('scores')
  //       .child(userId)
  //       .on('value', (snapshot: any) => {
  //         console.log('service listenGameScore >>> update', snapshot.val());
  //         return snapshot.val();
  //       });
  //   }

  //   getGameScores(ref: string) {
  //     return admin.database().ref(ref).child('scores').once('value');
  //   }

  //   getGameScore(ref: string, userId: string) {
  //     return admin
  //       .database()
  //       .ref(ref)
  //       .child('scores')
  //       .child(userId)
  //       .once('value');
  //   }

  //   createGameScore(ref: string, userId: string, data: gameScore) {
  //     return admin.database().ref(ref).child('scores').child(userId).set(data);
  //   }
}
