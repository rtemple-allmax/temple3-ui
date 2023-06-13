import { Component } from "../core/bases/component.base";

class FlexComponent extends Component {
  afterInit(): void {
      this.template = '<slot></slot>';
      this.styles = `
        :host {
          height: ${ this.props.height };
        }
        slot {
          display: flex;
          height: 100%;
          justify-content: ${ this.props.justifycontent };
          align-items: ${ this.props.alignitems };
        }
      `;
  }
}

export { FlexComponent };

