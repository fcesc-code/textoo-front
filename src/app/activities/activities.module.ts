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
import { GetLanguagePipe } from './pipes/get-language-name.pipe';
/* Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
/* Components */
import { MosaicComponent } from './components/mosaic/mosaic.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [GetLanguagePipe, MosaicComponent, DashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    SharedModule,
  ],
  providers: [ActivitiesService, UserService],
  exports: [],
})
export class ActivitiesModule {}
