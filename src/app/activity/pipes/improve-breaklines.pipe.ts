import { Pipe, PipeTransform } from '@angular/core';
import { PREFIX, SUFIX } from './highlight-text.marks';

@Pipe({
  name: 'improveBreaklines',
})
export class ImproveBreaklinesPipe implements PipeTransform {
  transform(text: string): string {
    const START_PRE = `<p id="activitySecondaryText-`;
    const START_POST = `">`;
    const END = '</p>';
    const LINE_BREAK = new RegExp(/\n/g);
    let count = 0;
    let previous = 0;
    let result = `${START_PRE}${count}${START_POST}`;
    // const NEW_TEXT = text.replace(/\n/g, `${END}${START}`);
    // const RESULT = `${START}${NEW_TEXT}${END}`;

    const matches = Array.from(text.matchAll(LINE_BREAK));
    for (let match of matches) {
      count++;
      const index = match.index || 0;
      const newString = text.slice(previous, index).trimStart();
      previous = Number(match.index);
      let { conditionalPrefix, conditionalSufix } = this.detectOpenTags(
        result,
        newString
      );

      const display = {
        _1_currentResult: result,
        _2_newString: newString,
        _3_end: END,
        _4_conditionalSufix: conditionalSufix,
        _5_start_pre: START_PRE,
        _6_count: count,
        _7_start_post: START_POST,
        _8_conditionalPrefix: conditionalPrefix,
      };
      // console.table(display);

      result = `${result}${newString}${conditionalSufix}${END}${START_PRE}${count}${START_POST}${conditionalPrefix}`;
    }
    const finalString = text.slice(previous + 1, text.length);
    result = `${result}${finalString}${END}`;
    return result;
  }

  detectOpenTags(previousString: string, newString: string) {
    let conditionalPrefix = '';
    let conditionalSufix = '';

    const PREFIX_HIGHLIGHTED_EXP = new RegExp(PREFIX, 'g');
    const SUFIX_HIGHLIGHTED_EXP = new RegExp(SUFIX, 'g');

    const combinedString = `${previousString}${newString}`;
    const matchesPrefix = Array.from(
      combinedString.matchAll(PREFIX_HIGHLIGHTED_EXP)
    );
    const lastPrefixMatch = matchesPrefix[matchesPrefix.length - 1]?.index || 0;
    const matchesSufix = Array.from(
      combinedString.matchAll(SUFIX_HIGHLIGHTED_EXP)
    );
    const lastSufixMatch = matchesSufix[matchesSufix.length - 1]?.index || 0;

    if (lastPrefixMatch && !lastSufixMatch) {
      // està obert però no tancat, cal tancar abans d'afegir el break
      conditionalSufix = SUFIX;
      conditionalPrefix = PREFIX;
    }

    if (lastPrefixMatch && lastSufixMatch && lastPrefixMatch > lastSufixMatch) {
      // està obert però no tancat, cal tancar abans d'afegir el break
      conditionalSufix = SUFIX;
      conditionalPrefix = PREFIX;
    }

    return {
      conditionalPrefix,
      conditionalSufix,
    };
  }
}
