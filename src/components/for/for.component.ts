import { Nullable } from "../../core/utils/nullable.js";
import { Component } from "../../core/bases/component.base.js";
import { defaultState, generateTemplate, State } from './for.meta.js';
import { ForConfig } from "../../core/types/for.types.js";

class ForComponent extends Component<{}, State> {
  constructor() {
    super(null, defaultState);
    this.state.value$.subscribe((state: Nullable<State>) => {
      if (state) {
        this.setTemplate(generateTemplate(state));
        this.render();
      }
    });
  }
  
  public configure(config: ForConfig): void {
    this.setState({ config });
  }
}

customElements.define('nxt-for', ForComponent);

export { ForComponent };