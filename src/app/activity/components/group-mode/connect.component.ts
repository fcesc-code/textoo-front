import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.sass'],
})
export class ConnectComponent {
  joinGroupForm: FormGroup;
  accessCode: FormControl;

  constructor(private formBuilder: FormBuilder) {
    this.accessCode = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.joinGroupForm = this.formBuilder.group({
      accessCode: this.accessCode,
    });
  }

  join(): void {
    console.log('hello, world!');
  }
}
