import { Component } from "../core/bases/component.base";

class FlexComponent extends Component {
  afterInit(): void {
      this.template = '<slot></slot>';
      this.styles = `
        :host {
          height: ${ this.currentProps.height };
        }
        slot {
          display: flex;
          height: 100%;
          justify-content: ${ this.currentProps.justifycontent };
          align-items: ${ this.currentProps.alignitems };
        }
      `;
  }
}

export { FlexComponent };

