import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* import group-sync module components */
import { PlaySelectTextComponent } from './components/play-select-text/play-select-text.component';

export const routes: Routes = [
  {
    path: 'edit/:id',
    component: PlaySelectTextComponent,
  },
  {
    path: 'play/:id',
    component: PlaySelectTextComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivitySelectTextRoutingModule {}
