import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Option_ActivityBestOption,
  Question_ActivityBestOption,
} from '../../models/ActivityBestOption.dto';

@Component({
  selector: 'app-edit-question-best-option',
  templateUrl: './edit-question-best-option.component.html',
  styleUrls: ['./edit-question-best-option.component.sass'],
})
export class EditQuestionBestOptionComponent implements OnInit, OnChanges {
  options: Option_ActivityBestOption[];

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
      id: this.id,
      options: [],
    });
  }
  @Input() question: Question_ActivityBestOption = this.emtpyQuestion;
  @Output() questionResponse: EventEmitter<Question_ActivityBestOption> =
    new EventEmitter();

  ngOnInit(): void {
    this.setFormValues();
  }

  ngOnChanges(): void {
    this.setFormValues();
  }

  setFormValues() {
    // console.log('data received >>> ', this.question);
    this.id = this.question.id;
    // this.position.setValue(this.question.position);
    this.position = this.question.position;
    this.options = this.question.options;
  }

  save() {
    let question = { options: this.options, ...this.questionForm.value };
    console.log('here here, outgoing question >>> ', question);
    this.questionResponse.emit(question);
  }

  optionResponse(updatedOption: Option_ActivityBestOption): void {
    console.log('here here, incoming updatedOption >>> ', updatedOption);
  }
}
