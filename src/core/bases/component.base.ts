// base class for all components 

import { hyphensToCamelCase } from '../utils/hyphens-to-camel-case';
import { Nullable } from '../utils/nullable';

class Component<T1 extends {}, T2 extends {}> extends HTMLElement {
  private element: Nullable<ShadowRoot>;
  private props: Nullable<T1>;
  private state: Nullable<T2>;
  private template: Nullable<string>;
  private styles: Nullable<string>;

  protected get root(): Nullable<ShadowRoot> {
    return this.element;
  }

  public get currentProps(): Nullable<T1> {
    return this.props;
  }

  public get currentState(): Nullable<T2> {
    return this.state;
  }

  constructor(props: Nullable<T1>, state: Nullable<T2>) {
    super();
    this.attachShadow({ mode: 'open' });
    this.element = this.shadowRoot;
    this.props = props;
    this.state = state;
  }

  private connectedCallback() {
    this.props = {
      ...(this.props || {}),
      ...Object.fromEntries([ ...Array.from(this.attributes) ]
      .map(prop => [ hyphensToCamelCase(prop.localName), prop.value ]))
    } as T1;
    this.afterInit(this.props, this.state);
    this._render();
  }

  private disconnectedCallback() {
    this.afterDestroy();
  }

  protected afterInit(props: T1, state: Nullable<T2>) { }
  protected afterRender() { }
  protected afterStateChange(props: Nullable<T1>, state: T2) { }
  protected afterDestroy() { }

  public setTemplate(template: string) {
    this.template = template;
  }

  public setStyle(styles: string) {
    this.styles = styles;
  }

  public setState(name: string, val: any) {
    this.state = { ...(this.state || {}), [ name ]: val } as T2;
    this.afterStateChange(this.props, this.state);
    this._render();
  }

  protected replaceState(state: T2): void {
    this.state = state;
    this.afterStateChange(this.props, this.state);
    this._render();
  }
  
  private async _render() {
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
}

export { Component };