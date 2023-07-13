import { RibbonConfig, RibbonSection, RibbonTab } from "../../core/types/ribbon.types.js";

interface State {
  config: RibbonConfig;
}

const defaultState: State = {
  config: { smallSize: 600 }
};

const generateTemplate = (state: State): string => {
  return `
  <div class="ribbon">
    <div class="tab-header">
      ${ generateHeader(state.config) }
    </div>
    ${ generateTabs(state.config) }
  </div>
  `;
}

const generateHeader = (config: RibbonConfig): string => {
  if (!config?.tabs) { return ''; }
  let template = '';
  for (const tab of config.tabs) {
    template += `<button class="btn tab-btn ${ tab.active ? 'active': ''}">${ tab.label }</button>`
  }
  return template;
}

const generateTabs = (config: RibbonConfig): string => {
  if (!config?.tabs) { return '' }
  let template = '';
  for (const tab of config.tabs) {
    if (tab.active) {
      template += `
        <div class="tab-content ${ tab.active ? 'open' : ''}">
          ${ generateSections(tab) }
        </div>
      `
    }
  }
  return template;
}

const generateSections = (tab: RibbonTab): string => {
  let template = '';
  for (const section of tab.sections) {
    template += `
    <div class="ribbon-section">
      <div class="ribbon-section-content ${ section.type }">
        ${ generateControls(section) }
      </div>
      <span class="ribbon-section-label">${ section.label }</span>
    </div>
    <div class="ribbon-separator"></div>
    `;
  }
  return template;
}

const generateControls = (section: RibbonSection): string => {
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

const generateStyle = (config: RibbonConfig): string => {
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

    @media (max-width: ${ config.smallSize || 600 }px) {
      .tab-header, .tab-content {
        display: none;
      }
    }
  `;
};

export {
  defaultState,
  generateTemplate,
  generateStyle,
  State
};