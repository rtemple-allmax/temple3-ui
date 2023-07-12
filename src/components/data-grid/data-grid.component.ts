import { Nullable } from '../../core/utils/nullable.js';
import { Component } from '../../core/bases/component.base.js';
import { defaultProps, defaultState, generateStyles, generateTemplate, Props, State} from './data-grid.meta.js';
import { TableConfig } from '../../core/types/table.types.js';
import { SortingState } from '../../core/types/table.types.js';
import { sortArrayByStringValueImmutable } from '../../core/utils/array-utils.js';

class DataGridComponent extends Component<Props, State> {
  constructor() {
    super(defaultProps, defaultState);
  }

  protected afterInit(props: Props, state: Nullable<State>): void {
    this.setStyle(generateStyles(props, state));
    this.setTemplate(generateTemplate(props, state));
  }

  // protected afterRender(): void {
  //   if (this.root) {
  //     const sortBtns = this.root.querySelectorAll('.sort-btn');
  //     if (sortBtns && this.currentState?.config?.columns) {
  //       for (const btn of Array.from(sortBtns)) {
  //         const field = (btn as HTMLElement).dataset.field;
  //         const foundColumn = this.currentState.config.columns.find(x => x.dataField === field);
  //         if (foundColumn && foundColumn.sortIndex > -1) {
  //           btn.addEventListener('click', () => this.sort(foundColumn.dataField))
  //         }
  //       }
  //     }
  //     const filterBtn = this.root.getElementById('filter-btn');
  //     if(filterBtn) {
  //       filterBtn.addEventListener('click', () => this.showFilterRow());
  //     }

  //     const filterInput = this.root.getElementById('filter-input');
  //     console.log('filter', filterInput)
  //     if (filterInput) {
  //       filterInput.addEventListener('input', (e: Event) => this.filterInputChanged(e));
  //     }
  //   }
  // }

  protected afterStateChange(props: Nullable<Props>, state: State): void {
    this.setStyle(generateStyles(props, state));
    this.setTemplate(generateTemplate(props, state));
  }

  public configure(config: TableConfig): void {
    this.setState('config', config);
  }

  // public sort(name: string): void {
  //   if (this.currentState?.config) {
  //     const altered = { ...this.currentState.config };
  //     const col = altered.columns.find(x => x.dataField === name);
  //     if (altered.data && col) {
  //       let desc = false;
  //       switch(col.sortingState) {
  //         case SortingState.None:
  //           desc = false;
  //           col.sortingState = SortingState.Ascending;
  //           break;
  //         case SortingState.Ascending:
  //           desc = true;
  //           col.sortingState = SortingState.Descending;
  //           break;
  //         case SortingState.Descending:
  //           desc = false;
  //           col.sortingState = SortingState.Ascending;
  //           break;
  //       }
  //       const sorted = sortArrayByStringValueImmutable(altered.data, name, desc);
  //       altered.data = sorted;
  //       this.setState('config', altered);
  //     }
  //   }
  // }

  // public showFilterRow(): void {
  //   if (this.currentState) {
  //     this.setState('showFilter', !this.currentState.showFilter);
  //   }
  // }

  // public filterInputChanged(e: Event): void {
  //   const val = (e.target as HTMLInputElement).value;
  //   this.setState('filterValue', val);
  // }
}

customElements.define('nxt-data-grid', DataGridComponent);

export { DataGridComponent };