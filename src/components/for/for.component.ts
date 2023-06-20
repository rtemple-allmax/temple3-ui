import { Nullable } from "../../core/utils/nullable";
import { Component } from "../../core/bases/component.base";
import { defaultState, generateTemplate, State } from './for.meta';
import { ForConfig } from "../../core/types/for.types";

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

customElements.define('t3-for', ForComponent);

export { ForComponent };