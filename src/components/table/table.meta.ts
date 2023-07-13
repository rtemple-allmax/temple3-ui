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
const defaultState: State = {
  config: {
    data: [],
    columns: [],
    name: '',
    showBorders: true,
    alternation: true,
    showFilter: false,
    filterExpr: 'name',
    filterValue: '',
    mediumSize: 1000,
    smallSize: 620
  }
};

const generateStyles = () => {
  return `
    .table-header {
      background-color: var(--table-header-bg-color);
      color: var(--table-header-fg-color);
      padding: 0 var(--space-lg);
    }

    .filter-row {
      height: 0;
      overflow: hidden;
      border-left: 1px solid black;
      border-right: 1px solid black;
      background-color: var(--muted-bg-color);
      animation: close .1s ease-in-out forwards;
    }

    .filter-row.shown {
      animation: open .1s ease-in-out forwards;
      padding: var(--space-md);
    }

    .filter-row input {
      width: calc(100% - (var(--space-md) * 2));
      padding: var(--space-md);
    }

    #filter-btn {

    }

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

    @keyframes open {
      from {
        height: 0;
      }
      to {
        height: 35px;
      }
    }

    @keyframes close {
      from {
        height: 35px;
      }
      to {
        height: 0;
      }
    }
  `;
};

const generateTemplate = (props: Nullable<Props>, state: Nullable<State>): string => {
  if (!state?.config) { return ''; }
  return `
    <div class="table-header">
      <nxt-flex justify-content="space-between" align-items="center">
        <p>${ state.config.name }</p>
        <button id="filter-btn">T</button>
      </nxt-flex>
    </div>
    <div class="filter-row ${ state.config.showFilter ? 'shown' : ''}">
      <input id="filter-input" type="text" placeholder="Filter..."/>
    </div>
    <table class="table striped">
      <thead>
        <tr class="headers">
          ${ generateHeader(state.config) }
        </tr>
      </thead>
      <tbody id="data-container">
        ${ generateRows(state) }
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

const generateRows = (state: State): string => {
  if (!state?.config?.data || state.config.data.length < 1) { return ''; }
  let template = '';
  let filtered: any[] = [];
  if (state.config.filterExpr && state.config.filterValue) {
    filtered = state.config.data.filter(x => (x[state.config.filterExpr] as string).includes(state.config.filterValue));
  } else {
    filtered = state.config.data;
  }
  for (const record of filtered) {
    template += `<tr>${ generateRow(record, state.config)}</tr>`
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