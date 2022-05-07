import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import {
  ActivityBestOption,
  Question_ActivityBestOption,
} from '../../models/ActivityBestOption.dto';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OptionSelection } from '../../models/ActivityBestOption.dto';
import { CustomArrayMethods } from 'src/app/shared/utils/arrays';
import { Answer } from '../../models/Answer.dto';

@Component({
  selector: 'app-edit-best-option',
  templateUrl: './edit-best-option.component.html',
  styleUrls: ['./edit-best-option.component.sass'],
})
export class EditBestOptionComponent implements OnInit, OnDestroy {
  activity$!: Subscription;
  activity!: ActivityBestOption;
  selectedOptions!: OptionSelection[];
  idSelector: string = 'activityMainText';
  textWithQuestions!: string;
  questions!: Question_ActivityBestOption[];
  answers!: Answer;
  completed: boolean = false;
  text: string;

  constructor(
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.text = 'This is an initial text';
  }

  ngOnInit(): void {
    this.selectedOptions = [];
    const activityId = this.activatedRoute.snapshot.paramMap.get('id');
    this.textWithQuestions = `Carregant l'activitat...`;

    if (activityId) {
      this.activity$ = this.activitiesService
        .getActivityById(activityId)
        .subscribe((activity: ActivityBestOption) => {
          this.classInitializer(activity);
          this.textWithQuestions = this.activity.text;
          this.questions = CustomArrayMethods.arraySort(
            this.activity.questions || [],
            'position'
          );
        });
    }
  }

  ngOnDestroy(): void {
    this.activity$.unsubscribe();
  }

  classInitializer(activity: any): void {
    this.activity = this.activitiesService.initializeActivity(
      activity
    ) as ActivityBestOption;
  }

  editorResponse(updatedText: string): void {
    console.log('here here, updatedText >>> ', updatedText);
    this.text = updatedText;
  }
}
