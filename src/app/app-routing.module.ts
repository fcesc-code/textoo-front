import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* import shared module components */
import { LoginComponent } from './auth/components/login/login.component';
import { WelcomeComponent } from './auth/components/welcome/welcome.component';
/* import user module components */
import { ProfileComponent } from './user/components/profile/profile.component';
import { RegisterComponent } from './user/components/register/register.component';
/* import activities-shared module components */
import { EditorComponent } from './activity/components/text-editor/editor.component';
/* import activity-best-option module components */
import { PlayBestOptionComponent } from './activity-best-option/components/best-option/play-best-option.component';
import { EditBestOptionComponent } from './activity-best-option/components/best-option/edit-best-option.component';
/* import activity-select-text module components */
import { PlaySelectTextComponent } from './activity-select-text/components/play-select-text/play-select-text.component';
/* import activities-global module components */
import { DashboardComponent } from './activities/components/dashboard/dashboard.component';
import { MosaicComponent } from './activities/components/mosaic/mosaic.component';
/* import group-sync module components */
import { ConnectComponent } from './group-sync/components/connect/connect.component';
import { GameComponent } from './group-sync/components/game/game.component';
import { GameDashboardComponent } from './group-sync/components/edit-games/game-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: MosaicComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'user/profile',
    component: ProfileComponent,
  },
  {
    path: 'activities/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'play/select_text/:id',
    component: PlaySelectTextComponent,
  },
  {
    path: 'play/best_option/:id',
    component: PlayBestOptionComponent,
  },
  {
    path: 'edit/select_text/:id',
    component: EditorComponent,
  },
  {
    path: 'edit/best_option/:id',
    component: EditBestOptionComponent,
  },
  {
    path: 'join',
    component: ConnectComponent,
  },
  {
    path: 'game/:id',
    component: GameComponent,
  },
  {
    path: 'randomstuff',
    component: GameDashboardComponent,
  },
  {
    path: 'groups',
    component: GameDashboardComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
