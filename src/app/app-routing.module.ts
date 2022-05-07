import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* impoer shared module components */
import { LoginComponent } from './auth/components/login/login.component';
import { WelcomeComponent } from './auth/components/welcome/welcome.component';
import { EditorComponent } from './shared/components/editor/editor.component';
/* import user module components */
import { ProfileComponent } from './user/components/profile/profile.component';
import { RegisterComponent } from './user/components/register/register.component';
/* import activity module components */
import { PlaySelectTextComponent } from './activity/components/select-text/play-select-text.component';
import { PlayBestOptionComponent } from './activity/components/best-option/play-best-option.component';
import { DashboardComponent } from './activity/components/dashboard/dashboard.component';
import { MosaicComponent } from './activity/components/mosaic/mosaic.component';

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
    component: EditorComponent,
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
