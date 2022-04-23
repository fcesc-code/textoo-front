import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* impoer shared module components */
import { HomeComponent } from './shared/home/home.component';
/* import activity module components */
import { PlaySelectTextComponent } from './activity/components/select-text/play-select-text.component';
import { PlayBestOptionComponent } from './activity/components/best-option/play-best-option.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
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
