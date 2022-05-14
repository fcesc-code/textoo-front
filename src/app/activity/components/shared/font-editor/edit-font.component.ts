import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Font } from '../../../models/Activity.dto';

@Component({
  selector: 'app-edit-font',
  templateUrl: './edit-font.component.html',
  styleUrls: ['./edit-font.component.sass'],
})
export class EditFontComponent implements OnInit, OnChanges {
  emptyFont: Font = {
    author: '',
    work: '',
    reference: '',
    year: 2000,
    display: false,
  };

  disabled: boolean;

  fontForm: FormGroup;
  author: FormControl;
  work: FormControl;
  reference: FormControl;
  year: FormControl;
  display: FormControl;

  constructor(private formBuilder: FormBuilder) {
    this.author = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(80),
    ]);
    this.work = new FormControl('', [
      Validators.minLength(3),
      Validators.maxLength(150),
    ]);
    this.reference = new FormControl('', [
      Validators.minLength(5),
      Validators.maxLength(150),
    ]);
    this.year = new FormControl(2000, [Validators.pattern(/^[0-9]*$/)]);
    this.display = new FormControl(false);

    this.fontForm = this.formBuilder.group({
      author: this.author,
      work: this.work,
      reference: this.reference,
      year: this.year,
      display: this.display,
    });

    this.disabled = false;
  }
  @Input() font: Font = this.emptyFont;
  @Output() fontResponse: EventEmitter<Font> = new EventEmitter();

  ngOnInit(): void {
    this.setFormValues();
  }

  ngOnChanges(): void {
    this.setFormValues();
  }

  setFormValues() {
    this.author.setValue(this.font.author);
    this.work.setValue(this.font.work);
    this.reference.setValue(this.font.reference);
    this.year.setValue(this.font.year);
    this.display.setValue(this.font.display);
    this.disabled = !this.font.display;
  }

  toggleDisplay() {
    this.disabled = !this.display.value;
  }

  emit() {
    this.fontResponse.emit(this.fontForm.value);
  }
}
