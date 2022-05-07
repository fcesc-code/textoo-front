import { Component, Input, Output, EventEmitter } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.sass'],
})
export class EditorComponent {
  blured: boolean;
  focused: boolean;

  constructor() {
    this.focused = false;
    this.blured = false;
  }
  @Input() text = '';
  @Output() editorResponse: EventEmitter<string> = new EventEmitter();

  created(event: any) {
    console.log('editor-created', event);
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    console.log('editor-change', event);
    console.log(
      'DETAILS OF editor-change',
      event['editor']['root']['innerHTML']
    );
    this.editorResponse.emit(event['editor']['root']['innerHTML']);
  }

  focus($event: any) {
    console.log('focus', $event);
    this.focused = true;
    this.blured = false;
  }

  blur($event: any) {
    console.log('blur', $event);
    this.focused = false;
    this.blured = true;
  }
}
