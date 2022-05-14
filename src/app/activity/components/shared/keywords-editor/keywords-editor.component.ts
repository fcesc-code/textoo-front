import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-keywords-editor-option',
  templateUrl: './keywords-editor.component.html',
  styleUrls: ['./keywords-editor.component.sass'],
})
export class KeywordsEditorComponent implements OnInit {
  keywordsForm: FormGroup;
  newKeyword: FormControl;

  constructor(private formBuilder: FormBuilder) {
    this.newKeyword = new FormControl('', [Validators.pattern(/\p{L}+/u)]);

    this.keywordsForm = this.formBuilder.group({
      newKeyword: this.newKeyword,
    });
  }
  @Input() keywords: string[] = [];
  @Output() keywordsEditorResponse: EventEmitter<string[]> = new EventEmitter();

  ngOnInit(): void {
    console.log('hi worlds');
  }

  emit(): void {
    if (this.keywordsForm.valid && this.keywordsForm.dirty) {
      const updatedOption = {
        ...this.keywordsForm.value,
      };
      this.keywordsEditorResponse.emit(updatedOption);
    }
  }

  save() {
    this.emit();
  }
}
