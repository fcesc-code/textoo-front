import { Injectable } from '@angular/core';
import { Game, newGame } from '../interfaces/game.dto';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class GroupGameService {
  private collection = 'games';
  refs: any;

  constructor(private db: Firestore) {
    this.refs = {
      gamesCol: collection(this.db, `${this.collection}`),
      gamesColByUser: (userId: string) =>
        getDocs(
          query(
            collection(this.db, `${this.collection}`),
            where('status.organizer', '==', userId)
          )
        ),
      gameDocOnce: async (gameId: string) =>
        await getDoc(doc(this.db, `${this.collection}/${gameId}`)),
      gameUsersCol: (gameId: string) =>
        collection(this.db, `${this.collection}/${gameId}/users`),
      gameScoresCol: (gameId: string) =>
        collection(this.db, `${this.collection}/${gameId}/scores`),
      gameDoc: (gameId: string) => doc(this.db, `${this.collection}/${gameId}`),
    };
  }

  deleteGame(gameId: string): any {
    return deleteDoc(doc(this.db, `${this.collection}/${gameId}`));
  }

  createGame(game: newGame): any {
    return addDoc(this.refs.gamesCol, game);
  }

  updateGame(gameId: string, data: Partial<Game>): any {
    return updateDoc(doc(this.db, `${this.collection}/${gameId}`), data);
  }
}
