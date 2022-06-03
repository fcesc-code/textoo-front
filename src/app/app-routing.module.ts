import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* import shared module components */
import { LoginComponent } from 'src/app/auth/components/login/login.component';
import { WelcomeComponent } from 'src/app/auth/components/welcome/welcome.component';
import { PageNotFoundComponent } from 'src/app/shared/components/PageNotFound/page-not-found.component';
/* import activities-global module components */
import { DashboardComponent } from 'src/app/activities-global/components/dashboard/dashboard.component';
import { MosaicComponent } from 'src/app/activities-global/components/mosaic/mosaic.component';

export const routes: Routes = [
  {
    path: 'home',
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
    path: 'activities/dashboard',
    component: DashboardComponent,
  },
  {
    path: 'activities/mosaic',
    component: MosaicComponent,
  },
  {
    path: 'games',
    loadChildren: () =>
      import('src/app/group-sync/group-sync.module').then(
        (m) => m.GroupSyncModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('src/app/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'activity/select-text',
    loadChildren: () =>
      import('src/app/activity-select-text/activity-select-text.module').then(
        (m) => m.ActivitySelectTextModule
      ),
  },
  {
    path: 'activity/best-option',
    loadChildren: () =>
      import('src/app/activity-best-option/activity-best-option.module').then(
        (m) => m.ActivityBestOptionModule
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
