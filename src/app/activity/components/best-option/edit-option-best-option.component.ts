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
import { Option_ActivityBestOption } from '../../models/ActivityBestOption.dto';

@Component({
  selector: 'app-edit-option-best-option',
  templateUrl: './edit-option-best-option.component.html',
  styleUrls: ['./edit-option-best-option.component.sass'],
})
export class EditOptionBestOptionComponent implements OnInit, OnChanges {
  emptyOption: Option_ActivityBestOption = {
    text: '',
    correct: false,
    index: 1,
  };

  optionForm: FormGroup;
  index: FormControl;
  correct: FormControl;
  text: FormControl;

  constructor(private formBuilder: FormBuilder) {
    this.option = this.emptyOption;

    this.text = new FormControl('', [Validators.required]);
    this.correct = new FormControl(false, [Validators.required]);
    this.index = new FormControl({ value: 0, disabled: true });

    this.optionForm = this.formBuilder.group({
      text: this.text,
      correct: this.correct,
      index: this.index,
    });
  }
  @Input() option: Option_ActivityBestOption = this.emptyOption;
  @Output() optionResponse: EventEmitter<Option_ActivityBestOption> =
    new EventEmitter();

  ngOnInit(): void {
    this.setFormValues();
  }

  ngOnChanges(): void {
    this.setFormValues();
  }

  setFormValues() {
    // console.log('data received >>> ', this.option);
    this.index.setValue(this.option.index);
    this.text.setValue(this.option.text);
    this.correct.setValue(this.option.correct);
  }

  save() {
    this.optionResponse.emit(this.optionForm.value);
  }
}
