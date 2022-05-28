import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Services */
// import { UserService } from '../user/services/user.service';
/* Modules */
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
/* Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
/* Components */
import { ConnectComponent } from './components/connect/connect.component';
import { GameComponent } from './components/game/game.component';
import { GameDashboardComponent } from './components/game-dashboard/game-dashboard.component';
/* Firebase */
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [ConnectComponent, GameComponent, GameDashboardComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    provideFirestore(() => getFirestore()),
    SharedModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [],
  exports: [],
})
export class GroupSyncModule {}
