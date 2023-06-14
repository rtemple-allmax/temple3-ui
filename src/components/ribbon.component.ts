import { RibbonData, RibbonSection, RibbonTab } from "../core/types/ribbon.types";
import { Component } from "../core/bases/component.base";

class RibbonComponent extends Component {
  protected afterInit(): void {
    this.styles = this.generateStyles();
  }
  protected afterStateChange(state: any): void {
    this.template = this.generateTemplate(state?.data);
  }

  protected afterRender(): void {
    const { data } = this.currentState;
    if (data) {
      const btns = this.root?.querySelectorAll('.tab-btn');
      if (btns) {
        for(const [i, b] of Array.from(btns).entries()) {
          b.addEventListener('click', () => this.switchTabs(data, i))
        }
      }
    }
  }

  private generateStyles(): string {
    return `
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
      padding: var(--space-md) 0;
      min-height: 100px;
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
        display: none;
      }
    }
    `
  }

  private generateTemplate(data: RibbonData): string {
    return `
    <div class="ribbon">
      <div class="tab-header">
        ${ this.generateHeader(data) }
      </div>
      ${ this.generateTabs(data) }
    </div>
    `;
  }
  
  private generateHeader(data: RibbonData): string {
    if (!data) { return ''; }
    let template = '';
    for (const [i, tab] of data.tabs.entries()) {
      template += `<button class="btn tab-btn ${ tab.active ? 'active': ''}">${ tab.label }</button>`
    }
    return template;
  }

  private generateTabs(data: RibbonData): String {
    if (!data) { return '' }
    let template = '';
    for (const tab of data.tabs) {
      if (tab.active) {
        template += `
          <div class="tab-content ${ tab.active ? 'open' : ''}">
            ${ this.generateSections(tab) }
          </div>
        `
      }
    }
    return template;
  }

  private generateSections(tab: RibbonTab): string {
    let template = '';
    for (const section of tab.sections) {
      template += `
      <div class="ribbon-section">
        <div class="ribbon-section-content ${ section.type }">
          ${ this.generateControls(section) }
        </div>
        <span class="ribbon-section-label">${ section.label }</span>
      </div>
      <div class="ribbon-separator"></div>
      `;
    }
    return template;
  }

  private generateControls(section: RibbonSection): string {
    if (!section.controls) { return ''; }
    let template = '';
    for (const control of section.controls) {
      template += `
        <button class="btn control ${ section.type }">
          <span class="icon">${ control.icon }</span>
          <span>${ control.label }</span>
        </button>
      `;
    }
    return template;
  }

  private switchTabs(data: RibbonData, index: number) {
    if (!data || data.tabs?.length < index) { return; }
    const altered = { ...data };

    for(const [i, tab] of altered.tabs.entries()) {
      tab.active = i === index;
    }
  }
}

export { RibbonComponent };