import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Subscription } from 'rxjs';
import { UserService } from 'src/app/user/services/user.service';
import { PublicUser } from '../../interfaces/player.dto';
import { UserDto } from 'src/app/user/models/user.dto';

@Component({
  selector: 'app-invite-player',
  templateUrl: './invite-player.component.html',
  styleUrls: ['./invite-player.component.sass'],
})
export class InvitePlayerComponent implements OnInit {
  uninvitedUsers: PublicUser[];
  users: PublicUser[];
  usersSubscription$!: Subscription;

  constructor(private userService: UserService) {
    this.users = [];
    this.uninvitedUsers = [];
  }
  @Input() players: PublicUser[] = [];
  @Output() invitePlayersResponse: EventEmitter<PublicUser[]> =
    new EventEmitter();

  ngOnInit(): void {
    this.loadUsers();
  }

  emit(): void {
    this.invitePlayersResponse.emit(this.players);
  }

  loadUsers() {
    this.usersSubscription$ = this.userService
      .getAllUsers()
      .pipe(
        map((users: UserDto[]): PublicUser[] => {
          return users.map((user: UserDto) => {
            return {
              userId: user._id,
              userAlias: user.alias,
              userAvatar: user.avatar,
            } as PublicUser;
          });
        })
      )
      .subscribe((users: PublicUser[]) => {
        this.users = users;
        this.loadUninvited();
      });
  }

  loadUninvited() {
    if (this.players.length === 0) {
      this.uninvitedUsers = this.users;
    } else {
      this.uninvitedUsers = this.users.filter(
        (user: PublicUser) =>
          !this.players.find(
            (player: PublicUser) => player.userId === user.userId
          )
      );
    }
  }

  inviteUser(user: PublicUser) {
    this.uninvitedUsers = this.uninvitedUsers.filter(
      (player: PublicUser) => player.userId !== user.userId
    );
    this.players.push(user);
    this.emit();
  }

  uninviteUser(user: PublicUser) {
    this.players = this.players.filter(
      (player: PublicUser) => player.userId !== user.userId
    );
    this.uninvitedUsers.push(user);
    this.emit();
  }

  inviteAll() {
    this.players = this.users;
    this.uninvitedUsers = [];
    this.emit();
  }

  reset() {
    this.players = [];
    this.uninvitedUsers = this.users;
    this.emit();
  }
}
