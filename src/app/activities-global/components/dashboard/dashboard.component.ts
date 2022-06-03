import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivitiesGlobalService } from '../../services/activities-global.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnDestroy, OnInit {
  activities$: any;
  filteredActivities: any[];
  authors: any[];
  subscription$: any;
  constructor(
    private activitiesGlobalService: ActivitiesGlobalService,
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.filteredActivities = [];
    this.authors = [];
  }

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(): void {
    const { userId } = this.authService.getUser();
    if (userId) {
      this.subscription$ = this.activitiesGlobalService
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
    if (this.subscription$) this.subscription$.unsubscribe();
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
