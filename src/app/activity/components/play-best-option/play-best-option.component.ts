import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivitiesService } from '../../services/activities.service';
import { ActivityBestOption } from 'src/app/models/ActivityBestOption.dto';
import { ActivitySelectText } from 'src/app/models/ActivitySelectText.dto';
import { ActivityTransformAspect } from 'src/app/models/ActivityTransformAspect.dto';
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
    this.loadQuestions();
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

  loadQuestions(): void {
    let questions = this.activity?.questions || [];
    let sortedQuestions = CustomArrayMethods.arraySort(questions, 'position');
    const TEXT = this.activity.text;

    let pointer = 0;
    let textWithQuestions = '';
    const PREFIX_SELECT = '<select class="question">';
    const SUFFIX_SELECT = '</select> ';
    const PREFIX_OPTION = '<option class="option" value="';
    const INFIX_OPTION = '">';
    const SUFFIX_OPTION = '</option>';

    for (let question of sortedQuestions) {
      const leftSlice = TEXT.slice(pointer, question.position + 1);
      textWithQuestions = `${textWithQuestions}${leftSlice}${PREFIX_SELECT}`;
      console.log('Question: LS:', leftSlice);
      for (let option of question.options) {
        textWithQuestions = `${textWithQuestions}${PREFIX_OPTION}${option.text}${INFIX_OPTION}${option.text}${SUFFIX_OPTION}`;
        console.log('Option:', option);
      }
      textWithQuestions = `${textWithQuestions}${SUFFIX_SELECT}`;
      console.log('Parsed HTML text', textWithQuestions);
      pointer = question.position;
    }
    textWithQuestions = `${textWithQuestions}${TEXT.slice(pointer)}`;
    this.textWithQuestions = textWithQuestions;
  }
}
