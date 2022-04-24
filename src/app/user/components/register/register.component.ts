import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NewUserDto } from '../../models/user.dto';
import { HeaderMenusService } from 'src/app/shared/services/header-menus.service';
import { HeaderMenus } from 'src/app/shared/models/header-menus.dto';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { USER_ACTIONS } from '../../actions/user.actions';
import { UserRoles } from '../../../shared/interfaces/global.interfaces';
import { SupportedLanguages } from 'src/app/activity/models/Activity.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent {
  registerUser: NewUserDto;

  avatar: FormControl;
  preferences: FormControl;
  alias: FormControl;
  email: FormControl;
  password: FormControl;
  roles: UserRoles[];
  likedActivities: string[];
  activeGroups: string[];

  registerForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private headerMenusService: HeaderMenusService,
    private router: Router,
    private store: Store<AppState>
  ) {
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

    this.isValidForm = null;

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
    this.preferences = new FormControl(this.registerUser.preferences, [
      Validators.required,
    ]);
    this.avatar = new FormControl(this.registerUser.avatar);

    this.registerForm = this.formBuilder.group({
      alias: this.alias,
      email: this.email,
      password: this.password,
      preferences: this.preferences,
      avatar: this.avatar,
    });
  }

  async register(): Promise<void> {
    this.registerUser = new NewUserDto({
      ...this.registerForm.value,
      likedActivities: this.likedActivities,
      activeGroups: this.activeGroups,
      roles: this.roles,
    });

    console.log('Registering user (before store): ', this.registerUser);

    this.store
      .select('user')
      .pipe()
      .subscribe({
        next: async ({ loaded, error }): Promise<void> => {
          if (loaded) {
            await this.sharedService.managementToast(
              'registerFeedback',
              loaded,
              undefined
            );
            const headerInfo: HeaderMenus = {
              showAuthSection: false,
              showNoAuthSection: true,
            };

            this.headerMenusService.headerManagement.next(headerInfo);
            this.registerForm.reset();
            this.router.navigateByUrl('home');
          }
          if (error) {
            const headerInfo: HeaderMenus = {
              showAuthSection: false,
              showNoAuthSection: true,
            };
            this.headerMenusService.headerManagement.next(headerInfo);

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
