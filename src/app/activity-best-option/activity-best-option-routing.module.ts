import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/* import group-sync module components */
import { PlayBestOptionComponent } from './components/best-option/play-best-option.component';
import { EditBestOptionComponent } from './components/best-option/edit-best-option.component';

export const routes: Routes = [
  {
    path: 'edit/:id',
    component: EditBestOptionComponent,
  },
  {
    path: 'play/:id',
    component: PlayBestOptionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivityBestOptionRoutingModule {}
