import { Pipe, PipeTransform } from '@angular/core';
import { LANGUAGES } from 'src/app/shared/constants/globals';

@Pipe({
  name: 'getLanguage',
})
export class GetLanguagePipe implements PipeTransform {
  transform(language: string): string {
    const shortName = language.toUpperCase().trim();
    const longName =
      LANGUAGES.find((lang) => lang.short === shortName)?.long || language;
    return String(longName);
  }
}
