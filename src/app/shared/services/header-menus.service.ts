import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderMenus } from '../models/header-menus.dto';

@Injectable({
  providedIn: 'root',
})
export class HeaderMenusService {
  private = {
    showAuthSection: true,
    showNoAuthSection: false,
  };
  public = {
    showAuthSection: false,
    showNoAuthSection: true,
  };

  headerManagement: BehaviorSubject<HeaderMenus> =
    new BehaviorSubject<HeaderMenus>(this.public);

  authorize() {
    this.headerManagement.next(this.private);
  }

  unauthorize() {
    this.headerManagement.next(this.public);
  }
}
