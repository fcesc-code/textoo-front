import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import * as DOMPurify from 'dompurify';

@Pipe({
  name: 'sanitize',
})
export class SanitizePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(input: string): SafeHtml {
    const DIRTY_INPUT = input
      .replace(/%3c/gi, '<')
      .replace(/%3e/gi, '>')
      .replace(/<\s*script\s*>.*/gim, '<script>')
      .replace(/<\s*script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gim, '')
      .replace(/<\s*script.+/gim, '')
      .replace(/<\s*\/script\s*>/gim, '');
    const FILTERED_INPUT = DOMPurify.sanitize(DIRTY_INPUT, {
      USE_PROFILES: { html: true },
      ADD_ATTR: ['id', 'class'],
      FORBID_TAGS: ['script'],
    });
    const RESULT = this.sanitizer.bypassSecurityTrustHtml(FILTERED_INPUT);
    return RESULT;
  }
}
