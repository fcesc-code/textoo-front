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

describe('HeaderComponent', () => {
  const TITLE = 'test';
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let service: LocalStorageService;
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
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`${TITLE} 1 > should create`, () => {
    expect(component).toBeTruthy();
  });

  it(`${TITLE} 2 > should navigate to different destinations`, () => {
    spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));
    component.home();
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalledWith('home');

    component.register();
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalledWith('register');

    service.set('user_id', 'someId');
    service.set('access_token', '1qwe0234asdf1234df');
    component.profile();
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalledWith('user/profile');
    service.remove('user_id');
    service.remove('access_token');

    component.login();
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalledWith('login');
  });

  it(`${TITLE} 3 > should remove data from local storage when logout is called`, () => {
    service.set('user_id', 'someId');
    service.set('access_token', '1qwe0234asdf1234df');
    service.set('lang', 'en');

    component.logout();
    fixture.detectChanges();
    const id = service.get('user_id');
    const token = service.get('access_token');
    const lang = service.get('lang');

    expect(id).toBeNull();
    expect(token).toBeNull();
    expect(lang).toBeNull();
  });
});
