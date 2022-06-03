import { Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NewUserDto } from '../../models/user.dto';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { USER_ACTIONS } from '../../actions/user.actions';
import { UserRoles } from '../../../shared/interfaces/global.interfaces';
import { SupportedLanguages } from 'src/app/activities-shared/models/Activity.dto';
import { Subscription } from 'rxjs';
import { PasswordConfirmationValidator } from './../../validators/confirm-password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnDestroy {
  registerUser: NewUserDto;
  repeatedPassword: string;

  avatar: FormControl;
  preferences: FormControl;
  alias: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;
  roles: UserRoles[];
  likedActivities: string[];
  activeGroups: string[];

  registerForm: FormGroup;

  subscription!: Subscription;

  count = 0;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.repeatedPassword = '';
    this.registerUser = new NewUserDto({
      avatar: '',
      alias: '',
      email: '',
      password: '',
      preferences: { language: SupportedLanguages.CA },
      activeGroups: [],
      roles: [UserRoles.learner.valueOf()],
      likedActivities: [],
    });

    this.roles = [UserRoles.learner];
    this.likedActivities = [];
    this.activeGroups = [];
    this.alias = new FormControl(this.registerUser.alias, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);
    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.email,
    ]);
    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(24),
    ]);
    this.passwordConfirmation = new FormControl(this.repeatedPassword, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(24),
    ]);
    this.preferences = new FormControl(this.registerUser.preferences, [
      Validators.required,
    ]);
    this.avatar = new FormControl(this.registerUser.avatar, [
      Validators.required,
      Validators.minLength(5),
    ]);

    this.registerForm = this.formBuilder.group(
      {
        alias: this.alias,
        email: this.email,
        password: this.password,
        passwordConfirmation: this.passwordConfirmation,
        preferences: this.preferences,
        avatar: this.avatar,
      },
      {
        validator: PasswordConfirmationValidator(
          'password',
          'passwordConfirmation'
        ),
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  async register(): Promise<void> {
    this.registerUser = new NewUserDto({
      ...this.registerForm.value,
      likedActivities: this.likedActivities,
      activeGroups: this.activeGroups,
      roles: this.roles,
    });

    this.subscription = this.store.select('user').subscribe({
      next: async ({ loaded, error }): Promise<void> => {
        if (loaded) {
          console.log(`Success received (count:${this.count})>>> `, loaded);
          await this.sharedService.managementToast(
            'registerFeedback',
            loaded,
            undefined
          );
          if (this.registerForm.dirty) {
            this.router.navigateByUrl('welcome');
            this.registerForm.reset();
          }
        }
        if (error) {
          this.sharedService.errorLog(error.error);
          await this.sharedService.managementToast(
            'registerFeedback',
            loaded,
            error.error
          );
        }
      },
    });

    if (this.registerForm.valid) {
      this.store.dispatch(
        USER_ACTIONS.create({
          user: this.registerUser,
        })
      );
    }
  }
}
