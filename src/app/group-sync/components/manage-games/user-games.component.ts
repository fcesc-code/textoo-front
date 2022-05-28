import { Component } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
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
    }
  }

  filterByKeyword(targetKeyword: string): void {
    // this.filteredUserGames = [...this.activities$].filter((activity: any) => {
    //   return activity.keywords.find(
    //     (keyword: string) =>
    //       targetKeyword.toLowerCase().trim() === keyword.toLowerCase().trim()
    //   );
    // });
  }

  filterByType(targetType: string): void {
    // this.filteredUserGames = [...this.activities$].filter(
    //   (activity: any) =>
    //     activity.type.toLowerCase().trim() === targetType.toLowerCase().trim()
    // );
  }

  filterByLanguage(targetLanguage: string): void {
    // this.filteredUserGames = [...this.activities$].filter(
    //   (activity: any) =>
    //     activity.language.toLowerCase().trim() ===
    //     targetLanguage.toLowerCase().trim()
    // );
  }

  removeFilters(): void {
    // this.filteredUserGames = [...this.activities$];
  }

  filtersApplied(): boolean {
    return this.userGames && this.filteredUserGames && this.userGames.length > 0
      ? this.filteredUserGames.length !== this.userGames.length
      : false;
  }
}
