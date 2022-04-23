import { createReducer, on } from '@ngrx/store';
import { USER_ACTIONS } from '../actions/user.actions';
import { NewUserDto, UserDto } from '../models/user.dto';

export interface UserState {
  user: Partial<UserDto>;
  loading: boolean;
  loaded: boolean;
  error: any;
}

const userInitialState: UserState = {
  user: {},
  loading: false,
  loaded: false,
  error: null,
};

const _userReducer = createReducer(
  userInitialState,
  on(USER_ACTIONS.create, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null,
    };
  }),
  on(USER_ACTIONS.createSuccess, (state, { user }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: null,
    user: new NewUserDto({ ...user }),
  })),
  on(USER_ACTIONS.createError, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: payload,
    };
  }),
  on(USER_ACTIONS.update, (state, action) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null,
    };
  }),
  on(USER_ACTIONS.updateSuccess, (state, { user }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: null,
      user: {
        ...user,
      },
    };
  }),
  on(USER_ACTIONS.updateError, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: payload,
    };
  }),
  on(USER_ACTIONS.getById, (state) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      error: null,
    };
  }),
  on(USER_ACTIONS.getByIdSuccess, (state, { user }) => {
    return {
      ...state,
      loading: false,
      loaded: true,
      error: null,
      user: user,
    };
  }),
  on(USER_ACTIONS.getByIdError, (state, { payload }) => {
    return {
      ...state,
      loading: false,
      loaded: false,
      error: payload,
    };
  })
);

export function userReducer(state: any, action: any) {
  return _userReducer(state, action);
}
