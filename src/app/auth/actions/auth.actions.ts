import { createAction, props } from '@ngrx/store';
import { AuthLogin, AuthToken } from '../../models/Auth.dto';

const PREFIX = '[AUTH]';

function prefix(str: string): string {
  return `${PREFIX} ${str.toLowerCase()}`;
}

const AUTH_ACTIONS_TITLES = {
  login: prefix('login'),
  loginSuccess: prefix('login: success'),
  loginError: prefix('login: error'),
  logout: prefix('logout'),
  getLocalStorageToken: prefix('get local storage token'),
  getLocalStorageTokenSuccess: prefix('get local storage token: success'),
};

export const AUTH_ACTIONS = {
  login: createAction(AUTH_ACTIONS_TITLES.login, props<{ auth: AuthLogin }>()),
  loginSuccess: createAction(
    AUTH_ACTIONS_TITLES.loginSuccess,
    props<{ auth: AuthToken }>()
  ),
  loginError: createAction(
    AUTH_ACTIONS_TITLES.loginError,
    props<{ payload: any }>()
  ),
  logout: createAction(AUTH_ACTIONS_TITLES.logout),
  getLocalStorageToken: createAction(AUTH_ACTIONS_TITLES.getLocalStorageToken),
  getLocalStorageTokenSuccess: createAction(
    AUTH_ACTIONS_TITLES.getLocalStorageTokenSuccess,
    props<{ auth: AuthToken }>()
  ),
};
