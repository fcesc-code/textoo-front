import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* impoer shared module components */
import { HomeComponent } from './shared/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
/* import user module components */
import { ProfileComponent } from './user/components/profile/profile.component';
import { RegisterComponent } from './user/components/register/register.component';
/* import activity module components */
import { PlaySelectTextComponent } from './activity/components/select-text/play-select-text.component';
import { PlayBestOptionComponent } from './activity/components/best-option/play-best-option.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
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
    path: 'play/select-text/:id',
    component: PlaySelectTextComponent,
  },
  {
    path: 'play/best-option/:id',
    component: PlayBestOptionComponent,
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
