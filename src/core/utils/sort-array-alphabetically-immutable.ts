export const sortArrayAlphabeticallyImmutable = (arr: any[], propName: string): any[] => arr.slice().sort((a, b) => (a[propName] as string).toLowerCase().localeCompare((b[propName] as string).toLowerCase()));