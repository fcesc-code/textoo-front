import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SpinnerService } from 'src/app/shared/services/spinner.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  accessToken: string | null;

  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService
  ) {
    this.accessToken = this.authService.getToken();
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    this.accessToken = this.authService.getToken();
    console.log('accessToken', this.accessToken);
    if (this.accessToken) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json;charset=utf-8',
          Accept: 'application/json',
          Authorization: `Bearer ${this.accessToken}`,
        },
      });
    }

    return next.handle(req).pipe(finalize(() => this.spinnerService.hide()));
  }
}
