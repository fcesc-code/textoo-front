import { Injectable } from '@angular/core';
import { Game, newGame } from '../interfaces/game.dto';
import {
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
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
      gameDoc: async (gameId: string) =>
        await getDoc(doc(this.db, `${this.collection}/${gameId}`)),
      gameUsersCol: (gameId: string) =>
        collection(this.db, `${this.collection}/${gameId}/users`),
      gameScoresCol: (gameId: string) =>
        collection(this.db, `${this.collection}/${gameId}/scores`),
    };
  }

  deleteGame(gameId: string): any {
    console.log(`attempting to delete a doc with id: ${gameId}`);
    return deleteDoc(doc(this.db, `${this.collection}/${gameId}`));
  }

  createGame(game: newGame): any {
    const newGameId = this.refs.gameCol().createId();
    console.log('The new game id is >>> ', newGameId);
    const newGame: Game = { ...game, id: newGameId } as Game;
    console.log(`attempting to create a doc with: ${newGame}`);
    return this.refs.gameCol().doc(newGameId).set(newGame);
  }

  updateGame(id: string, data: Partial<Game>): any {
    console.log(`attempting to update a doc with id: ${id}`);
    return this.refs.gameCol().doc(id).update(data);
  }
}
