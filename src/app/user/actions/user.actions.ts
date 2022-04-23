import { createAction, props } from '@ngrx/store';
import { NewUserDto, UserDto } from '../models/user.dto';

const PREFIX = '[USER]';

function prefix(str: string): string {
  return `${PREFIX} ${str.toLowerCase()}`;
}

const USER_ACTIONS_TITLES = {
  create: prefix('create user'),
  createSuccess: prefix('create user: success'),
  createError: prefix('create user: error'),
  update: prefix('update user'),
  updateSuccess: prefix('update user: success'),
  updateError: prefix('update user: error'),
  getById: prefix('get user by Id'),
  getByIdSuccess: prefix('get user by Id: success'),
  getByIdError: prefix('get user by Id: error'),
};

export const USER_ACTIONS = {
  create: createAction(
    USER_ACTIONS_TITLES.create,
    props<{ user: NewUserDto }>()
  ),
  createSuccess: createAction(
    USER_ACTIONS_TITLES.createSuccess,
    props<{ user: NewUserDto }>()
  ),
  createError: createAction(
    USER_ACTIONS_TITLES.createError,
    props<{ payload: any }>()
  ),
  update: createAction(
    USER_ACTIONS_TITLES.update,
    props<{ userId: string; user: UserDto }>()
  ),
  updateSuccess: createAction(
    USER_ACTIONS_TITLES.updateSuccess,
    props<{ user: UserDto }>()
  ),
  updateError: createAction(
    USER_ACTIONS_TITLES.updateError,
    props<{ payload: any }>()
  ),
  getById: createAction(
    USER_ACTIONS_TITLES.getById,
    props<{ userId: string }>()
  ),
  getByIdSuccess: createAction(
    USER_ACTIONS_TITLES.getByIdSuccess,
    props<{ user: UserDto }>()
  ),
  getByIdError: createAction(
    USER_ACTIONS_TITLES.getByIdError,
    props<{ payload: any }>()
  ),
};
