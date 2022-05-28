import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivitiesService } from 'src/app/activities/services/activities.service';
import { UserService } from 'src/app/user/services/user.service';

interface PickedActivity {
  pickedActivity: string;
}

@Component({
  selector: 'app-activities-picker',
  templateUrl: './activities-picker.component.html',
  styleUrls: ['./activities-picker.component.sass'],
})
export class ActivitiesPickerComponent implements OnDestroy {
  activities$: any;
  filteredActivities: any[];
  authors: any[];
  subscription$: any;
  constructor(
    private activitiesService: ActivitiesService,
    private userService: UserService,
    private sharedService: SharedService
  ) {
    this.filteredActivities = [];
    this.authors = [];
    this.loadActivities();
  }
  @Output() pickedActivity: EventEmitter<PickedActivity> = new EventEmitter();

  loadActivities(): void {
    this.subscription$ = this.activitiesService.getAllActivities().subscribe({
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
    this.subscription$.unsubscribe();
  }

  retainId(id: string): void {
    this.filteredActivities = [...this.activities$].filter(
      (activity: any) => activity._id === id
    );
    const selectedActivity: PickedActivity = { pickedActivity: id };
    this.pickedActivity.emit(selectedActivity);
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
    if (this.filteredActivities.length <= 1) {
      const selectedActivity: PickedActivity = { pickedActivity: '' };
      this.pickedActivity.emit(selectedActivity);
    }
    this.filteredActivities = [...this.activities$];
  }

  filtersApplied(): boolean {
    return this.activities$ && this.filteredActivities
      ? this.filteredActivities.length !== this.activities$.length
      : false;
  }
}
