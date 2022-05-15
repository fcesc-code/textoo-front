import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { debounce, map, Subject, Subscription, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.sass'],
})
export class ConnectComponent implements OnInit, OnDestroy {
  timer$!: Subscription;

  joinGroupForm: FormGroup;
  accessCode: FormControl;

  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.accessCode = new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]);

    this.joinGroupForm = this.formBuilder.group({
      accessCode: this.accessCode,
    });

    // this.timer$ = this.xxx.pipe().subscribe({
    //   next: (data: any) => {
    //     console.log(data);
    //   },
    // });
  }

  ngOnInit(): void {
    const activityId = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnDestroy(): void {
    this.timer$.unsubscribe();
  }

  join(): void {
    console.log('hello, world!');
  }
}
