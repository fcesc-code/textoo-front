import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayActivityComponent } from './components/play-activity/play-activity.component';
import { ValidateActivityComponent } from './components/validate-activity/validate-activity.component';
import { ActivitiesService } from './services/activities.service';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [PlayActivityComponent, ValidateActivityComponent],
  imports: [CommonModule, AppRoutingModule],
  providers: [ActivitiesService],
})
export class ActivityModule {}
