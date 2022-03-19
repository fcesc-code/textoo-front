import { Pipe, PipeTransform } from '@angular/core';
import { TextSelection } from 'src/app/models/ActivitySelectText.dto';

@Pipe({
  name: 'highlightText',
})
export class HighlightTextPipe implements PipeTransform {
  transform(text: string, selections: TextSelection[]): string {
    let pointer = 0;
    let highlightedText = '';
    const PREFIX = '<span class="highlighted">';
    const SUFFIX = '</span>';
    for (let selection of selections) {
      const leftSlice = text.slice(pointer, selection.start);
      const rightSlice = text.slice(selection.start, selection.end);
      highlightedText = `${highlightedText}${leftSlice}${PREFIX}${rightSlice}${SUFFIX}`;
      pointer = selection.end;
    }
    return highlightedText + text.slice(pointer);
  }
}
