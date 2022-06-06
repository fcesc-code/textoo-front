import { Component, OnDestroy } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { from, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Game } from '../../interfaces/game.dto';
import { GroupGameService } from '../../services/group-game.service';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.sass'],
})
export class UserGamesComponent implements OnDestroy {
  filteredUserGames: any[];
  userGames: Game[];
  userGamesSubscription!: Subscription;

  constructor(private authService: AuthService, private db: GroupGameService) {
    this.filteredUserGames = [];
    this.userGames = [];
    this.loadGames();
  }

  ngOnDestroy(): void {
    if (this.userGamesSubscription) this.userGamesSubscription.unsubscribe();
  }

  async loadGames(): Promise<void> {
    const { userId } = this.authService.getUser();
    if (userId) {
      const promiseSource = from(
        this.db.refs.gamesColByUser(userId).then((snapshot: DocumentData) => {
          let receivedGames: Game[] = [];
          snapshot['docs'].forEach((doc: DocumentData) => {
            receivedGames.push({ ...doc['data'](), id: doc['id'] });
          });
          return receivedGames;
        })
      );
      this.userGamesSubscription = promiseSource.subscribe((data: any) => {
        this.userGames = data;
        this.filteredUserGames = [...this.userGames];
        this.filterByNotClosed();
      });
    }
  }

  filterByKeyword(targetKeyword: string): void {
    this.filteredUserGames = [...this.userGames].filter((game: Game) => {
      return game.info.keywords.find(
        (keyword: string) =>
          keyword.toLowerCase().trim() === targetKeyword.toLowerCase().trim()
      );
    });
  }

  filterByType(targetType: string): void {
    this.filteredUserGames = [...this.userGames].filter(
      (game: Game) =>
        game.info.type.toLowerCase().trim() === targetType.toLowerCase().trim()
    );
  }

  filterByLanguage(targetLanguage: string): void {
    this.filteredUserGames = [...this.userGames].filter(
      (game: Game) =>
        game.info.language.toLowerCase().trim() ===
        targetLanguage.toLowerCase().trim()
    );
  }

  filterByNotClosed(): void {
    const NOW = new Date();
    const CURRENT_TIME = NOW.getTime();
    this.filteredUserGames = [...this.userGames].filter((game: Game) => {
      const START = new Date(game.status.start).getTime();
      return CURRENT_TIME < START;
    });
  }

  removeFilters(): void {
    this.filteredUserGames = [...this.userGames];
  }

  filtersApplied(): boolean {
    return this.userGames && this.filteredUserGames && this.userGames.length > 0
      ? this.filteredUserGames.length !== this.userGames.length
      : false;
  }

  deleteGame(gameId: string): void {
    this.db.deleteGame(gameId);
    this.loadGames();
  }
}
