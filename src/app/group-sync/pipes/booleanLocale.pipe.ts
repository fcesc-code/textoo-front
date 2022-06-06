import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanLocale',
})
export class BooleanLocalePipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'si' : 'no';
  }
}
