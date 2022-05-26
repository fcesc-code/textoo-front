import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Services */
import { ActivitiesService } from './services/activities.service';
import { UserService } from '../user/services/user.service';
/* Modules */
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
/* Pipes */
import { AddOptionPipe } from './pipes/add-option.pipe';
import { AddPlaceholderPipe } from './pipes/add-option-placeholder.pipe';
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
import { EditFontComponent } from './components/shared/font-editor/edit-font.component';
import { KeywordsEditorComponent } from './components/shared/keywords-editor/keywords-editor.component';
import { EditorComponent } from './components/shared/text-editor/editor.component';
import { EditCommonComponent } from './components/shared/edit-common/edit-common.component';

@NgModule({
  declarations: [
    AddOptionPipe,
    AddPlaceholderPipe,
    PlayBestOptionComponent,
    EditBestOptionComponent,
    EditQuestionBestOptionComponent,
    EditOptionBestOptionComponent,
    EditFontComponent,
    EditorComponent,
    KeywordsEditorComponent,
    EditCommonComponent,
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
    QuillModule.forRoot(),
  ],
  providers: [ActivitiesService, UserService],
  exports: [],
})
export class ActivityModule {}
