import { Nullable } from "../../core/utils/nullable";
import { Component } from "../../core/bases/component.base";
import { defaultState, generateTemplate, State } from './if.meta';

class IfComponent extends Component<{}, State> {
  constructor() {
    super(null, defaultState)
  }

  protected afterStateChange(props: Nullable<{}>, state: State): void {
    this.setTemplate(generateTemplate(state));
  }
}

customElements.define('t3-if', IfComponent);

export { IfComponent };

