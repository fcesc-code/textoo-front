import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Services */
import { ActivitiesService } from './services/activities.service';
import { UserService } from '../user/services/user.service';
/* Modules */
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
/* Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
/* Quill */
import { QuillModule } from 'ngx-quill';
/* Components */
import { EditFontComponent } from './components/font-editor/edit-font.component';
import { KeywordsEditorComponent } from './components/keywords-editor/keywords-editor.component';
import { EditorComponent } from './components/text-editor/editor.component';
import { EditCommonComponent } from './components/edit-common/edit-common.component';

@NgModule({
  declarations: [
    EditFontComponent,
    EditorComponent,
    KeywordsEditorComponent,
    EditCommonComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    SharedModule,
    QuillModule.forRoot(),
  ],
  providers: [ActivitiesService, UserService],
  exports: [
    EditFontComponent,
    EditorComponent,
    KeywordsEditorComponent,
    EditCommonComponent,
  ],
})
export class ActivitiesSharedModule {}
