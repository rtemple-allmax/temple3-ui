const sortArrayByStringValueImmutable = (arr: any[], propName: string, desc: boolean = false): any[] => {
  console.log('args', { arr, propName, desc })
  let result: any[] = [];

  if (arr.length > 0) {
    if (desc) {
      result = arr.slice().sort((a, b) => (b[propName] as string).toLowerCase().localeCompare((a[propName] as string).toLowerCase()));
    } else {
      result = arr.slice().sort((a, b) => (a[propName] as string).toLowerCase().localeCompare((b[propName] as string).toLowerCase()));
    }
  }

  return result;
}

export {
  sortArrayByStringValueImmutable
}; 