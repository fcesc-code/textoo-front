import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  Option_ActivityBestOption,
  OptionResponse,
} from '../../models/ActivityBestOption.dto';

@Component({
  selector: 'app-edit-option-best-option',
  templateUrl: './edit-option-best-option.component.html',
  styleUrls: ['./edit-option-best-option.component.sass'],
})
export class EditOptionBestOptionComponent implements OnInit {
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
  @Output() optionResponse: EventEmitter<OptionResponse> = new EventEmitter();
  @Output() optionRemoved: EventEmitter<number> = new EventEmitter();

  ngOnInit(): void {
    this.index.setValue(this.option.index);
    this.text.setValue(this.option.text);
    this.correct.setValue(this.option.correct);
  }

  emit(optionResponse: OptionResponse): void {
    this.optionResponse.emit(optionResponse);
  }

  updatedText(): void {
    if (this.optionForm.valid && this.optionForm.dirty) {
      const updatedOption = this.buildUpdatedOption();
      this.emit({
        option: updatedOption,
        UIextraTime: true,
      });
    }
  }

  updatedValue(): void {
    if (this.optionForm.valid && this.optionForm.dirty) {
      const updatedOption = this.buildUpdatedOption();
      this.emit({
        option: updatedOption,
        UIextraTime: false,
      });
    }
  }

  buildUpdatedOption(): Option_ActivityBestOption {
    return {
      index: this.index.value,
      ...this.optionForm.value,
    };
  }

  removeOption() {
    this.optionRemoved.emit(this.index.value);
  }
}
