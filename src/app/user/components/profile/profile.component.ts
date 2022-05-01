import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { USER_ACTIONS } from '../../actions/user.actions';
import { NewUserDto, UserDto } from 'src/app/user/models/user.dto';
import {
  SupportedLanguages,
  UserRoles,
} from 'src/app/shared/interfaces/global.interfaces';
import { LANGUAGES } from 'src/app/shared/constants/globals';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  supportedLanguages: any[] = LANGUAGES;
  profileUser: UserDto;

  avatar: FormControl;
  language: FormControl;
  alias: FormControl;
  email: FormControl;
  // password: FormControl;
  roles: UserRoles[];
  _id: string;
  likedActivities: string[];
  activeGroups: string[];

  profileForm: FormGroup;
  isValidForm: boolean | null;

  constructor(
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private localStorageService: LocalStorageService,
    private router: Router,
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

    this._id = '';
    this.roles = [UserRoles.learner];
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
    // this.password = new FormControl(this.profileUser.password, [
    //   Validators.required,
    //   Validators.minLength(8),
    //   Validators.maxLength(24),
    // ]);
    this.language = new FormControl(this.profileUser.preferences.language, [
      Validators.required,
    ]);
    this.avatar = new FormControl(this.profileUser.avatar);

    this.profileForm = this.formBuilder.group({
      alias: this.alias,
      email: this.email,
      // password: this.password,
      language: this.language,
      avatar: this.avatar,
      roles: this.roles,
    });
  }
  ngOnInit(): void {
    const userId = this.localStorageService.get('user_id');

    if (userId) {
      this.store
        .select('user')
        .pipe()
        .subscribe({
          next: ({ loaded, error, user }): void => {
            if (loaded) {
              const {
                _id,
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
              // this.password.setValue('');
              this._id = _id as string;
              this.roles = roles as UserRoles[];
              this.likedActivities = likedActivities as string[];
              this.activeGroups = activeGroups as string[];

              this.profileForm = this.formBuilder.group({
                avatar: this.avatar,
                alias: this.alias,
                language: this.language,
                email: this.email,
                // password: this.password,
              });
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

  updateUser(): void {
    if (this.profileForm.invalid) {
      return;
    }

    this.profileUser = this.profileForm.value;

    const userId = this.localStorageService.get('user_id');

    if (userId) {
      this.store
        .select('user')
        .pipe()
        .subscribe({
          next: async ({ error, loaded }): Promise<void> => {
            if (loaded) {
              await this.sharedService.managementToast(
                'postFeedback',
                loaded,
                undefined
              );
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
        this.store.dispatch(
          USER_ACTIONS.update({ userId: userId, user: this.profileUser })
        );
      }
    }
  }

  compareLanguages(lang1: string, lang2: string): boolean {
    return lang1 === lang2;
  }
}
