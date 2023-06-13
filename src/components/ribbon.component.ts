import { Component } from "../core/bases/component.base";

class RibbonComponent extends Component {
  afterInit(): void {
     this.styles = `
      .ribbon-section, .tab-header, .tab-content {
          position: relative;
          display: flex;
        }
        
        .tab-header {
          background-color: var(--app-color);
        }
      
        .btn {
          background-color: transparent;
          border: none;
          outline: 0;
        }
      
        .tab-btn {
          color: var(--app-color-text-color);
          padding: var(--space-md) var(--space-lg);
        }
      
        .tab-btn.active {
          background-color: var(--muted-bg-color);
          color: var(--color);
          border-radius: 5px 5px 0 0;
        }
      
        .tab-content {
          background-color: var(--muted-bg-color);
          padding: var(--space-md) 0 ;
        }
      
        .ribbon-section {
          flex-direction: column;
          padding: 0 var(--space-lg);
          justify-content: space-between;
          height: 100px;
          gap: var(--space-sm);
        }
      
        .ribbon-section-content {
          flex: 1; 
        }
      
        .ribbon-section-content,
        .single.control,
        .row.control, 
        .col.control {
          display: flex;
          gap: var(--space-md);
        }
      
        .ribbon-section-content.single {
          justify-items: center;
        }
      
        .control {
          border: 1px solid transparent;
        }
      
        .control:hover {
          border-color: var(--muted-fg-color);
        }
      
        .single.control,
        .row.control {
          align-items: center;
        }
      
        .single.control .icon,
        .row.control .icon {
          font-size: 2.5rem;
        }
      
      
        .ribbon-section-content.col,
        .single.control,
        .row.control {
          flex-direction: column;
        }
        
        .ribbon-section-label {
          color: var(--muted-fg-color);
          font-size: .8rem;
          text-align: center;
          flex: 0 0 auto;
        }
        
        .ribbon-separator {
          width: 1px;
          background-color: var(--muted-fg-color);
        }
      
        @media (max-width: 600px) {
          .tab-header, .tab-content {
            position: fixed;
            left: 0;
            right: 0;
          }
      
          .tab-header {
            bottom: 0;
            z-index: 1;
          }
      
          .tab-content {
            bottom: 60px;
            transform: translateY(calc(100%));
            opacity: 0;
            transition: .3s transform ease-in-out;
          }
      
          .tab-content.open {
            opacity: 1;
            transform: translateY(0);
          }
      
          .tab-btn {
            flex: 1;
            border-radius: 0;
            height: 60px;
          }
      
          .tab-btn.active {
            border-radius: 0;
            color: var(--app-color-text-color);
            background-color: transparent;
          }
      
          .tab-content {
            position: absolute;
            flex-direction: column;
          }
          
          .ribbon-section {
            flex-direction: column-reverse;
          }
      
          .ribbon-section-content.col {
            flex-direction: row;
          }
      
          .ribbon-section-content {
            justify-content: flex-start;
          }
      
          .control {
            min-width: 100px;
          }
      
          .control:hover {
            border-color: transparent;
          }
      
          .col.control {
            flex-direction: column;
            align-items: center;
          }
      
          .row.control .icon,
          .col.control .icon,
          .single.control .icon {
            font-size: 2rem;
          }
      
          .ribbon-separator {
            width: 100%;
            height: 1px;
          }
      
          .ribbon-separator.last {
            display: none;
          }
      
        }
     `;
     this.template = `
      <div class="ribbon">
        <div class="tab-header">
          <button class="btn tab-btn">File</button>
          <button class="btn tab-btn active">Home</button>
          <button class="btn tab-btn">Tools</button>
          <button class="btn tab-btn">Support</button>
        </div>
        <div class="tab-content">
          <div class="ribbon-section">
            <div class="ribbon-section-content">
              <button class="btn control row">
                <span class="icon">X</span>
                <span>Open</span>
              </button>
              <button class="btn control row">
                <span class="icon">X</span>
                <span>New</span>
              </button>
            </div>
            <span class="ribbon-section-label">DataViews</span>
          </div>
          <div class="ribbon-separator"></div>
          <div class="ribbon-section">
            <div class="ribbon-section-content single">
              <button class="btn control single">
                <span class="icon">X</span>
                <span>Save</span>
              </button>
            </div>
            <span class="ribbon-section-label">Format</span>
          </div>
          <div class="ribbon-separator"></div>
          <div class="ribbon-section">
            <div class="ribbon-section-content single">
              <button class="btn control single">
                <span class="icon">X</span>
                <span>Properties</span>
              </button>
            </div>
            <span class="ribbon-section-label">Properties</span>
          </div>
          <div class="ribbon-separator"></div>
          <div class="ribbon-section">
            <div class="ribbon-section-content">
    
            </div>
            <span class="ribbon-section-label">Date Range</span>
          </div>
          <div class="ribbon-separator"></div>
          <div class="ribbon-section">
            <div class="ribbon-section-content single">
              <button class="btn control single">
                <span class="icon">X</span>
                <span>Calculate</span>
              </button>
            </div>
            <span class="ribbon-section-label">Calculations</span>
          </div>
          <div class="ribbon-separator"></div>
          <div class="ribbon-section">
            <div class="ribbon-section-content single">
              <button class="btn control single">
                <span class="icon">X</span>
                <span>Print</span>
              </button>
            </div>
            <span class="ribbon-section-label">Printing</span>
          </div>
          <div class="ribbon-separator"></div>
          <div class="ribbon-section">
            <div class="ribbon-section-content col">
              <button class="btn control col">
                <span class="icon">X</span>
                <span>Intermittent</span>
              </button>
              <button class="btn control col">
                <span class="icon">X</span>
                <span>Resize Columns</span>
              </button>
            </div>
            <span class="ribbon-section-label">Display Options</span>
          </div>
          <div class="ribbon-separator"></div>
          <div class="ribbon-section">
            <div class="ribbon-section-content col">
              <button class="btn control col">
                <span class="icon">X</span>
                <span>Switch</span>
              </button>
              <button class="btn control col">
                <span class="icon">X</span>
                <span>Arrange</span>
              </button>
              <button class="btn control col">
                <span class="icon">X</span>
                <span>Close All</span>
              </button>
            </div>
            <span class="ribbon-section-label">Arrange</span>
          </div>
          <div class="ribbon-separator last"></div>
        </div>
      </div>
     `; 
  }

  afterRender() {
    const list = this.element?.querySelectorAll('.tab-btn');
    if (list) {
      const tabs = Array.from(list);
      for (const tab of tabs) {
        tab.addEventListener('click', (e) => this.swicthTab(e));
      }  
    }
  }

  swicthTab(e: Event) {
    e.stopPropagation();
    const list = this.element?.querySelectorAll('.tab-btn');
    if (list) {
      const tabs = Array.from(list);
      for (const tab of tabs) {
        tab.classList.remove('active');
      }
    }
    
    (e.target as HTMLElement).classList.add('active');

    // Example of template parser bug.
    if (window.innerWidth <= 600) {
      const tabContent = this.element?.querySelector('.tab-content');
      if (tabContent?.classList.contains('open')) {
        tabContent.classList.remove('open');
      } else {
        tabContent?.classList.add('open');
      }
    }

  }
}

export { RibbonComponent };