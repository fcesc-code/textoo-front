import { AfterContentInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { USER_ACTIONS } from '../../actions/user.actions';
import { UserDto } from 'src/app/user/models/user.dto';
import {
  SupportedLanguages,
  UserRoles,
} from 'src/app/shared/interfaces/global.interfaces';
import { LANGUAGES, USER_ROLES } from 'src/app/shared/constants/globals';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit, AfterContentInit {
  supportedLanguages: any[] = LANGUAGES;
  supportedRoles: any[] = USER_ROLES.ca;
  profileUser: UserDto;

  avatar: FormControl;
  language: FormControl;
  alias: FormControl;
  email: FormControl;
  roles: FormControl;
  likedActivities: string[];
  activeGroups: string[];

  profileForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.profileUser = new UserDto({
      _id: '',
      avatar: '',
      alias: '',
      email: '',
      password: '',
      preferences: { language: SupportedLanguages.CA },
      activeGroups: [],
      roles: [UserRoles.learner],
      likedActivities: [],
    });

    this.isValidForm = null;

    this.roles = new FormControl(this.profileUser.roles, [Validators.required]);
    this.likedActivities = [];
    this.activeGroups = [];
    this.alias = new FormControl(this.profileUser.alias, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(25),
    ]);
    this.email = new FormControl(this.profileUser.email, [
      Validators.required,
      Validators.email,
    ]);
    this.language = new FormControl(this.profileUser.preferences.language, [
      Validators.required,
    ]);
    this.avatar = new FormControl(this.profileUser.avatar, [
      Validators.required,
      Validators.minLength(5),
    ]);

    this.profileForm = this.formBuilder.group({
      alias: this.alias,
      email: this.email,
      language: this.language,
      avatar: this.avatar,
      roles: this.roles,
    });
  }
  ngOnInit(): void {
    const { userId } = this.authService.getUser();

    if (userId) {
      this.store.select('user').subscribe({
        next: ({ loaded, error, user }): void => {
          if (loaded) {
            const {
              avatar,
              alias,
              preferences,
              email,
              activeGroups,
              likedActivities,
              roles,
            } = user;
            this.avatar.setValue(avatar);
            this.alias.setValue(alias);
            this.email.setValue(email);
            this.language.setValue(preferences?.language);
            this.roles.setValue(roles);
            this.likedActivities = likedActivities as string[];
            this.activeGroups = activeGroups as string[];
          }
          if (error) {
            this.sharedService.errorLog(error.error);
          }
        },
        error: (error): void => {
          this.sharedService.errorLog(error);
        },
      });

      this.store.dispatch(USER_ACTIONS.getById({ userId: userId }));
    }
  }

  ngAfterContentInit(): void {
    const { userId } = this.authService.getUser();
    if (userId) {
      this.store.dispatch(USER_ACTIONS.getById({ userId: userId }));
    }
  }

  updateUser(): void {
    if (this.profileForm.invalid) {
      return;
    }

    const { userId } = this.authService.getUser();

    if (userId) {
      this.store.select('user').subscribe({
        next: async ({ error, loaded }): Promise<void> => {
          if (loaded) {
            await this.sharedService.managementToast('postFeedback', loaded);
          }
          if (error) {
            this.sharedService.errorLog(error.error);
            await this.sharedService.managementToast(
              'postFeedback',
              loaded,
              error.error
            );
          }
        },
      });

      if (this.profileForm.valid) {
        const updatedUser: UserDto = new UserDto({
          ...this.profileUser,
          preferences: { language: this.language.value as SupportedLanguages },
        });
        this.store.dispatch(
          USER_ACTIONS.update({ userId: userId, user: updatedUser })
        );
      }
    }
  }

  compareLanguages(lang1: string, lang2: string): boolean {
    return lang1 === lang2;
  }
}
