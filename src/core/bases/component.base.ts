// base class for all components 
import { ObservableProperty } from '../types/observable-property.type.js';
import { hyphensToCamelCase } from '../utils/hyphens-to-camel-case.js';
import { Nullable } from '../utils/nullable.js';

class Component<T1 extends {}, T2 extends {}> extends HTMLElement {
  private element: Nullable<ShadowRoot>;
  private template: Nullable<string>;
  private styles: Nullable<string>;

  protected props: ObservableProperty<T1> = new ObservableProperty<T1>(null);
  protected state: ObservableProperty<T2> = new ObservableProperty<T2>(null);

  protected previousProps: Nullable<T1> = null;
  protected previousState: Nullable<T2> = null;
  
  protected get root(): Nullable<ShadowRoot> {
    return this.element;
  }
  
  constructor(props: Nullable<T1>, state: Nullable<T2>) {
    super();
    this.attachShadow({ mode: 'open' });
    this.element = this.shadowRoot;
    this.props.value = props;
    this.state.value = state;
  }

  private connectedCallback() {
    this.beforeInit();
    const attributes: any[] = [];
    const attrs = [ ...Array.from(this.attributes) ];
    attrs.forEach(x => {
      let record:any = { }
      if (x.localName.startsWith('data-')) {
        record.name = x.localName.substring(5);
        record.value = JSON.parse(x.value);
      } else {
        record.name = x.localName;
        record.value = x.value;
      }
      attributes.push(record);
    })
    
    
    this.props.value = {
      ...(this.props.value || {}),
      ...Object.fromEntries(attributes.map(prop => [ hyphensToCamelCase(prop.name), prop.value ]))
    } as T1;


  }

  private disconnectedCallback() {
    this.afterDestroy();
  }

  protected beforeInit() { }
  protected afterRender() { }
  protected afterDestroy() { }
  
  protected async render() {
    if (this.template === null ||
      this.template === undefined ||
      this.element === null ||
      this.element === undefined) { return; }
    if (this.styles) {
      this.element.innerHTML = `<style>${ this.styles }</style>${ this.template }`
    } else {
      this.element.innerHTML = this.template;
    }
    this.afterRender();
  }

  public setTemplate(template: string) {
    this.template = template;
  }

  public setStyle(styles: string) {
    this.styles = styles;
  }
  
  public setState(state: any): void {
    this.state.value = { ...(this.state.value || {}), ...state } as T2;
  }
}

export { Component };