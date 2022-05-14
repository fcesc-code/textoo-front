import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import {
  ActivityBestOption,
  Question_ActivityBestOption,
} from '../../models/ActivityBestOption.dto';
import { Font, Timestamps } from '../../models/Activity.dto';
import { debounce, Subject, Subscription, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
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
  responseTime = 750;

  UIQuestionSubject: Subject<Question_ActivityBestOption>;
  UIQuestionSubscription$: Subscription;
  UIFontSubject: Subject<Font>;
  UIFontSubscription$: Subscription;
  UIKeywordsSubject: Subject<string[]>;
  UIKeywordsSubscription$: Subscription;
  UITextSubject: Subject<string>;
  UITextSubscription$: Subscription;

  activity$!: Subscription;
  activity!: ActivityBestOption;

  textWithQuestions!: string;
  questions: Question_ActivityBestOption[];
  supportedLanguages: any[] = LANGUAGES;

  activityForm: FormGroup;
  title: FormControl;
  task: FormControl;
  language: FormControl;
  keywords: string[];

  isNewActivity: boolean;

  constructor(
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.questions = [];
    this.keywords = [];
    this.isNewActivity = false;

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

    this.activityForm = this.formBuilder.group({
      title: this.title,
      task: this.task,
      language: this.language,
    });

    this.UIQuestionSubject = new Subject<Question_ActivityBestOption>();
    this.UIQuestionSubscription$ = this.UIQuestionSubject.pipe(
      debounce(() => timer(this.responseTime))
    ).subscribe({
      next: (updatedQuestion) => {
        this.updateQuestionsArray(updatedQuestion);
      },
    });

    this.UITextSubject = new Subject<string>();
    this.UITextSubscription$ = this.UITextSubject.pipe(
      debounce(() => timer(this.responseTime))
    ).subscribe({
      next: (updatedText) => {
        this.activity.text = updatedText;
      },
    });

    this.UIFontSubject = new Subject<Font>();
    this.UIFontSubscription$ = this.UIFontSubject.pipe(
      debounce(() => timer(this.responseTime))
    ).subscribe({
      next: (updatedFont) => {
        this.activity.font = updatedFont;
      },
    });

    this.UIKeywordsSubject = new Subject<string[]>();
    this.UIKeywordsSubscription$ = this.UIKeywordsSubject.pipe(
      debounce(() => timer(this.responseTime))
    ).subscribe({
      next: (updatedKeywords: string[]) => {
        this.activity.keywords = updatedKeywords;
      },
    });
  }

  ngOnInit(): void {
    const activityId = this.activatedRoute.snapshot.paramMap.get('id');
    this.textWithQuestions = `Carregant l'activitat...`;

    if (activityId) {
      this.isNewActivity = false;
      this.activity$ = this.activitiesService
        .getActivityById(activityId)
        .subscribe((activity: ActivityBestOption) => {
          this.activity = this.classInitializer(activity);
          this.textWithQuestions = this.activity.text;
          this.title.setValue(this.activity.title);
          this.task.setValue(this.activity.task);
          this.language.setValue(this.activity.language);
          this.questions = CustomArrayMethods.arraySort(
            this.activity.questions || [],
            'position'
          );
        });
    } else {
      this.isNewActivity = true;
    }
  }

  ngOnDestroy(): void {
    this.activity$.unsubscribe();
    this.UIQuestionSubscription$.unsubscribe();
    this.UIFontSubscription$.unsubscribe();
    this.UIKeywordsSubscription$.unsubscribe();
    this.UITextSubscription$.unsubscribe();
  }

  classInitializer(activity: Partial<ActivityBestOption>): ActivityBestOption {
    return this.activitiesService.new(activity).bestOption();
  }

  editorResponse(updatedText: string): void {
    this.UITextSubject.next(updatedText);
  }

  fontResponse(font: Font): void {
    this.UIFontSubject.next(font);
  }

  keywordsResponse(updatedKeywords: string[]): void {
    this.UIKeywordsSubject.next(updatedKeywords);
  }

  questionResponse(updatedQuestion: Question_ActivityBestOption): void {
    this.UIQuestionSubject.next(updatedQuestion);
  }

  updateQuestionsArray(updatedQuestion: Question_ActivityBestOption): void {
    const newQuestions = [...this.questions].map((question) =>
      question.id !== updatedQuestion.id ? question : updatedQuestion
    );
    this.questions = newQuestions;
  }

  createOrUpdate(): void {
    if (this.activityForm.valid && !this.isNewActivity) {
      let result = this.buildActivity();
      console.log('updating activity >>> ', result);
    }
    if (this.activityForm.valid && this.isNewActivity) {
      let result = this.buildActivity();
      console.log('creating activity >>> ', result);
    }
  }

  buildActivity(): ActivityBestOption {
    const text = this.removePlaceHolders(this.activity.text);
    const newTimestamps: Timestamps = {
      created: this.isNewActivity
        ? new Date()
        : this.activity.timestamps.created,
      modified: new Date(),
    };
    return this.classInitializer({
      ...this.activityForm.value,
      _id: this.activity.id,
      author: this.activity.author,
      text: text,
      keywords: this.activity.keywords,
      font: this.activity.font,
      questions: this.questions,
      timestamps: newTimestamps,
      scores: this.activity.scores,
    });
  }

  removePlaceHolders(text: string): string {
    const exp = new RegExp(
      /<strong style=\"background-color: yellow;\">PREGUNTA N\. [0-9]+<\/strong>/g
    );
    return text.replace(exp, '') || '';
  }
}
