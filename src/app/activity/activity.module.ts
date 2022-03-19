import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaySelectTextComponent } from './components/play-select-text/play-select-text.component';
import { ValidateActivityComponent } from './components/validate-activity/validate-activity.component';
import { ActivitiesService } from './services/activities.service';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [PlaySelectTextComponent, ValidateActivityComponent],
  imports: [CommonModule, AppRoutingModule],
  providers: [ActivitiesService],
})
export class ActivityModule {}
