import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { routes } from 'src/app/app-routing.module';
import { LocalStorageService } from '../../services/local-storage.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

describe('HeaderComponent', () => {
  const TITLE = 'test';
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let service: LocalStorageService;
  let authService: AuthService;
  const mockAuthStore = jasmine.createSpyObj('AuthStore', ['dispatch'], {
    ath$: of([]),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [HttpClientModule, RouterTestingModule.withRoutes(routes)],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.overrideProvider(Store, { useValue: mockAuthStore });
    router = TestBed.inject(Router);
    service = TestBed.inject(LocalStorageService);
    authService = TestBed.inject(AuthService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`${TITLE} 1 > should create`, () => {
    expect(component).toBeTruthy();
  });

  it(`${TITLE} 3 > should remove data from local storage when logout is called`, () => {
    authService.setUser({
      userId: 'someId',
      accessToken: '1qwe0234asdf1234df',
    });
    service.set('lang', 'en');

    component.logout();
    fixture.detectChanges();
    const { userId, accessToken } = authService.getUser();
    const lang = service.get('lang');

    expect(userId).toBeNull();
    expect(accessToken).toBeNull();
    expect(lang).toBeNull();
  });
});
