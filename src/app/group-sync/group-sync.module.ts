import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Services */
// import { UserService } from '../user/services/user.service';
/* Modules */
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivitiesGlobalModule } from '../activities/activities-global.module';
/* Material */
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
/* Components */
import { ConnectComponent } from './components/connect/connect.component';
import { GameComponent } from './components/game/game.component';
import { GameDashboardComponent } from './components/edit-games/game-dashboard.component';
import { ActivitiesPickerComponent } from './components/edit-games/activities-picker.component';
import { UserGamesComponent } from './components/manage-games/user-games.component';
/* Firebase */
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    ConnectComponent,
    GameComponent,
    UserGamesComponent,
    GameDashboardComponent,
    ActivitiesPickerComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    provideFirestore(() => getFirestore()),
    SharedModule,
    ActivitiesGlobalModule,
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
