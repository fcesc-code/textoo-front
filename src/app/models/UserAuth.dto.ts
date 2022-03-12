import { User } from './User.dto';

export class UserAuth extends User {
  private token!: string;
  private life!: string;

  constructor() {
    super();
  }

  getUserToken(): string {
    return this.token;
  }
  setUserToken(token: string, life: string) {
    this.token = token;
    this.life = life;
  }
}
