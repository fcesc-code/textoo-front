import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { TextSelection } from '../models/ActivitySelectText.dto';
import { PREFIX, SUFIX } from './highlight-text.marks';

@Pipe({
  name: 'highlightText',
})
export class HighlightTextPipe implements PipeTransform {
  transform(text: string, selections: TextSelection[]): string {
    const CLEAN_TEXT = this.removeDecorators(text);
    // console.log('here here in HIGHLIGHT PIPE >>>', selections);
    let pointer = 0;
    let highlightedText = '';
    for (let selection of selections) {
      const leftSlice = CLEAN_TEXT.slice(pointer, selection.start);
      const rightSlice = CLEAN_TEXT.slice(selection.start, selection.end + 1);
      // console.log('PIPE (L,R) >>>', leftSlice, rightSlice);
      highlightedText = `${highlightedText}${leftSlice}${PREFIX}${rightSlice}${SUFIX}`;
      pointer = selection.end + 1;
    }
    const finalText = `${highlightedText}${CLEAN_TEXT.slice(pointer)}`;
    // console.log('finalText >>>', finalText);
    return finalText;
  }

  removeDecorators(text: string): string {
    const PREFIX_EXP = new RegExp(PREFIX, 'gi');
    const SUFFIX_EXP = new RegExp(SUFIX, 'gi');
    const CLEAN_TEXT = text.replace(PREFIX_EXP, '').replace(SUFFIX_EXP, '');
    return CLEAN_TEXT;
  }
}
