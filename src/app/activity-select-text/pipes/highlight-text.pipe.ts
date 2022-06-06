import { Pipe, PipeTransform } from '@angular/core';
import { TextSelection } from '../models/ActivitySelectText.dto';
import { PREFIX, SUFIX } from './highlight-text.marks';

@Pipe({
  name: 'highlightText',
})
export class HighlightTextPipe implements PipeTransform {
  transform(text: string, selections: TextSelection[]): string {
    const CLEAN_TEXT = this.removeDecorators(text);
    let pointer = 0;
    let highlightedText = '';
    for (let selection of selections) {
      const leftSlice = CLEAN_TEXT.slice(pointer, selection.start);
      const rightSlice = CLEAN_TEXT.slice(selection.start, selection.end + 1);
      highlightedText = `${highlightedText}${leftSlice}${PREFIX}${rightSlice}${SUFIX}`;
      pointer = selection.end + 1;
    }
    return `${highlightedText}${CLEAN_TEXT.slice(pointer)}`;
  }

  removeDecorators(text: string): string {
    const PREFIX_EXP = new RegExp(PREFIX, 'gi');
    const SUFFIX_EXP = new RegExp(SUFIX, 'gi');
    return text.replace(PREFIX_EXP, '').replace(SUFFIX_EXP, '');
  }
}
