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
    this.setStyle(generateStyles(state));
    this.setTemplate(generateTemplate(state));
    window.addEventListener('resize', () => {
      if (this.currentState) {
        this.setStyle(generateStyles({ ...this.currentState }));
        this.setTemplate(generateTemplate({ ...this.currentState }));
        this.render_FORCE();
      }
    });
  }

  protected afterRender(props: Nullable<Props>, state: Nullable<State>): void {
    if (this.root) {
      const editors = this.root.querySelectorAll('.editor');
      if (editors) {
        for (const editor of Array.from(editors)) {
          (editor as HTMLInputElement).addEventListener('change', e => {
            const value = (e.target as HTMLInputElement).value;
            const idAttr = (editor as HTMLElement).dataset.id; 
            if (idAttr) {
              const id = parseInt(idAttr, 10);
              const field = (editor as HTMLElement).dataset.field;
              if (id > -1 && field && state?.config) {
                const altered = [ ...state.config.data ];
                if (altered) {
                  const idx = altered.findIndex(x => x.id === id );
                  if (idx > -1) {
                    const record = { ...altered[idx] };
                    record[field] = value;
                    altered[idx] = record;
                    this.setState('config', { ...state.config, data: altered })
                  }
                }
              }
            }
            
          })
        }
      }
      const sortBtns = this.root.querySelectorAll('.sort-btn');
      if (sortBtns && this.currentState?.config?.columns) {
        for (const btn of Array.from(sortBtns)) {
          const field = (btn as HTMLElement).dataset.field;
          const foundColumn = this.currentState.config.columns.find(x => x.dataField === field);
          if (foundColumn && foundColumn.sortIndex > -1) {
            btn.addEventListener('click', () => this.sort(foundColumn.dataField))
          }
        }
      }
      const filterBtn = this.root.getElementById('filter-btn');
      if(filterBtn) {
        filterBtn.addEventListener('click', () => this.showFilterRow());
      }

      const filterInput = this.root.getElementById('filter-input');
      console.log('filter', filterInput)
      if (filterInput) {
        filterInput.addEventListener('input', (e: Event) => this.filterInputChanged(e));
      }
    }
  }

  protected afterStateChange(props: Nullable<Props>, state: State): void {
    console.log('after state change', state);
    this.setStyle(generateStyles(state));
    this.setTemplate(generateTemplate(state));
  }

  public configure(config: TableConfig): void {
    this.setState('config', config);
  }

  public sort(name: string): void {
    if (this.currentState?.config) {
      const altered = { ...this.currentState.config };
      const col = altered.columns.find(x => x.dataField === name);
      if (altered.data && col) {
        let desc = false;
        switch(col.sortingState) {
          case SortingState.None:
            desc = false;
            col.sortingState = SortingState.Ascending;
            break;
          case SortingState.Ascending:
            desc = true;
            col.sortingState = SortingState.Descending;
            break;
          case SortingState.Descending:
            desc = false;
            col.sortingState = SortingState.Ascending;
            break;
        }
        const sorted = sortArrayByStringValueImmutable(altered.data, name, desc);
        altered.data = sorted;
        this.setState('config', altered);
      }
    }
  }

  public showFilterRow(): void {
    if (this.currentState) {
      this.setState('showFilter', !this.currentState.config.showFilter);
    }
  }

  public filterInputChanged(e: Event): void {
    const val = (e.target as HTMLInputElement).value;
    this.setState('filterValue', val);
  }
}

customElements.define('nxt-data-grid', DataGridComponent);

export { DataGridComponent };