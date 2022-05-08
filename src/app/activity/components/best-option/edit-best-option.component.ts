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
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { SupportedLanguages } from 'src/app/shared/interfaces/global.interfaces';
import { LANGUAGES } from 'src/app/shared/constants/globals';

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
  question: Question_ActivityBestOption;
  supportedLanguages: any[] = LANGUAGES;

  activityForm: FormGroup;
  title: FormControl;
  task: FormControl;
  language: FormControl;
  keywords: string[];
  text: string;

  constructor(
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.text = 'This is an initial placeholder text.';
    this.question = {
      id: '',
      position: 0,
      options: [],
    };
    this.keywords = [];

    this.title = new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(100),
    ]);
    this.task = new FormControl('', [
      Validators.required,
      Validators.minLength(20),
      Validators.maxLength(300),
    ]);
    this.language = new FormControl(SupportedLanguages.CA, [
      Validators.required,
    ]);

    this.activityForm = this.formBuilder.group({});
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
          this.text = this.activity.text;
          this.title.setValue(this.activity.title);
          this.task.setValue(this.activity.task);
          this.language.setValue(this.activity.language);
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
    // console.log('here here, updatedText >>> ', updatedText);
    this.text = updatedText;
  }

  fontResponse(font: any): void {
    // console.log('parent receiving font >>> ', font);
    this.activity.font = font;
  }

  questionResponse(question: Question_ActivityBestOption): void {
    console.log('questionResponse received in parent >>> ', question);
  }

  updateActivity(): void {
    if (this.activityForm.valid) {
      console.log(
        'creating new instance to be submitted >>> ',
        this.activityForm.value
      );
      this.classInitializer({ ...this.activityForm.value });
    }
  }

  save(): void {
    console.log('saving activity >>> ', this.activity);
  }

  removePlaceHolders(): string {
    const exp = new RegExp(
      /<strong style=\"background-color: yellow;\">PREGUNTA N\. [0-9]+<\/strong>/g
    );
    let result = this.text.replace(exp, '');
    console.log('result >>> ', result);
    return result;
  }
}
