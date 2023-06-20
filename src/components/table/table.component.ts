import { sortArrayAlphabeticallyImmutable } from "../../core/utils/sort-array-alphabetically-immutable";
import { Component } from "../../core/bases/component.base";
import { Column, TableConfig } from "../../core/types/table.types";
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

  protected afterStateChange(props: Nullable<Props>, state: State): void {
    this.setStyle(generateStyles());
    this.setTemplate(generateTemplate(props, state)); 
  }

  public configure(config: TableConfig): void {
    this.setState('config', config);
    this.sort('name');
  }

  public sort(name: string): void {
    if (this.currentState?.config) {
      const altered = { ...this.currentState.config };
      if (altered.data) {
        const sorted = sortArrayAlphabeticallyImmutable(altered.data, name);
        altered.data = sorted;
        this.setState('config', altered);
      }
    }
  }
}

customElements.define('t3-table', TableComponent);

export { TableComponent };