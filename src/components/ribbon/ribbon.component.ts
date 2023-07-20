import { RibbonConfig } from "../../core/types/ribbon.types.js";
import { Component } from "../../core/bases/component.base.js";
import { defaultState, generateStyle, generateTemplate, State } from './ribbon.meta.js';
import { Nullable } from "../../core/utils/nullable.js";

class RibbonComponent extends Component<{}, State> {
  constructor() {
    super(null, defaultState);
    this.state.value$.subscribe((state: Nullable<State>) => {
      if (state) {
        this.setTemplate(generateTemplate(state));
        this.setStyle(generateStyle(state.config));
        this.render();
      }
    });
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
    this.setState({ config });
  }

  private switchTabs(index: number) {
    const altered = { ...this.state?.value?.config };
    if (altered?.tabs) {
      for(const [i, tab] of altered.tabs.entries()) {
        tab.active = i === index;
      }
      this.setState({ config: altered });
    }
  }
}

customElements.define('nxt-ribbon', RibbonComponent);

export { RibbonComponent };