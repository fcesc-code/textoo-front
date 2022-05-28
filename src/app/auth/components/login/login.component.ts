import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLogin, AuthToken } from '../../models/Auth.dto';
import { AUTH_ACTIONS } from '../../actions/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { HeaderMenusService } from 'src/app/shared/services/header-menus.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent {
  loginUser: AuthLogin;

  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  subscription: any;

  hide: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private authService: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.loginUser = new AuthLogin('', '');

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
    this.hide = true;
    this.loginUser = new AuthLogin(this.email.value, this.password.value);

    this.subscription = this.store
      .select('auth')
      .pipe(debounceTime(333))
      .subscribe({
        next: async ({ auth, loaded, error }): Promise<void> => {
          if (loaded) {
            const { userId, accessToken } = auth;
            this.authService.setUser({
              userId: userId,
              accessToken: accessToken,
            } as AuthToken);
            this.headerMenusService.authorize();
            await this.sharedService.managementToast(
              'loginFeedback',
              loaded,
              undefined
            );
            this.router.navigateByUrl('home');
          }
          if (error) {
            this.headerMenusService.unauthorize();
            this.sharedService.errorLog(error.error);
            await this.sharedService.managementToast(
              'loginFeedback',
              loaded,
              error.error
            );
          }
        },
      });

    if (this.loginForm.valid) {
      this.store.dispatch(AUTH_ACTIONS.login({ auth: this.loginUser }));
    }
  }

  toggleHide(): void {
    this.hide = !this.hide;
  }
}
