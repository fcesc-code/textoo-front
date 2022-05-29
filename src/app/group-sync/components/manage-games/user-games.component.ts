import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Game } from '../../interfaces/game.dto';
import { GroupGameService } from '../../services/group-game.service';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.sass'],
})
export class UserGamesComponent {
  filteredUserGames: any[];
  userGames: Game[];
  constructor(
    private authService: AuthService,
    private games: GroupGameService
  ) {
    this.filteredUserGames = [];
    this.userGames = [];
    this.loadGames();
  }

  async loadGames(): Promise<void> {
    const { userId } = this.authService.getUser();
    if (userId) {
      // this.games.getAllGamesByAuthor(userId).then((querySnapshot) => {
      //   // querySnapshot.forEach((doc) => {
      //   //   console.log(`this doc (${doc.id}) >>> `, doc);
      //   //   this.userGames.push(doc);
      //   // });
      //   console.log('this.userGames >>> ', querySnapshot);
      // });
      // this.games.getAllGamesByAuthor(userId).subscribe((querySnapshot: any) => {
      //   if (!querySnapshot.docs.length) {
      //     console.log('no data available');
      //   }
      //   if (querySnapshot) {
      //     querySnapshot.forEach((doc: any) => {
      //       console.log(`this doc (${doc.id}) >>> `, doc);
      //       this.userGames.push(doc);
      //     });
      //   }
      // });
      // console.log('loadgames userGames >>> ', this.userGames);
      this.userGames = await this.games.getAllGamesByAuthor(userId);
      this.filteredUserGames = [...this.userGames];
    }
  }

  filterByKeyword(targetKeyword: string): void {
    console.log('filter keyword with >>> ', targetKeyword);
    this.filteredUserGames = [...this.userGames].filter((game: Game) => {
      return game.info.keywords.find(
        (keyword: string) =>
          keyword.toLowerCase().trim() === targetKeyword.toLowerCase().trim()
      );
    });
    console.log('filteredUserGames after filter >>> ', this.filteredUserGames);
  }

  filterByType(targetType: string): void {
    console.log('filter type with >>> ', targetType);
    this.filteredUserGames = [...this.userGames].filter(
      (game: Game) =>
        game.info.type.toLowerCase().trim() === targetType.toLowerCase().trim()
    );
    console.log('filteredUserGames after filter >>> ', this.filteredUserGames);
  }

  filterByLanguage(targetLanguage: string): void {
    console.log('filter language with >>> ', targetLanguage);
    this.filteredUserGames = [...this.userGames].filter(
      (game: Game) =>
        game.info.language.toLowerCase().trim() ===
        targetLanguage.toLowerCase().trim()
    );
    console.log('filteredUserGames after filter >>> ', this.filteredUserGames);
  }

  removeFilters(): void {
    this.filteredUserGames = [...this.userGames];
  }

  filtersApplied(): boolean {
    return this.userGames && this.filteredUserGames && this.userGames.length > 0
      ? this.filteredUserGames.length !== this.userGames.length
      : false;
  }
}
