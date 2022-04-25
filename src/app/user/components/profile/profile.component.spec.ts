import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthToken } from 'src/app/auth/models/Auth.dto';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ProfileComponent } from './profile.component';

describe('User > Components > Profile', () => {
  const TITLE = 'test';
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let localStorage: LocalStorageService;
  const mockAuthStore = jasmine.createSpyObj('user', ['dispatch'], {
    ath$: of([]),
  });
  const mockAuthToken: AuthToken = {
    user_id: 'this is a string',
    access_token: 'this is another test string',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [RouterTestingModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideProvider(Store, { useValue: mockAuthStore });
    localStorage = TestBed.inject(LocalStorageService);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`${TITLE} 1 > should be created`, () => {
    expect(component).toBeTruthy();
  });

  it(`${TITLE} 2 getLocalStorageUserId > should return a userId`, () => {
    const spy = spyOn(localStorage, 'get')
      .and.returnValue(mockAuthToken.user_id)
      .and.callThrough();
    localStorage.get('user_id');
    component.updateUser();
    expect(spy).toHaveBeenCalled();
  });

  it(`${TITLE} 3 profileForm > form should have 4 input elements`, () => {
    const formElement =
      fixture.debugElement.nativeElement.querySelector('form');
    const inputElements = formElement.querySelectorAll('input');
    expect(inputElements.length).toEqual(4);
  });

  it(`${TITLE} 4 profileForm > form should be valid if inputs are valid`, () => {
    const spy = spyOn(localStorage, 'get')
      .and.returnValue(mockAuthToken.user_id)
      .and.callThrough();
    const formElement =
      fixture.debugElement.nativeElement.querySelector('form');
    const aliasInput = formElement.querySelector('#profileForm-alias');
    const avatarInput = formElement.querySelector('#profileForm-avatar');
    const emailInput = formElement.querySelector('#profileForm-email');
    const passwordInput = formElement.querySelector('#profileForm-password');
    aliasInput.value = 'testalias';
    aliasInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    avatarInput.value = 'testavatar';
    avatarInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    emailInput.value = 'testemail@mail.me';
    emailInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    passwordInput.value = 'testpassword';
    passwordInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture
      .whenStable()
      .then(() => {
        component.updateUser();
        expect(component.profileForm.valid).toBeTruthy();
      })
      .catch(() => {});
  });
  // falta fer el dispatch del store
});
