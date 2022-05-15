import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
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
export class AppComponent implements OnDestroy, OnInit, AfterContentInit {
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
    this.headerMenusService.headerManagement.subscribe(
      (headerInfo: HeaderMenus) => {
        if (headerInfo) {
          this.showAuthSection = headerInfo.showAuthSection;
          this.showNoAuthSection = headerInfo.showNoAuthSection;
        }
      }
    );

    this.refreshAuthStatus();
  }

  ngAfterContentInit(): void {
    this.refreshAuthStatus();
  }

  ngOnDestroy() {
    this.spinner_subscription.unsubscribe();
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

  refreshAuthStatus(): void {
    const userId = this.localStorageService.get('user_id');
    const token = this.localStorageService.get('access_token');
    if (userId && token) {
      const headerInfo: HeaderMenus = {
        showAuthSection: true,
        showNoAuthSection: false,
      };
      this.headerMenusService.headerManagement.next(headerInfo);
    } else {
      const headerInfo: HeaderMenus = {
        showAuthSection: false,
        showNoAuthSection: true,
      };
      this.headerMenusService.headerManagement.next(headerInfo);
    }
  }
}
