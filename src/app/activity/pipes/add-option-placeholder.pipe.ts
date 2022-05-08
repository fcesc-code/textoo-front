import { Pipe, PipeTransform } from '@angular/core';
import { Question_ActivityBestOption } from '../models/ActivityBestOption.dto';
import { PLACEHOLDER } from './add-option.marks';

@Pipe({
  name: 'addPlaceholderSelector',
})
export class AddPlaceholderPipe implements PipeTransform {
  transform(text: string, questions: Question_ActivityBestOption[]): string {
    const TEXT = text;

    let pointer = 0;
    let textWithQuestions = '';

    for (let question of questions) {
      const leftSlice = TEXT.slice(pointer, question.position);
      textWithQuestions = `${textWithQuestions}${leftSlice}${PLACEHOLDER.PREFIX}${question.id}${PLACEHOLDER.SUFFIX}`;
      pointer = question.position;
    }
    textWithQuestions = `${textWithQuestions}${TEXT.slice(pointer)}`;

    return textWithQuestions;
  }
}
