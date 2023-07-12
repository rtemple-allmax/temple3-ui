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
  if (state?.config?.columns) {
    return `
    .wrapper {
      margin: 0 auto;
      width: ${ state.config.width || '100%' };
      background-color: white;
      overflow: auto;
      max-height: ${ state.config.maxHeight || 'auto' }
    }

    .wrapper::-webkit-scrollbar {
      width: 5px;
      background: var(--scrollbar-base-color);
      visibility: hidden;
    }
    
    .wrapper::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb-color);
      border-radius: 4px;
      visibility: hidden;
    }

    .wrapper:hover::-webkit-scrollbar, .wrapper:hover::-webkit-scrollbar-thumb {
      visibility: visible;
    }

    .row {
      display: grid;
      grid-template-columns: ${ getColumns(state.config) };
    }

    .row.header {
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: white;
    }

    .cell {
      border: 1px solid #bbb;
      border-collapse: collapse;
      padding: 4px;
    }

    @media (max-width: 600px) {
      .wrapper {
        background-color: transparent;
        max-height: ${ state.config.maxHeightSm || 'auto' }
      }

      .row {
        grid-template-columns: 1fr;
        margin: 1rem 0;
        border: 1px solid #bbb;
        box-shadow: var(--shadow);
      }

      .row.header {
        grid-template-columns: repeat(${ state.config.columns.length }, 1fr);
        margin: 0;
        border-radius: 5px;
        box-shadow: none;
      }

      .cell {
        border: none;
        background-color: white;
      }

      .cell.header {
        text-align: center;
        border-right: 1px solid #bbb;
      }

      .cell.header:first-of-type {
        border-left: 1px solid #bbb;
      }
    }
  `;
  } else {
    return '';
  }
}

const generateTemplate = (props: Nullable<Props>, state: Nullable<State>): string => {
  if (state?.config) {
    return `
    <div class="wrapper">
      ${ headerRow(state.config) }
      ${ dataRows(state.config) }
    </div>
  `;
  } else {
    return '';
  }
}

const getColumns = (config: TableConfig): string => {
  let result = '';
  config.columns.forEach(c => {
    result += c.width ? c.width : '1fr'
    result += ' '
  })
  return result;
}

const headerRow = (config: TableConfig): string => {
  const headers: string[] = [];

  config.columns.forEach(c => {
    const markup = `<span class="cell header">${ c.label }</span>`
    headers.push(markup);
  })

  return `
    <div class="row header">
      ${ headers.join('') }
    </div>
  `;
}

const dataRows = (config: TableConfig): string => {
  const rows: string[] = [];

  config.data.forEach(record => {
    let cells: string[] = [];
    for (const key in record) {
      const foundCol = config.columns.find(col => col.dataField === key);
      if (foundCol) {
        cells.push(`<span class="cell data">${ record[key] }</span>`)
      }
    }
    rows.push(`<div class="row data">${ cells.join('') }</div>`)
  })
  return `${ rows.join('') }`;
}

export {
  defaultProps,
  defaultState,
  generateStyles,
  generateTemplate,
  Props,
  State
}