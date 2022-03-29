import { Pipe, PipeTransform } from '@angular/core';
import { Question_ActivityBestOption } from 'src/app/models/ActivityBestOption.dto';
import { SELECT, OPTION, QUESTION } from './add-option.marks';

@Pipe({
  name: 'addOptionSelector',
})
export class AddOptionPipe implements PipeTransform {
  transform(text: string, questions: Question_ActivityBestOption[]): string {
    const TEXT = text;

    let pointer = 0;
    let textWithQuestions = '';

    for (let question of questions) {
      const leftSlice = TEXT.slice(pointer, question.position);
      textWithQuestions = `${textWithQuestions}${leftSlice} ${QUESTION.PREFIX}${question.id}${QUESTION.SUFFIX} ${SELECT.PREFIX.OPEN_TAG}${question.id}${SELECT.PREFIX.CLOSE_TAG}`;
      for (let option of question.options) {
        textWithQuestions = `${textWithQuestions}${OPTION.PREFIX.OPEN_TAG}${option.text}${OPTION.PREFIX.CLOSE_TAG}${option.text}${OPTION.SUFFIX}`;
      }
      textWithQuestions = `${textWithQuestions}${SELECT.SUFFIX}`;
      pointer = question.position;
    }
    textWithQuestions = `${textWithQuestions}${TEXT.slice(pointer)}`;

    return textWithQuestions;
  }
}
