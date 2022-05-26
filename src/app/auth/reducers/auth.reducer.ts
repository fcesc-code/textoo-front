import { createReducer, on } from '@ngrx/store';
import { AUTH_ACTIONS } from '../actions/auth.actions';
import { AuthToken } from '../models/Auth.dto';

export interface AuthState {
  auth: AuthToken;
  loading: boolean;
  loaded: boolean;
  error: any;
}

const authInitialState: AuthState = {
  auth: new AuthToken('', ''),
  loading: false,
  loaded: false,
  error: null,
};

const _authReducer = createReducer(
  authInitialState,
  on(AUTH_ACTIONS.login, (state, action) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AUTH_ACTIONS.loginSuccess, (state, { auth }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
    auth: auth,
  })),
  on(AUTH_ACTIONS.loginError, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  })),
  on(AUTH_ACTIONS.logout, (state, action) => ({
    ...state,
    loading: false,
    loaded: false,
    error: null,
    auth: new AuthToken('', ''),
  })),
  on(AUTH_ACTIONS.getLocalStorageToken, (state) => ({
    ...state,
    error: null,
  })),
  on(AUTH_ACTIONS.getLocalStorageTokenSuccess, (state, { auth }) => {
    if (
      auth.userId === state.auth.userId &&
      auth.accessToken === state.auth.accessToken
    ) {
      return { ...state };
    } else {
      return {
        ...state,
        loading: false,
        loaded: true,
        error: null,
        auth: auth,
      };
    }
  })
);

export function authReducer(state: any, action: any) {
  return _authReducer(state, action);
}
