import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GameIdValidator } from '../../validators/game-id.validator';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.sass'],
})
export class ConnectComponent implements OnInit {
  joinGroupForm: FormGroup;
  accessCode: FormControl;
  gameId: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.accessCode = new FormControl('', [
      Validators.required,
      GameIdValidator(),
    ]);

    this.joinGroupForm = this.formBuilder.group({
      accessCode: this.accessCode,
    });

    this.gameId = this.activatedRoute.snapshot.paramMap.get('id') || null;
  }

  ngOnInit() {
    if (this.gameId) {
      this.accessCode.setValue(this.gameId);
    }
  }

  join(): void {
    if (this.joinGroupForm.valid) {
      this.router.navigateByUrl(`/games/play/${this.accessCode.value}`);
    }
  }
}
