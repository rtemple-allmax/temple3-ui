import { sortArrayByStringValueImmutable } from "../../core/utils/array-utils";
import { Component } from "../../core/bases/component.base";
import { Column, SortingState, TableConfig } from "../../core/types/table.types";
import { Nullable } from "../../core/utils/nullable";

import { defaultProps, defaultState, generateStyles, generateTemplate, Props, State } from './table.meta';

class TableComponent extends Component<Props, State> {
  constructor() {
    super(defaultProps, defaultState);
  }

  protected afterInit(props: Props, state: Nullable<State>): void {
    this.setStyle(generateStyles());
    this.setTemplate(generateTemplate(props, state));
  }

  protected afterRender(): void {
    if (this.root) {
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
    }
  }

  protected afterStateChange(props: Nullable<Props>, state: State): void {
    this.setStyle(generateStyles());
    this.setTemplate(generateTemplate(props, state));
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
}

customElements.define('t3-table', TableComponent);

export { TableComponent };