import { Component } from "../../core/bases/component.base.js";
import { defaultProps, generateStyle, generateTemplate, Props } from './grid.meta.js';

class GridComponent extends Component<Props, {}> {
  constructor() {
    super(defaultProps, null);
  }

  afterInit(props: Props, state: {}): void {
    this.setTemplate(generateTemplate());
    this.setStyle(generateStyle(props));
  } 
}

customElements.define('nxt-grid', GridComponent);

export { GridComponent };