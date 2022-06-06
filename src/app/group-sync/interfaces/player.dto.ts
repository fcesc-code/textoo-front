export interface Player {
  teamId: string;
  teamAlias: string;
  teamAvatar: string;
  teamColor: string;
  userId: string;
  userAlias: string;
  userAvatar: string;
  online: boolean;
}

export interface PublicUser {
  userId: string;
  userAlias: string;
  userAvatar: string;
}
