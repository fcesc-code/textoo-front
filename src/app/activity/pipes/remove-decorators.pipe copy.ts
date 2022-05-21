import { Pipe, PipeTransform } from '@angular/core';
import { PREFIX, SUFIX } from './highlight-text.marks';

@Pipe({
  name: 'highlightText',
})
export class HighlightTextPipe implements PipeTransform {
  transform(text: string): string {
    const PREFIX_EXP = new RegExp(PREFIX, 'gi');
    const SUFIX_EXP = new RegExp(SUFIX, 'gi');
    const CLEAN_TEXT = text.replace(PREFIX_EXP, '').replace(SUFIX_EXP, '');
    return CLEAN_TEXT;
  }
}
