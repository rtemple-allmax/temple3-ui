interface Theme {
  [key: string]: string;
  '--bg': string;
  '--space-xl': string;
  '--space-lg': string;
  '--space-md': string;
  '--space-sm': string;
  '--shadow': string;
  '--scrollbar-thumb-color': string;
  '--scrollbar-base-color': string;
  '--border': string;
  '--color': string;
  '--app-color': string;
  '--app-color-text-color': string;
  '--light-bg-color': string;
  '--muted-bg-color': string;
  '--muted-fg-color': string;
  '--dark-bg-color': string;
  '--transition': string;
  '--vh-1': string;
  '--breakpoint-md': string;
  '--breakpoint-sm': string;
  '--table-header-bg-color': string;
  '--table-header-fg-color': string;
  '--font-family': string;
}

const themeBase: Theme = {
  '--bg': 'transparent',
  '--space-xl': '2rem',
  '--space-lg': '1rem',
  '--space-md': '.5rem',
  '--space-sm': '.25rem',
  '--shadow': '0 3px 6px rgba(39, 39, 39, 0.16), 0 3px 6px rgba(39, 39, 39, 0.16)',
  '--scrollbar-thumb-color': 'gray',
  '--scrollbar-base-color': '#bbb',
  '--border': '1px solid transparent',
  '--color': 'black',
  '--app-color': 'white',
  '--app-color-text-color': 'black',
  '--light-bg-color': 'white',
  '--muted-bg-color': '#eee8e8',
  '--muted-fg-color': '#b7b1b1',
  '--dark-bg-color': '#acabac',
  '--transition': '.3s all ease-in-out',
  '--vh-1': '1vh',
  '--breakpoint-md': '1000px',
  '--breakpoint-sm': '600px',
  '--table-header-bg-color': 'black',
  '--table-header-fg-color': 'white',
  '--font-family': `'Roboto', sans-serif`
};

interface ThemeArgs {
  [key: string]: string | undefined;
  bg?: string;
  spaceSm?: string;
  spaceMd?: string;
  spaceLg?: string;
  spaceXl?: string;
  shadow?: string;
  scrollbarThumbColor?: string;
  scrollbarBaseColor?: string;
  border?: string;
  color?: string;
  appColor?: string;
  appColorTextColor?: string;
  lightBgColor?: string;
  mutedBgColor?: string;
  mutedFgColor?: string;
  darkBgColor?: string;
  transition?: string;
  vh1?: string;
  breakpointMd?: string;
  breakpointSm?: string;
  tableHeaderBgColor?: string;
  tableHeaderFgColor?: string;
  fontFamily?: string;
}

export { Theme, ThemeArgs, themeBase };