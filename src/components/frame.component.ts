import { Component } from "../core/bases/component.base";

class FrameComponent extends Component {
  protected afterInit(): void {
    this.template = `
      <header><slot name="header"></slot></header>
      <main><slot name="main"></slot></main>
      <footer><slot name="footer"></slot></footer>
      <div class="bottom-menu">
        <div class="bottom-menu-controls">
          <button class="bottom-menu-control">File</button>
          <button class="bottom-menu-control">Home</button>
          <button class="bottom-menu-control">Tools</button>
          <button class="bottom-menu-control">Support</button>
          <button class="bottom-menu-control">Test</button>
          <button class="bottom-menu-control">Support</button>
        </div>
        <div class="drawer">
          <div class="drawer-btn-wrapper">
            <button class="drawer-btn">X</button>
          </div>
          <slot name="drawer"></slot>
        </div>
      </div>
      
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

      .bottom-menu {
        display: none;
      }

      @media (max-width: 600px) {
        main {
          height: calc(100vh - var(--header-height));
        }
        footer {
          display: none;
        }

        .bottom-menu {
          display: block;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
        }
  
        .bottom-menu-controls {
          display: flex;
        }
  
        .bottom-menu-control {
          height: 60px;
          border: none;
          outline: 0;
          flex: 1;
          background: var(--app-color);
          color: var(--app-color-text-color);
          cursor: pointer;
        }
      
        .drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          z-index: 1;
          min-height: 25vh;
          transform: translateY(0);
          transition: var(--transition);
          background: white;
          border-radius: 15px 15px 0 0;
          border: 1px solid #bbb;
          padding: var(--space-md);
        }
  
        .drawer.open {
          transform: translateY(-100%);
        }

        .drawer-btn-wrapper {
          display: flex;
          justify-content: flex-end;
        }

        .drawer-btn {
          background: transparent;
          border: none;
          outline: 0;
          font-size: 20px;
        }
      }
    `;
  }

  protected afterRender(): void {
    const buttons = this.root?.querySelectorAll('.bottom-menu-control');
    if (buttons) {
      const arr = Array.from(buttons);
      console.log('arr', arr)
      for(const btn of arr) {
        btn.addEventListener('click', () => this.openDrawer());
      }
    }
    const closeBtn = this.root?.querySelector('.drawer-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }
  }

  private openDrawer(): void {
    const drawer = this.root?.querySelector('.drawer');
    if (drawer) {
      if (!drawer.classList.contains('open')) {
        drawer.classList.add('open');
      }
    }
  }

  private closeDrawer(): void {
    const drawer = this.root?.querySelector('.drawer');
    if (drawer) {
      if (drawer.classList.contains('open')) {
        drawer.classList.remove('open');
      }
    }
  }
}

export { FrameComponent };