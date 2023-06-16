import { Component } from "../core/bases/component.base";

interface Props {
  columns: string;
  columnsSm: string;
  columnsMd: string;
}

class GridComponent extends Component<Props, {}> {
  afterInit(props: Props, state: {}): void {
    const templateString = '<slot class="grid-container"></slot>';
    const styleString = `
      .grid-container {
        display: grid;
        padding: var(--space-md);
        gap: var(--space-md);
        grid-template-columns: ${ props.columns || 'repeat(3, 1fr)' };
      }
    
      @media (max-width: 1000px) {
        .grid-container {
          grid-template-columns: ${ props.columnsMd || props.columns || 'repeat(2, 1fr)' };
        }
      }
    
      @media (max-width: 600px) {
        .grid-container {
          grid-template-columns: ${ props.columnsSm || props.columnsMd || props.columns || '1fr' };
        }
      }
    `;
    this.setTemplate(templateString);
    this.setStyle(styleString);
  } 
}

export { GridComponent };