import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivitiesService } from '../../services/activities.service';
import {
  ActivityBestOption,
  Question_ActivityBestOption,
} from 'src/app/models/ActivityBestOption.dto';
import {
  debounceTime,
  filter,
  fromEvent,
  map,
  merge,
  Subscription,
  tap,
} from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OptionSelection } from 'src/app/models/ActivityBestOption.dto';
import { CustomArrayMethods } from 'src/app/shared/utils/arrays';

@Component({
  selector: 'app-play-best-option',
  templateUrl: './play-best-option.component.html',
  styleUrls: ['./play-best-option.component.sass'],
})
export class PlayBestOptionComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  activity$!: Subscription;
  activity!: ActivityBestOption;
  // UIevents$!: Subscription;
  selectedOptions!: OptionSelection[];
  idSelector: string = 'activityMainText';
  textWithQuestions!: string;
  questions!: Question_ActivityBestOption[];

  constructor(
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedOptions = [];
    const activityId = this.activatedRoute.snapshot.paramMap.get('id');

    if (activityId) {
      this.activity$ = this.activitiesService
        .getActivity(activityId)
        .subscribe((activity: ActivityBestOption) => {
          this.classInitializer(activity);
        });
    }
    this.textWithQuestions = this.activity.text;
    this.questions = CustomArrayMethods.arraySort(
      this.activity?.questions || [],
      'position'
    );
  }

  ngAfterViewInit(): void {
    console.log('Afterviewinit');
  }

  ngOnDestroy(): void {
    this.activity$.unsubscribe();
    // this.UIevents$.unsubscribe();
  }

  classInitializer(activity: any): void {
    this.activity = this.activitiesService.initializeActivity(
      activity
    ) as ActivityBestOption;
  }
}
