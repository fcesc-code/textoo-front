import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaySelectTextComponent } from './components/select-text/play-select-text.component';
import { ActivitiesService } from './services/activities.service';
import { AppRoutingModule } from '../app-routing.module';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
import { AddOptionPipe } from './pipes/add-option.pipe';
import { PlayBestOptionComponent } from './components/best-option/play-best-option.component';
import { ImproveBreaklinesPipe } from './pipes/improve-breaklines.pipe';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MosaicComponent } from './components/mosaic/mosaic.component';
import { GetLanguagePipe } from './pipes/get-language-name.pipe';

@NgModule({
  declarations: [
    PlaySelectTextComponent,
    PlayBestOptionComponent,
    HighlightTextPipe,
    AddOptionPipe,
    ImproveBreaklinesPipe,
    SanitizePipe,
    GetLanguagePipe,
    MosaicComponent,
    DashboardComponent,
  ],
  imports: [CommonModule, AppRoutingModule, SharedModule],
  providers: [ActivitiesService],
  exports: [],
})
export class ActivityModule {}
