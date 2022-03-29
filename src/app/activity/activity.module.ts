import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaySelectTextComponent } from './components/select-text/play-select-text.component';
import { ActivitiesService } from './services/activities.service';
import { AppRoutingModule } from '../app-routing.module';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
import { AddOptionPipe } from './pipes/add-option.pipe';
import { PlayBestOptionComponent } from './components/best-option/play-best-option.component';
import { ImproveBreaklinesPipe } from './pipes/improve-breaklines.pipe';
import { ValidateActivityComponent } from './components/validate-activity/validate-activity.component';
import { SanitizePipe } from './pipes/sanitize.pipe';

@NgModule({
  declarations: [
    PlaySelectTextComponent,
    PlayBestOptionComponent,
    ValidateActivityComponent,
    HighlightTextPipe,
    AddOptionPipe,
    ImproveBreaklinesPipe,
    SanitizePipe,
  ],
  imports: [CommonModule, AppRoutingModule],
  providers: [ActivitiesService],
  exports: [],
})
export class ActivityModule {}
