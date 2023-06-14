import { Nullable } from "../core/utils/nullable";
import { Component } from "../core/bases/component.base";

class ScrollComponent extends Component {
  scroller: Nullable<HTMLElement>;

  scrolled = new Event('scrolled', { bubbles: true, cancelable: false });
  reachedBottom = new Event('reachedBottom', { bubbles: true, cancelable: false });
  
  afterInit(): void {
    this.styles = `
      :host {
        height: 100%;
      }
      .scroll-wrapper {
        padding: var(--space-md);
        height: 100%;
      }
    
      .scroll-container {
        overflow-y: auto;
        overflow-x: hidden;
        height: auto;
        max-height: calc(${ this.currentProps.maxheight } - (var(--space-md) * 2));
      }
      
      .scroll-container::-webkit-scrollbar {
        width: 5px;
        background: var(--scrollbar-base-color);
        visibility: hidden;
      }
      
      .scroll-container::-webkit-scrollbar-thumb {
        background: var(--scrollbar-thumb-color);
        border-radius: 4px;
        visibility: hidden;
      }
    
      .scroll-container:hover::-webkit-scrollbar, .scroll-container:hover::-webkit-scrollbar-thumb {
        visibility: visible;
      }
    `;
    this.template = `
      <div class="scroll-wrapper">
        <div class="scroll-container">
          <slot></slot>
        </div>
      </div>
    `;
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

export { ScrollComponent };