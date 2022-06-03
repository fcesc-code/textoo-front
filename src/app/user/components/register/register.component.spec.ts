import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthToken } from 'src/app/auth/models/Auth.dto';
import { RegisterComponent } from './register.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MOCK_USERS } from 'mockdata/user.mock';
import { AppState } from 'src/app/app.reducer';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { USER_ACTIONS } from '../../actions/user.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedService } from 'src/app/shared/services/shared.service';
import { NewUserDto, UserDto } from '../../models/user.dto';

describe('user > components > register > registerComponent', () => {
  const TITLE = 'test';
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
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
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(store, 'dispatch').and.callFake(() => {});
  });

  it(`${TITLE} 1 > should be created`, () => {
    expect(component).toBeTruthy();
  });

  it(`${TITLE} 2 > register should dispatch an action from the store`, async () => {
    authService.setUser(mockAuthToken);

    component.alias.setValue(MOCK_USER.alias);
    component.avatar.setValue(MOCK_USER.avatar);
    component.email.setValue(MOCK_USER.email);
    component.password.setValue(MOCK_USER.password);
    component.passwordConfirmation.setValue(MOCK_USER.password);
    component.preferences.setValue(MOCK_USER.preferences);
    component.alias.markAsDirty();
    fixture.detectChanges();
    expect(component.registerForm.valid).toBe(true);

    const registerUser = new NewUserDto({
      ...component.registerForm.value,
      likedActivities: [],
      activeGroups: [],
      roles: [1],
    });

    await component.register();
    expect(store.dispatch).toHaveBeenCalledWith(
      USER_ACTIONS.create({ user: registerUser })
    );
  });

  it(`${TITLE} 3 > register should call sharedService if a error exists`, async () => {
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
    await fixture.whenStable();
    expect(component.registerForm.valid).toBe(false);
    component.register();
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith(
      'registerFeedback',
      newState.user.loaded,
      newState.user.error.error
    );
  });
});
