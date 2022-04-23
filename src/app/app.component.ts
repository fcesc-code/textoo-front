import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnDestroy {
  title = 'textoo';
  isLoading: boolean;
  spinner_subscription: Subscription;

  constructor(private spinnerService: SpinnerService) {
    this.isLoading = false;
    this.spinner_subscription = this.spinnerService.isLoading.subscribe(
      (status) => (this.isLoading = status)
    );
  }

  ngOnDestroy() {
    this.spinner_subscription.unsubscribe();
  }
}
