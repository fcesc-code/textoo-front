import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.sass'],
})
export class PageNotFoundComponent implements OnInit {
  userIsLoggedIn: boolean;

  constructor(private authService: AuthService) {
    this.userIsLoggedIn = false;
  }

  ngOnInit() {
    const { userId } = this.authService.getUser();
    if (userId) {
      this.userIsLoggedIn = true;
    }
  }
}
