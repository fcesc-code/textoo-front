import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Services */
import { ActivitiesService } from 'src/app/activity/services/activities.service';
import { UserService } from '../user/services/user.service';
/* Modules */
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
/* Pipes */
import { ImproveBreaklinesPipe } from './pipes/improve-breaklines.pipe';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { HighlightTextPipe } from './pipes/highlight-text.pipe';
/* Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
/* Components */
import { PlaySelectTextComponent } from './components/play-select-text/play-select-text.component';

@NgModule({
  declarations: [
    HighlightTextPipe,
    ImproveBreaklinesPipe,
    SanitizePipe,
    PlaySelectTextComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    SharedModule,
  ],
  providers: [ActivitiesService, UserService],
  exports: [],
})
export class ActivitySelectTextModule {}
