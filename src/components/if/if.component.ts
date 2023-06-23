import { Nullable } from "../../core/utils/nullable.js";
import { Component } from "../../core/bases/component.base.js";
import { defaultState, generateTemplate, State } from './if.meta.js';

class IfComponent extends Component<{}, State> {
  constructor() {
    super(null, defaultState)
  }

  protected afterStateChange(props: Nullable<{}>, state: State): void {
    this.setTemplate(generateTemplate(state));
  }
}

customElements.define('nxt-if', IfComponent);

export { IfComponent };

