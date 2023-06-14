// base class for all components 

import { Nullable } from '../utils/nullable';

class Component extends HTMLElement {
  private element: Nullable<ShadowRoot>;
  private props: any = {};
  private state: any = {};
  protected template: Nullable<string>;
  protected styles: Nullable<string>;
  protected classes = '';

  protected get root(): Nullable<ShadowRoot> {
    return this.element;
  }

  protected get currentProps(): any {
    return this.props;
  }

  protected get currentState(): any {
    return this.state;
  }

  constructor(state: any = null) {
    super();
    this.attachShadow({ mode: 'open' });
    this.element = this.shadowRoot;
    if (state) {
      this.state = state;
    }
  }

  private connectedCallback() {
    this.props = { ...this.props, ...Object.fromEntries([ ...Array.from(this.attributes) ].map(prop => [ prop.localName, prop.value ])) };
    this.afterInit();
    this._render();
  }

  private disconnectedCallback() {
    this.afterDestroy();
  }

  protected afterInit() { }
  protected afterRender() { }
  protected afterStateChange(state: any) { }
  protected afterDestroy() { }

  public setState(name: string, val: any) {
    this.state = { ...this.state, [ name ]: val };
    this.afterStateChange(this.state);
    this._render();
  }
  
  private async _render() {
    if (!this.template || !this.element) { return; }
    if (this.styles) {
      this.element.innerHTML = `<style>${ this.styles }</style>${ this.template }`
    } else {
      this.element.innerHTML = this.template;
    }
    this.afterRender();
  }
}

export { Component };