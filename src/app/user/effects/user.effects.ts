import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { USER_ACTIONS } from '../actions/user.actions';
import { UserService } from '../services/user.service';
import { concatMap, exhaustMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NewUserDto, UserDto } from '../models/user.dto';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USER_ACTIONS.getById),
      exhaustMap((action) =>
        this.userService.getUSerById(action.userId).pipe(
          map((user: UserDto) =>
            USER_ACTIONS.getByIdSuccess({
              user: user,
            })
          ),
          catchError((error) =>
            of(
              USER_ACTIONS.getByIdError({
                payload: error,
              })
            )
          )
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USER_ACTIONS.update),
      concatMap((action) =>
        this.userService.updateUser(action.userId, action.user).pipe(
          map((user: UserDto) =>
            USER_ACTIONS.updateSuccess({
              user: user,
            })
          ),
          catchError((error) =>
            of(
              USER_ACTIONS.updateError({
                payload: error,
              })
            )
          )
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(USER_ACTIONS.create),
      concatMap((action) => {
        console.log('user effect was called with user: ', action.user);
        return this.userService.register(action.user).pipe(
          map((user: NewUserDto) =>
            USER_ACTIONS.createSuccess({
              user: user,
            })
          ),
          catchError((error) =>
            of(
              USER_ACTIONS.createError({
                payload: error,
              })
            )
          )
        );
      })
    )
  );
}
