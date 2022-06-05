import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
/* Services */
import { UserService } from '../user/services/user.service';
/* Modules */
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivitiesGlobalModule } from '../activities-global/activities-global.module';
import { ActivitySelectTextModule } from '../activity-select-text/activity-select-text.module';
import { ActivityBestOptionModule } from '../activity-best-option/activity-best-option.module';
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
import { CountdownComponent } from './components/timer/countdown.component';
import { InvitePlayerComponent } from './components/invite-player/invite-player.component';
import { UsersOnlineComponent } from './components/users-online/users-online.component';
/* Routes */
import { GroupSyncRoutingModule } from './group-sync-routing.module';
/* Pipes */
import { FriendlyTimePipe } from './pipes/friendlyTime.pipe';
import { BooleanLocalePipe } from './pipes/booleanLocale.pipe';
import { AddLeadingZeroPipe } from './pipes/addLeadingZero';

@NgModule({
  declarations: [
    FriendlyTimePipe,
    BooleanLocalePipe,
    AddLeadingZeroPipe,
    ConnectComponent,
    GameComponent,
    UserGamesComponent,
    GameDashboardComponent,
    ActivitiesPickerComponent,
    CountdownComponent,
    InvitePlayerComponent,
    UsersOnlineComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    GroupSyncRoutingModule,
    SharedModule,
    ActivitiesGlobalModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ActivitySelectTextModule,
    ActivityBestOptionModule,
  ],
  providers: [UserService],
  exports: [],
})
export class GroupSyncModule {}
