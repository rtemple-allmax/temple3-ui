import { TableConfig } from "../../core/types/table.types";
import { Nullable } from "../../core/utils/nullable";

interface Props {
  dataConfig: string;
}

interface State {
  config: TableConfig,
  showFilter: boolean,
  filterExpr: string;
  filterValue: string;
}

const defaultProps: Props = { dataConfig: '' };
const defaultState: State = { config: { data: [], columns: [], name: '' }, showFilter: false, filterExpr: 'name', filterValue: '' };

const generateStyles = (props: Nullable<Props>, state: Nullable<State>): string => {
  if (state?.config) {
    return `
    .container {
      display: grid;
      grid-template-columns: ${ getColumns(state.config) };
      border: 1px solid #bbb;
    }

    .sticky-top {
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .cell {
      border: 1px solid #bbb;
    }
  `;
  } else {
    return '';
  }
}

const generateTemplate = (props: Nullable<Props>, state: Nullable<State>): string => {
  if (state?.config) {
    return `
    <div class="container">
      ${ getHeader(state.config) }
      ${ getBody(state.config) }
    </div>
  `;
  } else {
    return '';
  }
  
}

const getColumns = (config: TableConfig): string => {
  let result = '';

  config.columns.forEach(c => {
    result += c.width ? c.width : 'auto'
    result += ' '
  })

  return result;
}

const getHeader = (config: TableConfig): string => {
  let result = '';
  config.columns.forEach(c => {
    result += `<div class="cell header">${ c.label }</div>`; 
  });
  return result;
}

const getBody = (config: TableConfig): string => {
  let result = '';
  return result;
}

export {
  defaultProps,
  defaultState,
  generateStyles,
  generateTemplate,
  Props,
  State
}