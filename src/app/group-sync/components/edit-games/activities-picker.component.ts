import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ActivitiesGlobalService } from 'src/app/activities-global/services/activities-global.service';
import { UserService } from 'src/app/user/services/user.service';

interface PickedActivity {
  id: string;
  title: string;
}

@Component({
  selector: 'app-activities-picker',
  templateUrl: './activities-picker.component.html',
  styleUrls: ['./activities-picker.component.sass'],
})
export class ActivitiesPickerComponent implements OnChanges, OnDestroy {
  activities$: any;
  filteredActivities: any[];
  authors: any[];
  subscription$: any;

  constructor(
    private activitiesGlobalService: ActivitiesGlobalService,
    private sharedService: SharedService
  ) {
    this.activities$ = [];
    this.filteredActivities = [];
    this.authors = [];
    this.loadActivities();
  }
  @Input() selectedActivity: string = '';
  @Output() pickedActivity: EventEmitter<PickedActivity> = new EventEmitter();

  ngOnChanges(): void {
    if (this.selectedActivity) {
      this.filterById(this.selectedActivity);
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
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

  retainId(id: string, title: string): void {
    this.filteredActivities = [...this.activities$].filter(
      (activity: any) => activity._id === id
    );
    const selectedActivity: PickedActivity = { id, title };
    this.pickedActivity.emit(selectedActivity);
  }

  filterById(id: string): void {
    this.filteredActivities = [...this.activities$].filter((activity: any) => {
      return activity._id === id;
    });
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
      const selectedActivity: PickedActivity = { id: '', title: '' };
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
