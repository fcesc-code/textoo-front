import { Component, Input } from '@angular/core';
import { Player } from '../../interfaces/player.dto';

@Component({
  selector: 'app-users-online',
  templateUrl: './users-online.component.html',
  styleUrls: ['./users-online.component.sass'],
})
export class UsersOnlineComponent {
  @Input() players: Player[] = [];
}
