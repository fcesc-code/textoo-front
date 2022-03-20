import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { TextSelection } from 'src/app/models/ActivitySelectText.dto';

@Pipe({
  name: 'highlightText',
})
export class HighlightTextPipe implements PipeTransform {
  transform(text: string, selections: TextSelection[]): SafeHtml {
    let pointer = 0;
    let highlightedText = '';
    const PREFIX = '<span class="bg-yellow-300">';
    const SUFFIX = '</span>';
    const PREFIX_EXP = new RegExp(PREFIX, 'gi');
    const SUFFIX_EXP = new RegExp(SUFFIX, 'gi');
    const CLEAN_TEXT = text.replace(PREFIX_EXP, '').replace(SUFFIX_EXP, '');
    for (let selection of selections) {
      const leftSlice = CLEAN_TEXT.slice(pointer, selection.start);
      const rightSlice = CLEAN_TEXT.slice(selection.start, selection.end + 1);
      highlightedText = `${highlightedText}${leftSlice}${PREFIX}${rightSlice}${SUFFIX}`;
      pointer = selection.end + 1;
    }
    const finalText = `${highlightedText}${CLEAN_TEXT.slice(pointer)}`;
    return finalText;
  }
}
