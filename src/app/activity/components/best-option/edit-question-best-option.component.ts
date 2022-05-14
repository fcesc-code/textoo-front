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
import { debounce, Subject, Subscription, timer } from 'rxjs';
import {
  Option_ActivityBestOption,
  Question_ActivityBestOption,
} from '../../models/ActivityBestOption.dto';

@Component({
  selector: 'app-edit-question-best-option',
  templateUrl: './edit-question-best-option.component.html',
  styleUrls: ['./edit-question-best-option.component.sass'],
})
export class EditQuestionBestOptionComponent implements OnInit, OnDestroy {
  UISubject: Subject<Option_ActivityBestOption>;
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

    this.UISubject = new Subject<Option_ActivityBestOption>();
    this.UISubscription$ = this.UISubject.pipe(
      debounce(() => timer(750))
    ).subscribe({
      next: (updatedOption) => {
        console.log('subscription ready to send >>> ', updatedOption);
        this.updateOptionsArray(updatedOption);
        this.atLeastOneOptionIsTrue();
        this.emit();
      },
    });
  }
  @Input() question: Question_ActivityBestOption = this.emtpyQuestion;
  @Output() questionResponse: EventEmitter<Question_ActivityBestOption> =
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
      let question = {
        id: this.id,
        options: this.options,
        ...this.questionForm.value,
      };
      console.log('here here, outgoing question >>> ', question);
      this.questionResponse.emit(question);
    }
  }

  save() {
    this.emit();
  }

  optionResponse(updatedOption: Option_ActivityBestOption): void {
    this.UISubject.next(updatedOption);
  }

  updateOptionsArray(updatedOption: Option_ActivityBestOption): void {
    const newOptions = [...this.options].map((option) =>
      option.index !== updatedOption.index ? option : updatedOption
    );
    this.options = newOptions;
  }

  atLeastOneOptionIsTrue(): void {
    this.options.forEach((option) => {
      if (option.correct) this.valid = true;
    });
  }
}
