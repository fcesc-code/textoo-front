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
// import {
//   AngularFirestore,
//   AngularFirestoreCollection,
//   AngularFirestoreCollectionGroup,
//   AngularFirestoreDocument,
// } from '@angular/fire/compat/firestore';
import {
  collection,
  doc,
  docData,
  DocumentReference,
  CollectionReference,
  Firestore,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  Unsubscribe,
  Query,
  DocumentData,
  collectionData,
  collectionChanges,
  docSnapshots,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class GroupGameService {
  private collection = 'games';
  // private gameCol: AngularFirestoreCollection<Game>;
  private gameCol: any;
  // private userGames: Observable<Game[]>;
  private gameColByUser!: any;
  private userGames: any;
  // game: Observable<Game>;

  constructor(
    // private db: AngularFirestore,
    private db: Firestore
  ) {
    console.log('group-game-service >>> service constructor');
    this.gameCol = collection(this.db, `${this.collection}`);
    console.log('group-game-service >>> constructor: reference was fetched');
    // this.game = this.gameDoc.valueChanges();
  }

  // getAllGames(): AngularFirestoreCollection<Game> {
  //   return this.gameCol;
  // }

  async getAllGamesByAuthor(authorId: string) {
    console.log('entering getAllGamesByAuthor');
    // this.gameColByUser = this.db
    //   .collectionGroup<Game>(`${this.collection}`, (ref) =>
    //     ref.where('status.organizer', '==', authorId)
    //   )
    //   .snapshotChanges();
    // return this.gameColByUser;
    // .where('status.organizer', '==', authorId);
    // this.gameColByUser = this.gameCol.where('status.organizer', '==', authorId).valueChanges({ docId: 'customID'});
    const dbQuery = query(
      this.gameCol,
      where('status.organizer', '==', authorId)
    );
    await getDocs(dbQuery).then((snapshot) => {
      // console.log('initial snapshot >>> ', snapshot.docs);
      let receivedGames: Game[] = [];
      snapshot.docs.forEach((doc: DocumentData) => {
        receivedGames.push({ ...doc['data'](), id: doc['id'] });
      });
      this.userGames = receivedGames;
      // console.log('ready to send data back to component >>> ', this.userGames);
    });
    return this.userGames;
  }

  deleteGame(gameId: string): any {
    console.log(`attempting to delete a doc with id: ${gameId}`);
    // return this.gameCol.doc(gameId).delete();
  }

  // getGame(gameId: string): Promise<Game> {
  //   return this.games.doc(gameId).get();
  // }

  createGame(game: newGame): any {
    // const newGameId = this.db.createId();
    // console.log('The new game id is >>> ', newGameId);
    // const newGame: Game = { ...game, id: newGameId } as Game;
    console.log(`attempting to create a doc with: ${game}`);
    // return this.gameCol.doc(newGameId).set(newGame);
  }

  updateGame(id: string, data: Partial<Game>): any {
    console.log(`attempting to update a doc with id: ${id}`);
    // return this.gameCol.doc(id).update(data);
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
