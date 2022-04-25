import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    console.log('hi, I am a dashboard');
  }
}
