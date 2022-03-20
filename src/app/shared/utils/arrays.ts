function findMax(array: any[], sortProperty: string): any {
  const reducer = (a: any, b: any) => {
    return a[sortProperty] >= b[sortProperty] ? a : b;
  };
  return array.reduce(reducer)[sortProperty];
}

function arraySort(array: any[], sortProperty: string): any[] {
  if (array.length < 2) {
    return array;
  }

  const result = [...array].sort((a, b) => a[sortProperty] - b[sortProperty]);

  return result;
}

export const CustomArrayMethods = {
  findMax,
  arraySort,
};
