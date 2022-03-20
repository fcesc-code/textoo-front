import { CustomArrayMethods } from './arrays';
export function arraySort(array: any[], sortProperty: string): any[] {
  if (array.length < 2) {
    return array;
  }

  const maxValueInArray = CustomArrayMethods.findMax(array, sortProperty);
  const maxDigits = maxValueInArray.toString().length;

  function findReverseDigit(number: number, digit: number): number {
    return Math.floor(number / Math.pow(10, digit)) % 10;
  }

  for (let i = 0; i < maxDigits; i++) {
    let digitGroups = Array(10).fill([]);

    for (let j = 0; j < array.length; j++) {
      let num = findReverseDigit(array[j][sortProperty], i);

      if (num !== undefined) digitGroups[num].push(array[j]);
    }
    array = digitGroups.flat();
  }

  return array;
}
