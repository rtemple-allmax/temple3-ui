import { Theme, ThemeArgs, themeBase } from './theme.types.js';

class ThemeService {
  public customize(args: ThemeArgs, addedProps: Array<{ customPropFromattedName: string, value: string }> = []) {
    const props: Theme = { ...themeBase };
    const themeKeys = Object.keys(props);
    const argKeys = Object.keys(args);
    for (const t of themeKeys) {
      for (const a of argKeys) {
        if (t) {
          const formattedT = t.replace(/-/g, "")
          const formattedA = a.toLowerCase();
          if (formattedT === formattedA) {
            // This is a hack.
            //TODO: This throws a string can be undefined error if I dont add the '' +.  
            props[t] = '' + args[a];
          }
        }
        
      }
    }
  
    for (const prop of addedProps) {
      props[prop.customPropFromattedName] = prop.value;
    }
    
    props['--vh-1'] = `${ window.innerWidth * .01 }px`;
    
    Object.keys(props).forEach(key => document.documentElement.style.setProperty(key, { ...props }[ key ]));
  }
}

export { ThemeService };