import { Component } from "../../core/bases/component.base.js";
import { State, defaultState, generateStyle, generateTemplate } from './frame.meta.js';


class FrameComponent extends Component<{}, State> {
  constructor() { super(null, defaultState); }

  protected afterInit(props: {}, state: State): void {
    this.setTemplate(generateTemplate(state));
    this.setStyle(generateStyle());
  }

  protected afterStateChange(props: {}, state: State): void {
    this.setTemplate(generateTemplate(state));
  }

  protected afterRender(): void {
    const buttons = this.root?.querySelectorAll('.bottom-menu-control');
    if (buttons) {
      for(const btn of Array.from(buttons)) {
        btn.addEventListener('click', () => this.openDrawer());
      }
    }
    const closeBtn = this.root?.querySelector('.drawer-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }
  }
  
  private openDrawer(): void {
    this.setState('drawerOpen', true)
  }

  private closeDrawer(): void {
    this.setState('drawerOpen', false)
  }
}

customElements.define('nxt-frame', FrameComponent);

export { FrameComponent };