import { CustomArrayMethods } from 'src/app/shared/utils/arrays';
import { TextSelection } from '../../models/ActivitySelectText.dto';

export function addSelection(
  newSelection: TextSelection,
  currentSelection: TextSelection[]
): TextSelection[] {
  return [...currentSelection, newSelection];
}

export function orderSelectionArray(
  unorderedArray: TextSelection[]
): TextSelection[] {
  return CustomArrayMethods.arraySort(unorderedArray, 'start');
}

export function removeSubsets(arr: TextSelection[]): TextSelection[] {
  const subsets: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (j === i) {
      } else {
        let first = arr[i].start < arr[j].start ? arr[i] : arr[j];
        let last = arr[i].start < arr[j].start ? arr[j] : arr[i];
        let index = arr[i].start < arr[j].start ? j : i;
        if (first.start <= last.start && last.end <= first.end) {
          if (!subsets.includes(index)) subsets.push(index);
        }
      }
    }
  }
  subsets.sort();
  return arr.filter((e, i) => !subsets.includes(i));
}

export function mergeAdjacents(arr: TextSelection[]): TextSelection[] {
  if (arr.length === 1) return arr;
  const results: TextSelection[] = [];
  let skip = false;
  for (let i = 0; i < arr.length - 1; i++) {
    let first = arr[i];
    let next = arr[i + 1];
    if (skip) {
      skip = false;
      if (i === arr.length - 2) results.push(next);
      continue;
    }
    if (first.end + 1 === next.start) {
      const merged: TextSelection = {
        start: first.start,
        end: next.end,
        selected: `${first.selected}${next.selected}`,
      };
      results.push(merged);
      skip = true;
    } else {
      results.push(first);
      if (i === arr.length - 2) results.push(next);
    }
  }
  return results;
}
