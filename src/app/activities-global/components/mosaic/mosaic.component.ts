import { Component, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivitiesGlobalService } from '../../services/activities-global.service';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.component.html',
  styleUrls: ['./mosaic.component.sass'],
})
export class MosaicComponent implements OnDestroy {
  activities$: any;
  filteredActivities: any[];
  authors: any[];
  subscription$: any;
  constructor(
    private activitiesGlobalService: ActivitiesGlobalService,
    private sharedService: SharedService
  ) {
    this.filteredActivities = [];
    this.authors = [];
    this.loadActivities();
  }

  loadActivities(): void {
    this.subscription$ = this.activitiesGlobalService
      .getAllActivities()
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

  filterByAuthor(userId: string): void {
    this.filteredActivities = [...this.activities$].filter(
      (activity: any) => activity.author === userId
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
