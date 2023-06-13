import { ThemeArgs, themeBase } from './theme.types';

class ThemeService {
  public customize(args: ThemeArgs, addedProps: Array<{ customPropFromattedName: string, value: string }> = []) {
    const props: any = { ...themeBase };
    const themeKeys = Object.keys(themeBase);
    const argKeys = Object.keys(args);
    for (const t of themeKeys) {
      for (const a of argKeys) {
        const formattedT = t.replace(/-/g, "")
        const formattedA = a.toLowerCase();
        if (formattedT === formattedA) {
          props[t] = args[a];
        }
      }
    }
  
    for (const prop of addedProps) {
      props[prop.customPropFromattedName] = prop.value;
    }
    
    props['--vh-1'] = window.innerWidth * .01;
    
    Object.keys(props).forEach(key => document.documentElement.style.setProperty(key, { ...props }[ key ]));
  }
}

export { ThemeService };