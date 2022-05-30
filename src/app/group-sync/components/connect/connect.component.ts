import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GameIdValidator } from '../../validators/game-id.validator';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.sass'],
})
export class ConnectComponent {
  joinGroupForm: FormGroup;
  accessCode: FormControl;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.accessCode = new FormControl('', [
      Validators.required,
      GameIdValidator(),
    ]);

    this.joinGroupForm = this.formBuilder.group({
      accessCode: this.accessCode,
    });
  }

  join(): void {
    if (this.joinGroupForm.valid) {
      this.router.navigateByUrl(`/games/play/${this.accessCode.value}`);
    }
  }
}
