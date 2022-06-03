import { AuthToken, AuthLogin } from './Auth.dto';

describe('auth > models > auth.dto', () => {
  const TITLE = 'test';
  let authToken: AuthToken;
  let authLogin: AuthLogin;

  beforeEach(() => {
    authToken = new AuthToken('userId', 'accessToken');
    authLogin = new AuthLogin('email@mail.com', 'password');
  });

  it(`${TITLE} 1 > an instance of AuthToken should be created`, () => {
    expect(authToken).toBeTruthy();
  });

  it(`${TITLE} 2 > an instance of AuthLogin should be created`, () => {
    expect(authLogin).toBeTruthy();
  });
});
