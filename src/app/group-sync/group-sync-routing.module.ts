import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* import group-sync module components */
import { ConnectComponent } from './components/connect/connect.component';
import { GameComponent } from './components/game/game.component';
import { GameDashboardComponent } from './components/edit-games/game-dashboard.component';
import { UserGamesComponent } from './components/manage-games/user-games.component';

export const routes: Routes = [
  {
    path: 'edit/:id',
    component: GameDashboardComponent,
  },
  {
    path: 'create',
    component: GameDashboardComponent,
  },
  {
    path: 'join',
    component: ConnectComponent,
  },
  {
    path: 'dashboard',
    component: UserGamesComponent,
  },
  {
    path: 'play/:id',
    component: GameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupSyncRoutingModule {}
