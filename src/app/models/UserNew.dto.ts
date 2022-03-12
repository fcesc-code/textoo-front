import { User } from './User.dto';

export class UserNew extends User {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    super();
    this.email = email;
    this.password = password;
  }
}
