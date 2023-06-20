import { Component } from "../../core/bases/component.base";
import { defaultProps, generateStyle, generateTemplate, Props } from './grid.meta';

class GridComponent extends Component<Props, {}> {
  constructor() {
    super(defaultProps, null);
  }

  afterInit(props: Props, state: {}): void {
    this.setTemplate(generateTemplate());
    this.setStyle(generateStyle(props));
  } 
}

customElements.define('t3-grid', GridComponent);

export { GridComponent };