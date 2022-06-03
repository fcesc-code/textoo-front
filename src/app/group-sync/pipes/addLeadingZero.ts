import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addLeadingZero',
})
export class AddLeadingZeroPipe implements PipeTransform {
  transform(value: number): string {
    return value < 1 ? '--' : value < 10 ? `0${value}` : String(value);
  }
}
