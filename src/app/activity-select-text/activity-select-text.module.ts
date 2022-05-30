import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Services */
import { ActivitiesSharedService } from 'src/app/activities-shared/services/activities-shared.service';
import { UserService } from '../user/services/user.service';
/* Modules */
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivitiesSharedModule } from '../activities-shared/activities-shared.module';
import { ActivitySelectTextRoutingModule } from './activity-select-text-routing.module';
/* Pipes */
import { ImproveBreaklinesPipe } from './pipes/improve-breaklines.pipe';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
/* Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
/* Components */
import { PlaySelectTextComponent } from './components/play-select-text/play-select-text.component';
import { SanitizePipe } from './pipes/sanitize.pipe';

@NgModule({
  declarations: [
    HighlightTextPipe,
    ImproveBreaklinesPipe,
    PlaySelectTextComponent,
    SanitizePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ActivitySelectTextRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    SharedModule,
    ActivitiesSharedModule,
  ],
  providers: [ActivitiesSharedService, UserService],
  exports: [
    PlaySelectTextComponent,
    HighlightTextPipe,
    SanitizePipe,
    ImproveBreaklinesPipe,
  ],
})
export class ActivitySelectTextModule {}
