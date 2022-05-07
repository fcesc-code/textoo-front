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
import { UserService } from '../user/services/user.service';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    HighlightTextPipe,
    AddOptionPipe,
    ImproveBreaklinesPipe,
    SanitizePipe,
    GetLanguagePipe,
    PlaySelectTextComponent,
    PlayBestOptionComponent,
    MosaicComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppRoutingModule,
    SharedModule,
    MatIconModule,
  ],
  providers: [ActivitiesService, UserService],
  exports: [],
})
export class ActivityModule {}
