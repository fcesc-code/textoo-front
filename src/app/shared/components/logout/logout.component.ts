import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass'],
})
export class LogoutComponent {
  constructor(private router: Router) {
    setTimeout(() => {
      this.router.navigateByUrl('home');
    }, 5000);
  }
}
