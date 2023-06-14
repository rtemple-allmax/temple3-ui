import { Component } from "../core/bases/component.base";

class GridComponent extends Component {
  afterInit(): void {
    this.template = `<slot class="grid-container"></slot>`;
    this.styles = `
      .grid-container {
        display: grid;
        padding: var(--space-md);
        gap: var(--space-md);
        grid-template-columns: ${ this.currentProps.columns };
      }
    
      @media (max-width: 1000px) {
        .grid-container {
          grid-template-columns: ${ this.currentProps.columnsmd || this.currentProps.columns };
        }
      }
    
      @media (max-width: 600px) {
        .grid-container {
          grid-template-columns: ${ this.currentProps.columnssm || this.currentProps.columns };
        }
      }
    `;
  }
}

export { GridComponent };