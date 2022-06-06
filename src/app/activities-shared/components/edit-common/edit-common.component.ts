import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { SupportedLanguages } from 'src/app/shared/interfaces/global.interfaces';
import { LANGUAGES } from 'src/app/shared/constants/globals';
import { CommonData } from 'src/app/activities-shared/models/Activity.dto';

@Component({
  selector: 'app-edit-common',
  templateUrl: './edit-common.component.html',
  styleUrls: ['./edit-common.component.sass'],
})
export class EditCommonComponent implements OnInit {
  private emptyCommon: CommonData = {
    title: '',
    task: '',
    language: SupportedLanguages.CA,
    scores: {
      scorePerQuestion: 0,
      timeToComplete: 0,
    },
  };

  supportedLanguages: any[] = LANGUAGES;

  commonForm: FormGroup;
  title: FormControl;
  task: FormControl;
  language: FormControl;
  scorePerQuestion: FormControl;
  timeToComplete: FormControl;

  constructor(private formBuilder: FormBuilder) {
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
    this.scorePerQuestion = new FormControl(0, [
      Validators.required,
      Validators.min(1),
      Validators.max(10),
      Validators.pattern(/^\d*$/),
    ]);
    this.timeToComplete = new FormControl(0, [Validators.pattern(/^\d*$/)]);

    this.commonForm = this.formBuilder.group({
      title: this.title,
      task: this.task,
      language: this.language,
      scorePerQuestion: this.scorePerQuestion,
      timeToComplete: this.timeToComplete,
    });
  }
  @Input() common: CommonData = this.emptyCommon;
  @Input() questions: number = 0;
  @Output() commonResponse: EventEmitter<CommonData> = new EventEmitter();

  ngOnInit(): void {
    this.setFormValues();
  }

  setFormValues() {
    this.title.setValue(this.common.title);
    this.task.setValue(this.common.task);
    this.language.setValue(this.common.language);
    this.scorePerQuestion.setValue(this.common.scores.scorePerQuestion);
    this.timeToComplete.setValue(this.common.scores.timeToComplete);
  }

  emit() {
    this.commonResponse.emit(this.commonForm.value);
  }
}
