import { Component } from "../core/bases/component.base";

class FrameComponent extends Component {
  afterInit(): void {
    this.template = `
      <header><slot name="header"></slot></header>
      <main><slot name="main"></slot></main>
      <footer><slot name="footer"></slot></footer>
    `;  
    this.styles = `
      :host {
        --header-height: 2rem;
        --footer-height: calc(var(--header-height) * 2);
      }
      header {
        height: var(--header-height);
        background-color: var(--app-color);
        color: var(--app-color-text-color);
      }
      main {
        height: calc(100vh - (var(--header-height) * 3));
        background-color: var(--dark-bg-color);
      }
      footer {
        height: var(--footer-height);
        background-color: var(--muted-bg-color);
      }
    
      @media (max-width: 600px) {
        main {
          height: calc(100vh - var(--header-height));
        }
        footer {
          display: none;
        }
      }
    `;
  }
}

export { FrameComponent };