// base class for all components 

// import { TemplateParser } from '../parse/template-parser';
import { Nullable } from '../utils/nullable';

class Component extends HTMLElement {
  protected element: Nullable<ShadowRoot>;
  protected props: any;
  protected state: any;
  protected template: Nullable<string>;
  protected styles: Nullable<string>;
  // private path: Nullable<string>;
  // private parser: TemplateParser;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.element = this.shadowRoot;
    this.props = { height: 'auto' };
    this.state = { };
    // this.path = `dist/components/${ folderName }/${ fileName }.html`;
    // this.parser = new TemplateParser(this.path);
  }

  // Is private but cannot be renamed as it is from HTMLElement
  connectedCallback() {
    this.props = { ...this.props, ...Object.fromEntries([ ...Array.from(this.attributes) ].map(prop => [ prop.localName, prop.value ])) };
    this.afterInit();
    this._render();
  }

  // Is private but cannot be renamed as it is from HTMLElement
  disconnectedCallback() {
    this.afterDestroy();
  }

  // Lifecycle hooks that should be overriden in subclasses.
  afterInit() { }
  afterRender() { }
  afterStateChange(state: any) { }
  afterDestroy() { }
  // end Lifecycle hooks

  setState(name: string, val: any) {
    this.state = { ...this.state, [ name ]: val };
    this.afterStateChange(this.state);
    this._render();
  }
  
  async _render() {
    if (!this.template || !this.element) { return; }
    if (this.styles) {
      this.element.innerHTML = `<style>${ this.styles }</style>${ this.template }`
    } else {
      this.element.innerHTML = this.template;
    }
    // const { props, state } = this;
    // const parsed = await this.parser.parse({ props, state });
    // if (parsed?.template && parsed?.style) {
    //   this.element?.replaceChildren(parsed.template.content.cloneNode(true), parsed.style)
    // } else if (parsed?.template) {
    //   this.element?.replaceChildren(parsed.template.content.cloneNode(true));
    // }
    this.afterRender();
  }
}

export { Component };