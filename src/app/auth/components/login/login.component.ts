import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLogin, AuthToken } from '../../../models/Auth.dto';
import { AUTH_ACTIONS } from '../../actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { HeaderMenusService } from 'src/app/shared/services/header-menus.service';
import { HeaderMenus } from 'src/app/shared/models/header-menus.dto';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  loginUser: AuthLogin;
  authUser: AuthToken;

  email: FormControl;
  password: FormControl;

  loginForm: FormGroup;

  subscription: any;

  hide: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginUser = new AuthLogin('', '');
    this.authUser = new AuthToken('', '');

    this.email = new FormControl(this.loginUser.email, [
      Validators.required,
      Validators.email,
    ]);
    this.password = new FormControl(this.loginUser.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });

    this.hide = true;
  }

  login(): void {
    this.loginUser = new AuthLogin(this.email.value, this.password.value);

    let headerInfo: HeaderMenus;
    this.subscription = this.store
      .select('auth')
      .pipe(debounceTime(333))
      .subscribe({
        next: async ({ auth, loaded, error }): Promise<void> => {
          if (loaded) {
            const { user_id, access_token } = auth;
            this.authUser.user_id = user_id;
            this.authUser.access_token = access_token;
            this.localStorageService.set('user_id', this.authUser.user_id);
            this.localStorageService.set(
              'access_token',
              this.authUser.access_token
            );
            headerInfo = {
              showAuthSection: true,
              showNoAuthSection: false,
            };
            this.headerMenusService.headerManagement.next(headerInfo);
            await this.sharedService.managementToast(
              'loginFeedback',
              loaded,
              undefined
            );
            this.router.navigateByUrl('home');
          }
          if (error) {
            headerInfo = {
              showAuthSection: false,
              showNoAuthSection: true,
            };
            this.headerMenusService.headerManagement.next(headerInfo);
            this.sharedService.errorLog(error.error);
            await this.sharedService.managementToast(
              'loginFeedback',
              loaded,
              error.error
            );
          }
        },
      });

    this.store.dispatch(AUTH_ACTIONS.login({ auth: this.loginUser }));
  }
}
