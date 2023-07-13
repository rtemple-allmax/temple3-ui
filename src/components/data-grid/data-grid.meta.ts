import { Column, TableConfig } from "../../core/types/table.types";
import { Nullable } from "../../core/utils/nullable";

interface Props {
  initial: boolean;
}

interface State {
  config: TableConfig,
}

const defaultProps: Props = { initial: true };
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

const generateStyles = (state: Nullable<State>): string => {
  if (state?.config?.columns) {
    return `
    .wrapper {
      margin: 0 auto;
      background-color: white;
      overflow: auto;
      width: ${ state.config.width || '100%' };
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
      grid-template-columns: ${ cssColumns(state.config) };
      background-color: white;
    }

    .row.header {
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: white;
    }

    ${ state.config.alternation ? '.row:nth-child(even), .row:nth-child(even) input  { background-color: var(--muted-bg-color); }' : '' }

    .cell {
      padding: 4px;
    }

    .editor {
      font-family: var(--font-family);
      font-size: 1rem;
      outline: 0;
    }

    .bordered {
      border: 1px solid #bbb;
      border-collapse: collapse;
    }

    input.editor:not(.bordered) {
      border: none;
    }

    .data-wrapper {
      display: block;
    }

    @media (max-width: ${ state.config.mediumSize || 1000 }px) {
      .wrapper {
        background-color: transparent;
        max-height: ${ state.config.maxHeightMd || 'auto' }
      }

      .row {
        grid-template-columns: repeat(2, 1fr);
        margin: .5rem 0;
        box-shadow: var(--shadow);
      }

      .row.header {
        grid-template-columns: repeat(${ state.config.columns.filter(x => x.visible()).length }, 1fr);
        margin: 0;
        border-radius: 5px;
        box-shadow: none;
      }

      .data-wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: var(--space-md);
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

      .row:nth-child(even), .row:nth-child(even) input { background-color: white; }
    }

    @media (max-width: ${ state.config.smallSize || 620 }px) {
      .wrapper {
        background-color: transparent;
        max-height: ${ state.config.maxHeightSm || 'auto' }
      }
      .row {
        grid-template-columns: 1fr;
      }

      .data-wrapper {
        display: block;
      }

      .row.header {
        grid-template-columns: repeat(${ state.config.columns.filter(x => x.visible()).length }, 1fr);
      }
    }
  `;
  } else {
    return '';
  }
}

const cssColumns = (config: TableConfig): string => {
  const cols: string[] = [];
  config.columns.forEach(c => {
    if(c.visible()) {
      cols.push(c.width ? c.width : '1fr')
    }
  })
  return cols.join(' ');
}

const generateTemplate = (state: Nullable<State>): string => {
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

const headerRow = (config: TableConfig): string => {
  const headers: string[] = [];

  config.columns.forEach(c => {
    if (c.visible()) {
      headers.push(header(c));
    }
  })

  return `
    <div class="row header">
      ${ headers.join('') }
    </div>
  `;
}

const header = (col: Column): string => {
  return `<span class="cell header">${ col.label() }</span>`
}

const dataRows = (config: TableConfig): string => {
  const rows: string[] = [];
  const { data, columns } = config;
  data.forEach(record => {
    let cells: string[] = [];
    for (const key in record) {
      const foundCol = columns.find(col => col.dataField === key);
      if (foundCol) {
        cells.push(cell(foundCol, config, record, key));
      }
    }
    rows.push(`<div class="row data ${ config.showBorders ? 'bordered': ''}">${ cells.join('') }</div>`)
  })
  return `<div class="data-wrapper">${ rows.join('') }</div>`;
}

const cell = (
  col: Column,
  config: TableConfig,
  record: any,
  key: string | number
): string => {
  let result = '';
  if (col.visible()) {
    if (col.editable) {
      result = editor(config, col, record, key);
    } else {
      const width = window.innerWidth;
      switch (true) {
        case width <= config.smallSize:
          if (col.templateFnSm) {
            result = col.templateFnSm(config, record);
          } else {
            result = defaultCell(config, record, key);
          }
          break;
        case width <= config.mediumSize:
          if (col.templateFnMd) {
            result = col.templateFnMd(config, record);
          } else {
            result = defaultCell(config, record, key);
          }
          break;
        default: 
          if (col.templateFn) {
            result = col.templateFn(config, record);
          } else {
            result = defaultCell(config, record, key);
          }
          break;
      }
    }
  }
  return result;
}

const editor = (config: TableConfig, col: Column, record: any, key: number | string): string => {
  return `
    <input
      type="text"
      class="cell data editor ${ config.showBorders ? 'bordered': ''}"
      data-field="${ col.dataField }"
      data-id="${ record.id }"
      value="${ record[key] }"/>
  `
}

const defaultCell = (config: TableConfig, record: any, key: number | string): string => {
  return `<span class="cell data ${ config.showBorders ? 'bordered': ''}">${ record[key] }</span>`;
}

export {
  defaultProps,
  defaultState,
  generateStyles,
  generateTemplate,
  Props,
  State
}