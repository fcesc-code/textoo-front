import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { debounce, map, Subject, Subscription, tap, timer } from 'rxjs';
import {
  Option_ActivityBestOption,
  Question_ActivityBestOption,
  OptionResponse,
  QuestionResponse,
} from '../../../activity-best-option/models/ActivityBestOption.dto';

@Component({
  selector: 'app-edit-question-best-option',
  templateUrl: './edit-question-best-option.component.html',
  styleUrls: ['./edit-question-best-option.component.sass'],
})
export class EditQuestionBestOptionComponent implements OnInit, OnDestroy {
  UISubject: Subject<OptionResponse>;
  UISubscription$: Subscription;
  options: Option_ActivityBestOption[];
  valid: boolean;

  emtpyQuestion: Question_ActivityBestOption = {
    id: '',
    position: 0,
    options: [],
  };

  questionForm: FormGroup;
  id: string;
  // position: FormControl;
  position: number;

  constructor(private formBuilder: FormBuilder) {
    this.question = this.emtpyQuestion;
    this.options = [];
    // this.position = new FormControl({ value: 0, disabled: true });
    this.position = 0;
    this.id = '0';

    this.questionForm = this.formBuilder.group({
      position: this.position,
    });

    this.valid = false;

    this.UISubject = new Subject<OptionResponse>();
    this.UISubscription$ = this.UISubject.pipe(
      debounce((response) => (response.UIextraTime ? timer(750) : timer(0))),
      map((response) => response.option)
    ).subscribe({
      next: (updatedOption) => {
        this.updateOptionsArray(updatedOption);
        this.atLeastOneOptionIsTrue();
        this.emit();
      },
    });
  }
  @Input() question: Question_ActivityBestOption = this.emtpyQuestion;
  @Output() questionResponse: EventEmitter<QuestionResponse> =
    new EventEmitter();

  ngOnInit(): void {
    this.id = this.question.id;
    this.position = this.question.position;
    this.options = this.question.options;
    this.atLeastOneOptionIsTrue();
  }

  ngOnDestroy(): void {
    this.UISubscription$.unsubscribe();
  }

  emit(): void {
    if (this.questionForm.valid && this.valid) {
      this.questionResponse.emit({
        question: this.questionBuilder(),
        deleted: false,
      });
    }
  }

  questionBuilder(): Question_ActivityBestOption {
    return {
      id: this.id,
      options: this.options,
      ...this.questionForm.value,
    };
  }

  save() {
    this.emit();
  }

  optionResponse(updatedOption: OptionResponse): void {
    this.UISubject.next(updatedOption);
  }

  updateOptionsArray(updatedOption: Option_ActivityBestOption): void {
    const newOptions = [...this.options].map((option) =>
      option.index !== updatedOption.index ? option : updatedOption
    );
    this.options = newOptions;
  }

  optionRemoved(index: number): void {
    const newOptions = [...this.options].filter(
      (option) => option.index !== index
    );
    this.options = newOptions;
  }

  addOption(): void {
    const newOption: Option_ActivityBestOption = {
      index: this.options.length + 1,
      text: '',
      correct: false,
    };
    this.options.push(newOption);
  }

  removeQuestion(): void {
    this.questionResponse.emit({
      question: this.questionBuilder(),
      deleted: true,
    });
  }

  atLeastOneOptionIsTrue(): void {
    this.options.forEach((option) => {
      if (option.correct) this.valid = true;
    });
  }
}
