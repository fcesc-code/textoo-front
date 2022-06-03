import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthToken } from 'src/app/auth/models/Auth.dto';
import { ProfileComponent } from './profile.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MOCK_USERS } from 'mockdata/user.mock';
import { AppState } from 'src/app/app.reducer';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { USER_ACTIONS } from '../../actions/user.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UserDto } from '../../models/user.dto';

describe('user > components > profile > profileComponent', () => {
  const TITLE = 'test';
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let authService: AuthService;
  let store: MockStore<AppState>;
  let sharedService: SharedService;

  const MOCK_USER = MOCK_USERS[0];
  const mockAuthToken: AuthToken = {
    userId: 'this is a string',
    accessToken: 'this is another test string',
  };
  const initialState = {
    user: {
      user: MOCK_USER as Partial<UserDto>,
      loading: false,
      loaded: true,
      error: null,
    },
    auth: {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        BrowserAnimationsModule,
      ],
      providers: [
        AuthService,
        SharedService,
        provideMockStore({ initialState }),
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    authService = TestBed.inject(AuthService);
    sharedService = TestBed.inject(SharedService);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it(`${TITLE} 1 > should be created`, () => {
    expect(component).toBeTruthy();
  });

  it(`${TITLE} 2 > compareLanguages should return true or false`, () => {
    const LANG1 = 'en';
    const LANG2 = 'es';
    const EQUALS = component.compareLanguages(LANG1, LANG1);
    const DIFFERENTS = component.compareLanguages(LANG1, LANG2);
    expect(EQUALS).toBe(true);
    expect(DIFFERENTS).toBe(false);
  });

  it(`${TITLE} 3 > ngOnInit should dispatch an action from the store and load data into form fields`, async () => {
    authService.setUser(mockAuthToken);
    component.ngOnInit();
    expect(store.dispatch).toHaveBeenCalledWith(
      USER_ACTIONS.getById({ userId: mockAuthToken.userId })
    );
    fixture.detectChanges();

    expect(component.avatar.value).toEqual(MOCK_USER.avatar);
    expect(component.alias.value).toEqual(MOCK_USER.alias);
    expect(component.email.value).toEqual(MOCK_USER.email);
    expect(component.language.value).toEqual(MOCK_USER.preferences.language);
    expect(component.roles.value).toEqual(MOCK_USER.roles);
  });

  it(`${TITLE} 5 > ngAfterContentInit should dispatch an action from the store and load data into form fields`, async () => {
    authService.setUser(mockAuthToken);
    component.ngAfterContentInit();
    expect(store.dispatch).toHaveBeenCalledWith(
      USER_ACTIONS.getById({ userId: mockAuthToken.userId })
    );
  });

  it(`${TITLE} 6 > updateUser should call sharedService if a user exists`, async () => {
    const spy = spyOn(sharedService, 'managementToast');

    authService.setUser(mockAuthToken);
    component.ngOnInit();
    await fixture.whenStable();
    expect(component.profileForm.valid).toBe(true);
    component.updateUser();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
      'postFeedback',
      initialState.user.loaded,
      undefined
    );
  });

  it(`${TITLE} 7 > updateUser should call sharedService if a error exists`, async () => {
    const newState: AppState = {
      user: {
        user: MOCK_USER as Partial<UserDto>,
        loading: false,
        loaded: false,
        error: { error: 'some error' },
      },
      auth: {
        auth: {
          userId: '',
          accessToken: '',
        },
        loading: false,
        loaded: false,
        error: null,
      },
    };
    const spy = spyOn(sharedService, 'managementToast');
    store.setState({ ...newState });
    authService.setUser(mockAuthToken);
    component.ngOnInit();
    await fixture.whenStable();
    expect(component.profileForm.valid).toBe(true);
    component.updateUser();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
      'postFeedback',
      newState.user.loaded,
      newState.user.error.error
    );
  });

  it(`${TITLE} 8 > updateUser should do nothing if profileForm is invalid`, async () => {
    const spy = spyOn(sharedService, 'managementToast');

    authService.setUser(mockAuthToken);
    component.ngOnInit();
    await fixture.whenStable();
    component.email.setValue('invalid email');
    fixture.detectChanges();
    expect(component.profileForm.valid).toBe(false);
    component.updateUser();
    expect(spy).not.toHaveBeenCalled();
  });
});
