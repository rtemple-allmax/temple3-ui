import { Nullable } from "../../core/utils/nullable.js";
import { Component } from "../../core/bases/component.base.js";
import { defaultProps, generateStyle, generateTemplate, Props } from './grid.meta.js';

class GridComponent extends Component<Props, {}> {
  constructor() {
    super(defaultProps, null);
    this.props.value$.subscribe((props: Nullable<Props>) => {
      if (props) {
        this.setTemplate(generateTemplate());
        this.setStyle(generateStyle(props));
        this.render();  
      }
    });
  }
}

customElements.define('nxt-grid', GridComponent);

export { GridComponent };