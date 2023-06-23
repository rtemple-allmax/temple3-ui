import { Column, ColumnTypes, SortingState, TableConfig,  } from '../../core/types/table.types.js';
import { Nullable } from "../../core/utils/nullable.js";


interface Props {
 initial: boolean,
 dataConfig: string;
}

interface State {
  config: TableConfig
}

const defaultProps: Props = { initial: false, dataConfig: '' };
const defaultState: State = { config: { data: [], columns: [] } };

const generateStyles = () => {
  return `
    .table {
      width: 100%;
      background-color: white;
      border: 1px solid black;
      border-collapse: collapse;
    }

    .striped tr:not(.headers):nth-child(even) {
      background-color: var(--muted-bg-color);
    }

    .headers {
      bottom-border: 1px solid black;
    }

    .headers th:not(:last-child) {
      border-right: 1px solid black;
    }

    .header {
      padding: .5rem;
    }

    .header .sort-btn {
      background: transparent;
      border: none;
      outline: 0;
      color: var(--fg-color);
      margin: 0 0 0 .5rem;
      padding: .33rem .5rem;
      border-radius: 5px;
      font-size: 12px;
      transform: rotate(0);
    }

    .header .sort-btn:hover {
      background-color: var(--app-color);
      color: var(--app-color-text-color);
    }

    .header .sort-btn.inverted {
      transform: rotate(180deg);
    }
    
    .cell {
      border: 1px solid black;
      padding: 2px 3px;
    }

    .cell.left-aligned {
      text-align: left;
    }

    .cell.center-aligned {
      text-align: center;
    }

    .cell.right-aligned {
      text-align: right;
    }
  `;
};

const generateTemplate = (props: Nullable<Props>, state: Nullable<State>): string => {
  if (!state?.config) { return ''; }
  return `
    <table class="table striped">
      <thead>
        <tr class="headers">
          ${ generateHeader(state.config) }
        </tr>
      </thead>
      <tbody id="data-container">
        ${ generateRows(state.config) }
      </tbody>
    </table>
  `;
};

const generateHeader = (config: TableConfig): string => {
  const { columns } = config;
  if (!columns || columns.length < 1) { return ''; }
  let template = '';
  for (const col of columns) {
    template += `<th class="header" align="center">${ col.label }${ getSortIndex(col) }</th>`
  }
  return template;
};

const generateRows = (config: TableConfig): string => {
  const { data } = config;
  if (!data || data.length < 1) { return ''; }
  let template = '';
  for (const record of data) {
    template += `<tr>${ generateRow(record, config)}</tr>`
  }
  return template;
};

const generateRow = (record: any, config: TableConfig) => {
  if (!record || record.length < 1) { return ''; }
  let template = '';
  for (const dataPoint in record) {
    template += `<td class="cell ${ getAlignment(dataPoint, config) }">${ record[dataPoint] }</td>`
  }
  return template;
}

const getAlignment = (propName: string, config: TableConfig): string => {
  let className = 'left-aligned';
  const type = config.columns.find(x => x.dataField.toLowerCase() === propName.toLowerCase())?.type;
  if (type) {
    switch(type) {
      case ColumnTypes.currency:
      case ColumnTypes.number:
        className = 'right-aligned';
        break;
      case ColumnTypes.boolean:
      case ColumnTypes.control:
      case ColumnTypes.selection:
        className = 'center-aligned';
    }
  }
  return className;
}

const getSortIndex = (col: Column): string => {
  if (col.sortIndex > -1) {
    return `<button class="sort-btn ${ col.sortingState === SortingState.Ascending ? 'inverted' : ''}" data-field="${ col.dataField }"><span class="icon">V</span></button>`;
  }
  return ``;
}

export {
  defaultProps,
  defaultState,
  generateStyles,
  generateTemplate,
  Props,
  State
}