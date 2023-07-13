interface State {
  drawerOpen: boolean;
  smallSize: number;
}

const defaultState: State = { drawerOpen: false, smallSize: 520 };

const generateTemplate = (state: State): string => {
  return `
    <header><slot name="header"></slot></header>
    <main>
      <slot name="main"></slot>
    </main>
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
      <div class="drawer ${ state.drawerOpen ? 'open' : ''}">
        <div class="drawer-btn-wrapper">
          <button class="drawer-btn">X</button>
        </div>
        <slot name="drawer"></slot>
      </div>
    </div>
  `;
}

const generateStyle = (state: State): string => {
  return `
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

    @media (max-width: ${ state.smallSize || 600 }px) {
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
        transform: translate(0);
        opacity: 0;
        background: white;
        border-radius: 15px 15px 0 0;
        border: 1px solid #bbb;
        padding: var(--space-md);
      }

      .drawer.open {
        animation: .3s ease-in-out 0s 1 slideUp forwards;
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

    @keyframes slideUp {
      to {
        transform: translateY(-100%);
        opacity: 1;
      }
    }
  `
};

export {
  defaultState,
  generateStyle,
  generateTemplate,
  State
};