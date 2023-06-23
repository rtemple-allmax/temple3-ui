import { Nullable } from "../../core/utils/nullable.js";
import { Component } from "../../core/bases/component.base.js";
import { defaultState, generateTemplate, State } from './for.meta.js';
import { ForConfig } from "../../core/types/for.types.js";

class ForComponent extends Component<{}, State> {
  constructor() {
    super(null, defaultState);
  }

  protected afterStateChange(props: Nullable<{}>, state: State): void {
    this.setTemplate(generateTemplate(state));
  }

  public configure(config: ForConfig): void {
    this.setState('config', config);
  }
}

customElements.define('nxt-for', ForComponent);

export { ForComponent };