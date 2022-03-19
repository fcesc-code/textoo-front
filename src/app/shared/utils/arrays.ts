function findMax(array: any[], sortProperty: string): any {
  const reducer = (a: any, b: any) => {
    return a[sortProperty] >= b[sortProperty] ? a : b;
  };
  return array.reduce(reducer)[sortProperty];
}

export const CustomArrayMethods = {
  findMax,
};
