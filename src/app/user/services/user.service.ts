import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewUserDto, UserDto } from '../models/user.dto';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { API_CONTROLLERS, API_ROUTES } from 'src/routes/API_ROUTES';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API: string;

  constructor(private http: HttpClient, private sharedService: SharedService) {
    this.API = `${API_ROUTES.development}/${API_CONTROLLERS.users}`;
  }

  register(user: NewUserDto): Observable<UserDto> {
    return this.http
      .post<UserDto>(`${this.API}/`, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  updateUser(userId: string, user: UserDto): Observable<UserDto> {
    return this.http
      .put<UserDto>(`${this.API}/${userId}`, user)
      .pipe(catchError(this.sharedService.handleError));
  }

  getUSerById(userId: string): Observable<UserDto> {
    return this.http
      .get<UserDto>(`${this.API}/${userId}`)
      .pipe(catchError(this.sharedService.handleError));
  }
}
