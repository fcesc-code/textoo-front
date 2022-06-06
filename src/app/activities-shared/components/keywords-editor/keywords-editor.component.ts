import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-keywords-editor',
  templateUrl: './keywords-editor.component.html',
  styleUrls: ['./keywords-editor.component.sass'],
})
export class KeywordsEditorComponent {
  keywordsForm: FormGroup;
  newKeyword: FormControl;

  constructor(private formBuilder: FormBuilder) {
    this.newKeyword = new FormControl('', [Validators.pattern(/\p{L}+/u)]);

    this.keywordsForm = this.formBuilder.group({
      newKeyword: this.newKeyword,
    });
  }
  @Input() keywords: string[] = [];
  @Output() keywordsResponse: EventEmitter<string[]> = new EventEmitter();

  emit(): void {
    this.keywordsResponse.emit(this.keywords);
  }

  save() {
    this.emit();
  }

  addKeyword() {
    if (this.newKeyword.valid && this.newKeyword.dirty) {
      if (!this.keywords.includes(this.newKeyword.value)) {
        this.keywords.push(this.newKeyword.value);
      }
      this.newKeyword.reset();
    }
    this.emit();
  }

  removeKeyword(keyword: string) {
    this.keywords = this.keywords.filter((k) => k !== keyword);
    this.emit();
  }
}
