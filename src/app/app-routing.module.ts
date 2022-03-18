import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* impoer shared module components */
import { HomeComponent } from './shared/home/home.component';
/* import activity module components */
import { PlayActivityComponent } from './activity/components/play-activity/play-activity.component';
import { ValidateActivityComponent } from './activity/components/validate-activity/validate-activity.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'play/:id',
    component: PlayActivityComponent,
  },
  {
    path: 'validate/:id',
    component: ValidateActivityComponent,
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
