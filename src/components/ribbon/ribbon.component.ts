import { RibbonConfig } from "../../core/types/ribbon.types";
import { Component } from "../../core/bases/component.base";
import { defaultState, generateStyle, generateTemplate, State } from './ribbon.meta';

class RibbonComponent extends Component<{}, State> {
  constructor() {
    super(null, defaultState);
  }
  protected afterInit(props: {}, state: State): void {
    this.setStyle(generateStyle());
  }

  protected afterStateChange (props: {}, state: State): void {
    this.setTemplate(generateTemplate(state));
  }

  protected afterRender(): void {
    const btns = this.root?.querySelectorAll('.tab-btn');
    if (btns) {
      for(const [ i, b ] of Array.from(btns).entries()) {
        b.addEventListener('click', () => this.switchTabs(i))
      }
    }
  }

  public configure(config: RibbonConfig) {
    this.setState('config', config);
  }

  private switchTabs(index: number) {
    const altered = { ...this.currentState?.config };
    if (altered?.tabs) {
      for(const [i, tab] of altered.tabs.entries()) {
        tab.active = i === index;
      }
      this.setState('config', altered);
    }
  }
}

customElements.define('t3-ribbon', RibbonComponent);

export { RibbonComponent };