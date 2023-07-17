export const isNullOrEmpty = (val: any, allowZero: boolean = true): boolean => {
  if (val === null || val === undefined) {
    return true;
  }

  if (typeof val === 'string') {
    return val.trim().length === 0;
  }

  if (typeof val === 'number') {
    if (allowZero) {
      return isNaN(val);
    } else {
      return isNaN(val) || val === 0;
    }
  }

  if (val instanceof Date) {
    return isNaN(val.getTime());
  }

  if (val instanceof Array) {
    return val.length === 0;
  }

  if (typeof val === 'object') {
    return Object.keys(val).length === 0;
  }

  return false;
};