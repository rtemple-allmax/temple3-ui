export const hyphensToCamelCase = (str: string): string => str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
