import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friendlyTime',
})
export class FriendlyTimePipe implements PipeTransform {
  transform(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    let userFriendlyTime: string[] = [];
    if (minutes > 0)
      userFriendlyTime.push(`${minutes} minut${minutes > 1 ? 's' : ''}`);
    if (seconds > 0)
      userFriendlyTime.push(`${seconds} segon${seconds > 1 ? 's' : ''}`);
    return `${userFriendlyTime.join(' i ')}.`;
  }
}
