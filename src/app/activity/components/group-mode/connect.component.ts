import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.sass'],
})
export class ConnectComponent {
  joinGroupForm: FormGroup;
  accessCode: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.accessCode = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.joinGroupForm = this.formBuilder.group({
      accessCode: this.accessCode,
    });
  }

  join(): void {
    const { userId, accessToken } = this.authService.getUser();
    console.log(
      `Calling group game with >>> userId:${userId}, gameId:${this.accessCode.value}, userTk:${accessToken}`
    );
  }
}
