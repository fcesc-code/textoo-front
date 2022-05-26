import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivitiesService } from '../../services/activities.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnDestroy {
  activities$: any;
  filteredActivities: any[];
  authors: any[];
  subscription$: any;
  constructor(
    private activitiesService: ActivitiesService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.filteredActivities = [];
    this.authors = [];
    this.loadActivities();
  }

  loadActivities(): void {
    const { userId } = this.authService.getUser();
    if (userId) {
      this.subscription$ = this.activitiesService
        .getAllActivitiesByUserId(userId)
        .subscribe({
          next: (data): void => {
            this.activities$ = data;
            this.filteredActivities = data;
          },
          error: (error): void => {
            this.sharedService.errorLog(error.error);
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  filterByKeyword(targetKeyword: string): void {
    this.filteredActivities = [...this.activities$].filter((activity: any) => {
      return activity.keywords.find(
        (keyword: string) =>
          targetKeyword.toLowerCase().trim() === keyword.toLowerCase().trim()
      );
    });
  }

  filterByType(targetType: string): void {
    this.filteredActivities = [...this.activities$].filter(
      (activity: any) =>
        activity.type.toLowerCase().trim() === targetType.toLowerCase().trim()
    );
  }

  filterByLanguage(targetLanguage: string): void {
    this.filteredActivities = [...this.activities$].filter(
      (activity: any) =>
        activity.language.toLowerCase().trim() ===
        targetLanguage.toLowerCase().trim()
    );
  }

  removeFilters(): void {
    this.filteredActivities = [...this.activities$];
  }

  filtersApplied(): boolean {
    return this.activities$ && this.filteredActivities
      ? this.filteredActivities.length !== this.activities$.length
      : false;
  }
}
