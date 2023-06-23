import { Component } from "../../core/bases/component.base.js";
import { defaultProps, generateStyle, generateTemplate, Props } from './flex.meta.js';


class FlexComponent extends Component<Props, {}> {
  constructor() {
    super(defaultProps, null);
  }
  afterInit(props: Props, state: {}): void {
    this.setTemplate(generateTemplate());
    this.setStyle(generateStyle(props));
  }
}

customElements.define('nxt-flex', FlexComponent);

export { FlexComponent };
