import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaySelectTextComponent } from './components/play-select-text/play-select-text.component';
import { ValidateActivityComponent } from './components/validate-activity/validate-activity.component';
import { ActivitiesService } from './services/activities.service';
import { AppRoutingModule } from '../app-routing.module';
import { HighlightTextPipe } from '../shared/pipes/highlight-text.pipe';
import { PlayBestOptionComponent } from './components/play-best-option/play-best-option.component';

@NgModule({
  declarations: [
    PlaySelectTextComponent,
    ValidateActivityComponent,
    HighlightTextPipe,
    PlayBestOptionComponent,
  ],
  imports: [CommonModule, AppRoutingModule],
  providers: [ActivitiesService],
  exports: [],
})
export class ActivityModule {}
