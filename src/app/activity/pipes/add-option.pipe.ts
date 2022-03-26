import { Pipe, PipeTransform } from '@angular/core';
import { Question_ActivityBestOption } from 'src/app/models/ActivityBestOption.dto';
import { SELECT, OPTION } from './add-option.marks';
// import { SafeHtml } from '@angular/platform-browser';
// import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'addOptionSelector',
})
export class AddOptionPipe implements PipeTransform {
  // constructor(private sanitizer: DomSanitizer) {}
  transform(text: string, questions: Question_ActivityBestOption[]): string {
    const TEXT = text;

    let pointer = 0;
    let textWithQuestions = '';

    for (let [index, question] of questions.entries()) {
      const leftSlice = TEXT.slice(pointer, question.position);
      textWithQuestions = `${textWithQuestions}${leftSlice} ${SELECT.PREFIX.OPEN_TAG}${index}${SELECT.PREFIX.CLOSE_TAG}`;
      for (let option of question.options) {
        textWithQuestions = `${textWithQuestions}${OPTION.PREFIX.OPEN_TAG}${option.text}${OPTION.PREFIX.CLOSE_TAG}${option.text}${OPTION.SUFFIX}`;
      }
      textWithQuestions = `${textWithQuestions}${SELECT.SUFFIX}`;
      pointer = question.position;
    }
    textWithQuestions = `${textWithQuestions}${TEXT.slice(pointer)}`;

    // const RESULT = this.sanitizer.bypassSecurityTrustHtml(textWithQuestions);
    // return RESULT;
    return textWithQuestions;
  }
}
