import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivitiesService } from '../../services/activities.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.sass'],
})
export class MosaicComponent {
  activities$: any;
  subscription$: any;
  constructor(
    private activitiesService: ActivitiesService,
    private sharedService: SharedService
  ) {
    this.loadActivities();
  }

  loadActivities(): void {
    this.subscription$ = this.activitiesService.getAllActivities().subscribe({
      next: (data): void => {
        this.activities$ = data;
      },
      error: (error): void => {
        this.sharedService.errorLog(error.error);
      },
    });
  }
}
