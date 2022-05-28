import { Injectable } from '@angular/core';
// import { catchError, Observable, tap } from 'rxjs';
// import { API_SYNC_ROUTES } from 'src/routes/API_ROUTES';
// import { HttpClient } from '@angular/common/http';
// import { SharedService } from 'src/app/shared/services/shared.service';
import {
  Game,
  gameScore,
  gameStatus,
  gameUser,
  newGame,
} from '../interfaces/game.dto';
// import 'firebase/firestore';
// import { Firestore } from '@angular/fire/firestore';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreCollectionGroup,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupGameService {
  private collection = 'games';
  private gameCol: AngularFirestoreCollection<Game>;
  private gameColByUser!: any;
  // game: Observable<Game>;

  constructor(private db: AngularFirestore) {
    console.log('group-game-service >>> service constructor');
    this.gameCol = this.db.collection<Game>(`${this.collection}`);
    console.log('group-game-service >>> constructor: reference was fetched');
    // this.game = this.gameDoc.valueChanges();
  }

  // getAllGames(): AngularFirestoreCollection<Game> {
  //   return this.gameCol;
  // }

  getAllGamesByAuthor(authorId: string): AngularFirestoreCollection<Game> {
    this.gameColByUser = this.db.collectionGroup<Game>(
      `${this.collection}`,
      (ref) => ref.where('status.organizer', '==', authorId)
    );
    return this.gameColByUser;
    // .where('status.organizer', '==', authorId);
  }

  deleteGame(gameId: string): Promise<void> {
    console.log(`attempting to delete a doc with id: ${gameId}`);
    return this.gameCol.doc(gameId).delete();
  }

  // getGame(gameId: string): Promise<Game> {
  //   return this.games.doc(gameId).get();
  // }

  createGame(game: newGame): any {
    const newGameId = this.db.createId();
    console.log('The new game id is >>> ', newGameId);
    const newGame: Game = { ...game, id: newGameId } as Game;
    console.log(`attempting to create a doc with: ${newGame}`);
    return this.gameCol.doc(newGameId).set(newGame);
    // this.gameCol.add(newGame);
  }

  updateGame(id: string, data: Partial<Game>): any {
    console.log(`attempting to update a doc with id: ${id}`);
    return this.gameCol.doc(id).update(data);
  }

  // listenGame(ref: string) {
  //   return this.games()
  //     .collection(ref)
  //     .onSnapshot((snapshot) => {
  //       snapshot.forEach((doc) => {
  //         console.log(doc.data());
  //       });
  //     });
  // }

  // existsGame(ref: string) {
  //   return this.games()
  //     .collection(ref)
  //     .get()
  //     .then((snapshot) => {
  //       return snapshot.size > 0;
  //     });
  // }
}
