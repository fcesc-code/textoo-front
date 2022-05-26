import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Services */
import { UserService } from '../user/services/user.service';
/* Modules */
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
/* Pipes */

/* Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
/* Quill */
import { QuillModule } from 'ngx-quill';
/* Components */
import { ConnectComponent } from './components/connect/connect.component';
import { GameComponent } from './components/game/game.component';

@NgModule({
  declarations: [ConnectComponent, GameComponent],
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
  providers: [UserService],
  exports: [],
})
export class GroupSyncModule {}
