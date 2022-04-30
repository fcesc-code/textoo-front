import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from './shared/services/spinner.service';
import { Router } from '@angular/router';
import { HeaderMenusService } from './shared/services/header-menus.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from './app.reducer';
import { HeaderMenus } from './shared/models/header-menus.dto';
import { AUTH_ACTIONS } from './auth/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnDestroy, OnInit, OnChanges {
  title = 'textoo';
  isLoading: boolean;
  spinner_subscription: Subscription;
  showAuthSection: boolean;
  showNoAuthSection: boolean;

  constructor(
    private spinnerService: SpinnerService,
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private store: Store<AppState>
  ) {
    this.isLoading = false;
    this.spinner_subscription = this.spinnerService.isLoading.subscribe(
      (status) => (this.isLoading = status)
    );
    this.showAuthSection = false;
    this.showNoAuthSection = true;
  }

  ngOnInit(): void {
    if (this.localStorageService.get('user_id') !== undefined) {
      this.showAuthSection = true;
      this.showNoAuthSection = false;
    } else {
      this.showAuthSection = false;
      this.showNoAuthSection = true;
      this.router.navigateByUrl('home');
    }
  }

  ngOnChanges(): void {
    if (this.localStorageService.get('user_id') !== undefined) {
      this.showAuthSection = true;
      this.showNoAuthSection = false;
    } else {
      this.showAuthSection = false;
      this.showNoAuthSection = true;
      this.router.navigateByUrl('home');
    }
  }

  ngOnDestroy() {
    this.spinner_subscription.unsubscribe();
  }

  home(): void {
    this.router.navigateByUrl('home');
  }

  login(): void {
    this.router.navigateByUrl('login');
  }

  register(): void {
    this.router.navigateByUrl('register');
  }

  profile(): void {
    this.router.navigateByUrl('profile');
  }

  logout(): void {
    this.localStorageService.remove('user_id');
    this.localStorageService.remove('access_token');
    this.localStorageService.remove('lang');

    const headerInfo: HeaderMenus = {
      showAuthSection: false,
      showNoAuthSection: true,
    };

    this.headerMenusService.headerManagement.next(headerInfo);

    this.store.dispatch(AUTH_ACTIONS.logout());

    this.router.navigateByUrl('home');
  }
}
