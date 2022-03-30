import { CustomArrayMethods } from './arrays';

describe('ActivitiesService', () => {
  let TITLE = 'utils - custom array methods';

  it(`${TITLE} 1 > shoud find the max of a given property in an array of objects`, () => {
    const EXPECTED = { name: 'Jack', age: 40 };
    const TEST = [
      { name: 'John', age: 20 },
      { name: 'Jane', age: 30 },
      EXPECTED,
    ];

    const RESULT = CustomArrayMethods.findMax(TEST, 'age');

    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 2 > shoud sort an array of objects for a given property`, () => {
    const TEST = [
      { name: 'Jack', age: 40 },
      { name: 'John', age: 20 },
      { name: 'Jane', age: 30 },
      { name: 'Jim', age: 15 },
    ];
    const EXPECTED = [
      { name: 'Jim', age: 15 },
      { name: 'John', age: 20 },
      { name: 'Jane', age: 30 },
      { name: 'Jack', age: 40 },
    ];

    const RESULT = CustomArrayMethods.arraySort(TEST, 'age');

    expect(RESULT).toEqual(EXPECTED);
  });

  it(`${TITLE} 3 > shoud return the same array if it has a length of 1 without running the method`, () => {
    const TEST = [{ name: 'Jack', age: 40 }];
    const EXPECTED = [{ name: 'Jack', age: 40 }];

    const RESULT = CustomArrayMethods.arraySort(TEST, 'age');

    expect(RESULT).toEqual(EXPECTED);
  });
});
