import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Services */
import { ActivitiesService } from 'src/app/activity/services/activities.service';
import { UserService } from '../user/services/user.service';
/* Modules */
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivityBestOptionRoutingModule } from './activity-best-option-routing.module';
/* Pipes */
import { AddOptionPipe } from './pipes/add-option.pipe';
import { AddPlaceholderPipe } from './pipes/add-option-placeholder.pipe';
import { SanitizePipe } from './pipes/sanitize.pipe';
/* Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
/* Quill */
import { QuillModule } from 'ngx-quill';
/* Components */
import { PlayBestOptionComponent } from './components/best-option/play-best-option.component';
import { EditBestOptionComponent } from './components/best-option/edit-best-option.component';
import { EditQuestionBestOptionComponent } from './components/best-option/edit-question-best-option.component';
import { EditOptionBestOptionComponent } from './components/best-option/edit-option-best-option.component';
import { ActivitiesSharedModule } from '../activity/activities-shared.module';

@NgModule({
  declarations: [
    AddOptionPipe,
    AddPlaceholderPipe,
    SanitizePipe,
    PlayBestOptionComponent,
    EditBestOptionComponent,
    EditQuestionBestOptionComponent,
    EditOptionBestOptionComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    ActivityBestOptionRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    SharedModule,
    ActivitiesSharedModule,
    QuillModule.forRoot(),
  ],
  providers: [ActivitiesService, UserService],
  exports: [PlayBestOptionComponent, AddOptionPipe, SanitizePipe],
})
export class ActivityBestOptionModule {}
