import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AUTH_ACTIONS } from '../actions/auth.actions';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { exhaustMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthToken } from '../models/Auth.dto';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AUTH_ACTIONS.login),
      exhaustMap((action) =>
        this.authService.login(action.auth).pipe(
          map((auth: AuthToken) =>
            AUTH_ACTIONS.loginSuccess({
              auth: auth,
            })
          ),
          catchError((error) =>
            of(
              AUTH_ACTIONS.loginError({
                payload: error,
              })
            )
          )
        )
      )
    )
  );

  getLocalStorageToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AUTH_ACTIONS.getLocalStorageToken),
      exhaustMap((action) =>
        this.authService.getLocalStorageToken().pipe(
          map((auth: AuthToken) =>
            AUTH_ACTIONS.loginSuccess({
              auth: auth,
            })
          ),
          catchError((error) =>
            of(
              AUTH_ACTIONS.loginError({
                payload: error,
              })
            )
          )
        )
      )
    )
  );
}
