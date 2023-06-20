import { Nullable } from "../../core/utils/nullable";
import { Component } from "../../core/bases/component.base";
import { defaultProps, generateStyle, generateTemplate, Props } from './scroll.meta';


class ScrollComponent extends Component<Props, {}> {
  scroller: Nullable<HTMLElement>;

  scrolled = new Event('scrolled', { bubbles: true, cancelable: false });
  reachedBottom = new Event('reachedBottom', { bubbles: true, cancelable: false });
  
  constructor() {
    super(defaultProps, null);
  }

  afterInit(props: Props, state: {}): void {
    this.setTemplate(generateTemplate());
    this.setStyle(generateStyle(props));
  }

  afterRender() {
    this.scroller = this.root?.querySelector('.scroll-container');
    this.scroller?.addEventListener('scroll', () => this.scrollHandler());
  }

  afterDestroy() {
    this.scroller?.removeEventListener('scroll', () => this.scrollHandler());
  }

  scrollHandler() {
    this.dispatchEvent(this.scrolled);
    if (this.scroller) {
      if (this.scroller.scrollTop + this.scroller.clientHeight >= this.scroller.scrollHeight) {
        this.dispatchEvent(this.reachedBottom);
      }
    }
  }
}

customElements.define('t3-scroll', ScrollComponent);

export { ScrollComponent };