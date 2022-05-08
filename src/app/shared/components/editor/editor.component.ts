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

  editorOptions = {
    toolbar: {
      container: [
        //  [{ 'placeholder': ['[GuestName]', '[HotelName]'] }], // my custom dropdown
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        //  [{ 'direction': 'rtl' }],

        [{ size: ['small', 'normal', 'large', 'huge'] }],
        //  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }],
        //  [{ 'font': [] }],
        [{ align: [] }],
        // ['link', 'image', 'video'],
        // ['emoji'],

        ['clean'],
      ],
      // handlers: {
      //  "placeholder": function (value) {
      //      if (value) {
      //          const cursorPosition = this.quill.getSelection().index;
      //          this.quill.insertText(cursorPosition, value);
      //          this.quill.setSelection(cursorPosition + value.length);
      //      }
      //  }
      // },
    },
  };

  constructor() {
    this.focused = false;
    this.blured = false;
  }
  @Input() text = '';
  @Output() editorResponse: EventEmitter<string> = new EventEmitter();

  created(event: any) {
    event.pasteHTML(this.text);
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection) {
    this.editorResponse.emit(event['editor']['root']['innerHTML']);
  }

  focus($event: any) {
    this.focused = true;
    this.blured = false;
  }

  blur($event: any) {
    this.focused = false;
    this.blured = true;
  }
}
