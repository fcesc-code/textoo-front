import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMenus } from '../../models/header-menus.dto';
import { HeaderMenusService } from '../../services/header-menus.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { AUTH_ACTIONS } from 'src/app/auth/actions/auth.actions';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  showAuthSection: boolean;
  showNoAuthSection: boolean;
  color: string;

  constructor(
    private router: Router,
    private headerMenusService: HeaderMenusService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private store: Store<AppState>
  ) {
    this.showAuthSection = false;
    this.showNoAuthSection = true;
    this.color = 'accent';
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
  }

  logout(): void {
    this.authService.removeUser();
    this.localStorageService.remove('lang');

    const headerInfo: HeaderMenus = {
      showAuthSection: false,
      showNoAuthSection: true,
    };

    this.headerMenusService.headerManagement.next(headerInfo);

    this.store.dispatch(AUTH_ACTIONS.logout());

    this.router.navigateByUrl('logout');
  }
}
