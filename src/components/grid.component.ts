import { Component } from "../core/bases/component.base";

interface Props {
  columns: string;
  columnsSm: string;
  columnsMd: string;
}

class GridComponent extends Component<Props, {}> {
  afterInit(): void {
    const {currentProps } = this;
    if (currentProps) {
      const templateString = '<slot class="grid-container"></slot>';
      const styleString = `
        .grid-container {
          display: grid;
          padding: var(--space-md);
          gap: var(--space-md);
          grid-template-columns: ${ currentProps.columns || 'repeat(3, 1fr)' };
        }
      
        @media (max-width: var(--breakpoint-md)) {
          .grid-container {
            grid-template-columns: ${ currentProps.columnsMd || currentProps.columns || 'repeat(2, 1fr)' };
          }
        }
      
        @media (max-width: var(--breakpoint-sm)) {
          .grid-container {
            grid-template-columns: ${ currentProps.columnsSm || currentProps.columnsMd || currentProps.columns || '1fr' };
          }
        }
      `;
      this.setTemplate(templateString);
      this.setStyle(styleString);
    } 
  }
}

export { GridComponent };