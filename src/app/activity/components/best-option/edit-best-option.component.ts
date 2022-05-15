import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import {
  ActivityBestOption,
  Question_ActivityBestOption,
  QuestionResponse,
} from '../../models/ActivityBestOption.dto';
import { CommonData, Font, Timestamps } from '../../models/Activity.dto';
import { debounce, map, Subject, Subscription, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CustomArrayMethods } from 'src/app/shared/utils/arrays';
import { SupportedLanguages } from 'src/app/shared/interfaces/global.interfaces';
import { LANGUAGES } from 'src/app/shared/constants/globals';

@Component({
  selector: 'app-edit-best-option',
  templateUrl: './edit-best-option.component.html',
  styleUrls: ['./edit-best-option.component.sass'],
})
export class EditBestOptionComponent implements OnInit, OnDestroy {
  responseTime = 750;

  UIQuestionSubject: Subject<QuestionResponse>;
  UIQuestionSubscription$: Subscription;
  UIFontSubject: Subject<Font>;
  UIFontSubscription$: Subscription;
  UICommonSubject: Subject<CommonData>;
  UICommonSubscription$: Subscription;
  UIKeywordsSubject: Subject<string[]>;
  UIKeywordsSubscription$: Subscription;
  UITextSubject: Subject<string>;
  UITextSubscription$: Subscription;

  activity$!: Subscription;
  activity!: ActivityBestOption;

  questions: Question_ActivityBestOption[];

  supportedLanguages: any[] = LANGUAGES;
  keywords: string[];

  isNewActivity: boolean;

  constructor(
    private activitiesService: ActivitiesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.questions = [];
    this.keywords = [];
    this.isNewActivity = false;

    this.UIQuestionSubject = new Subject<QuestionResponse>();
    this.UIQuestionSubscription$ = this.UIQuestionSubject.pipe().subscribe({
      next: (questionResponse) => {
        const updatedQuestion = questionResponse.question;
        if (questionResponse.deleted) {
          this.questionRemoved(updatedQuestion.id);
          this.activity.text = this.removeSpeciticPlaceHolder(
            this.activity.text,
            updatedQuestion.id
          );
        } else {
          this.updateQuestionsArray(updatedQuestion);
        }
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

    this.UICommonSubject = new Subject<CommonData>();
    this.UICommonSubscription$ = this.UICommonSubject.pipe(
      debounce(() => timer(this.responseTime))
    ).subscribe({
      next: (updatedCommon) => {
        this.activity.title = updatedCommon.title;
        this.activity.task = updatedCommon.task;
        this.activity.language = updatedCommon.language;
        this.activity.scores.scorePerQuestion =
          updatedCommon.scores.scorePerQuestion;
        this.activity.scores.timeToComplete =
          updatedCommon.scores.timeToComplete;
      },
    });

    this.UIKeywordsSubject = new Subject<string[]>();
    this.UIKeywordsSubscription$ = this.UIKeywordsSubject.pipe().subscribe({
      next: (updatedKeywords: string[]) => {
        this.activity.keywords = updatedKeywords;
      },
    });
  }

  ngOnInit(): void {
    const activityId = this.activatedRoute.snapshot.paramMap.get('id');

    if (activityId) {
      this.isNewActivity = false;
      this.activity$ = this.activitiesService
        .getActivityById(activityId)
        .subscribe((activity: ActivityBestOption) => {
          console.log('input', activity);
          this.activity = this.classInitializer(activity);
          console.log('stored', this.activity);
          this.keywords = this.activity.keywords;
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

  classInitializer(activity: any): ActivityBestOption {
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

  questionResponse(questionResponse: QuestionResponse): void {
    this.UIQuestionSubject.next(questionResponse);
  }

  commonResponse(commonResponse: CommonData): void {
    this.UICommonSubject.next(commonResponse);
  }

  updateQuestionsArray(updatedQuestion: Question_ActivityBestOption): void {
    const newQuestions = [...this.questions].map((question) =>
      question.id !== updatedQuestion.id ? question : updatedQuestion
    );
    this.questions = newQuestions;
  }

  createOrUpdate(): void {
    if (!this.isNewActivity) {
      let result = this.buildActivity();
      console.log('updating activity >>> ', result);
    }
    if (this.isNewActivity) {
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
      _id: this.activity.id,
      title: this.activity.title,
      task: this.activity.task,
      language: this.activity.language,
      scores: this.activity.scores,
      author: this.activity.author,
      text: text,
      keywords: this.activity.keywords,
      font: this.activity.font,
      questions: this.questions,
      timestamps: newTimestamps,
    });
  }

  removePlaceHolders(text: string): string {
    const exp = new RegExp(
      /<strong style=\"background-color: yellow;\">PREGUNTA N\. [0-9]+<\/strong>/g
    );
    return text.replace(exp, '') || '';
  }

  removeSpeciticPlaceHolder(text: string, id: string): string {
    const exp = new RegExp(
      `<strong style=\\"background-color: yellow;\\">PREGUNTA N\\. ` +
        String(id).trim() +
        `<\\/strong>`,
      'g'
    );
    console.log('current >>> ' + text);
    console.log('updated >>> ' + text.replace(exp, ''));
    return text.replace(exp, '') || '';
  }

  questionRemoved(questionId: string): void {
    this.questions = this.questions.filter(
      (question) => question.id !== questionId
    );
  }
}
