export class AuthToken {
  userId: string;
  accessToken: string;

  constructor(userId: string, accessToken: string) {
    this.userId = userId;
    this.accessToken = accessToken;
  }
}

export class AuthLogin {
  email: string;
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
