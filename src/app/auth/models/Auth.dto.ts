export class AuthToken {
  user_id: string;
  access_token: string;

  constructor(user_id: string, access_token: string) {
    this.user_id = user_id;
    this.access_token = access_token;
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
