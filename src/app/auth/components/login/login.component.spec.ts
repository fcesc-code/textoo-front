import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { LoginComponent } from './login.component';

describe('Auth module > Components > Login', () => {
  const TITLE = 'test';
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const mockAuthStore = jasmine.createSpyObj('AuthStore', ['dispatch'], {
    ath$: of([]),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientModule, RouterTestingModule, ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideProvider(Store, { useValue: mockAuthStore });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`${TITLE} 1 > should be created`, () => {
    expect(component).toBeTruthy();
  });

  /* For this test, the backend server must be running on localhost */
  it(`${TITLE} 2 > should display a button with 'Register' text`, () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    expect(buttons[1].innerText.trim()).toContain('Sign in');
  });
});
