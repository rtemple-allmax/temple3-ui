import { Nullable } from "../../core/utils/nullable.js";
import { Component } from "../../core/bases/component.base.js";
import { defaultState, generateTemplate, State } from './if.meta.js';

class IfComponent extends Component<{}, State> {
  constructor() {
    super(null, defaultState)
    this.state.value$.subscribe((state: Nullable<State>) => {
      if (state) {
        this.setTemplate(generateTemplate(state));
        this.render();
      }
    });
  }

  public visible(state: boolean): void {
    this.setState({ render:  state });
  }
}

customElements.define('nxt-if', IfComponent);

export { IfComponent };

