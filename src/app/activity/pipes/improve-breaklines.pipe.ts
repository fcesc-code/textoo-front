import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'improveBreaklines',
})
export class ImproveBreaklinesPipe implements PipeTransform {
  transform(text: string): string {
    const START = '<p>';
    const END = '</p>';
    const NEW_TEXT = text.replace(/\n/g, '</p><p>');
    const RESULT = `${START}${NEW_TEXT}${END}`;

    return RESULT;
  }
}
