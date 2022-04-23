import { ActionReducerMap } from '@ngrx/store';
import * as userReducers from './user/reducers/user.reducer';
import * as authReducers from './auth/reducers/auth.reducer';

export interface AppState {
  user: userReducers.UserState;
  auth: authReducers.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  user: userReducers.userReducer,
  auth: authReducers.authReducer,
};
