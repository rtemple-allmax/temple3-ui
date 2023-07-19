import { TableConfig } from "../../core/types/table.types";
import { Nullable } from "../../core/utils/nullable";

enum Views {
  TABLE = 'table',
  CHART = 'chart'
}

enum Controls {
  NONE = 'none',
  CHART = 'chart',
  FILTER = 'filter',
  SEARCH = 'search',
  GROUP = 'group'
}

enum Constants {
  VIEW_BTN_ID = 'switch-view-button',
  FILTER_BTN_ID = 'filter-button',
  SEARCH_BTN_ID = 'search-button',
  CHART_BAR_BTN_ID = 'chart-bar-button',
  CHART_LINE_BTN_ID = 'chart-line-button',
  CHART_DOUGHNUT_BTN_ID = 'chart-doughnut-button',
  CHART_PIE_BTN_ID = 'chart-pie-button',
  CLOSE_CONTROLS_BTN_ID = 'close-controls-button',
  TABLE_BTN_ID = 'table-button'
}

enum ChartTypes {
  BAR = 'bar',
  LINE = 'line',
  BUBBLE = 'bubble',
  DOUGHNUT = 'doughnut',
  PIE = 'pie',
  POLAR_AREA = 'polarArea',
  RADAR = 'radar',
  SCATTER = 'scatter'
}

interface Props { initial: boolean; }

interface State {
  view: Views;
  availableControls: Controls;
  config: TableConfig;
  chartType: ChartTypes 
}

const defaultProps: Props = { initial: true };
const defaultState: State = {
  view: Views.TABLE,
  availableControls: Controls.NONE,
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
  },
  chartType: ChartTypes.BAR
};

const generateTemplate = (state: State): string => {  
  return `
    <div class="data-view-wrapper">
      ${ header() }
      ${ controlPanel(state) }
      ${ content(state) }
    </div>
  `;
};

const generateStyle = (state: State): string => {
  return `
    .header {
      background-color: var(--app-color);
      padding: var(--space-md);
    }
    .control-panel-anchor {
      height: 0;
      position: relative;
    }
    .control-panel {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      display: ${ state.availableControls === Controls.NONE ? 'none': 'block' };
      height: 20vh;
      background: white;
      border-radius: 0 0 5px 5px;
      box-shadow: var(--shadow);
      z-index: 2;
    }
    .ctrl-btn {
      background: transparent;
      border: none;
      outline: 0;
      cursor: pointer;
      border-bottom: 3px solid transparent;
    }
    .ctrl-btn.active {
      border-color: var(--app-color);
    }

    #${ Constants.CLOSE_CONTROLS_BTN_ID} {
      position: absolute;
      top: var(--space-md);
      right: var(--space-md);
    }
    .view-controls-wrapper {
      padding: var(--space-md);
      display: ${ state.availableControls === Controls.CHART ? 'block': 'none' };
    }
    .content-wrapper {
      height: 60vh;
      background-color: white;
    }
    .table-wrapper {
      display: ${ state.view === Views.TABLE ? 'block': 'none' };
    }
    .chart-wrapper {
      display: ${ state.view === Views.CHART ? 'block': 'none' };
    }
  `;
};

const header = (): string => {
  return `
    <div class="header">
      <nxt-flex gap="var(--space-md)" height="30px">
        <button
          class="ctrl-btn"
          id="${ Constants.VIEW_BTN_ID }">
          <nxt-icon
            icon="fa-solid fa-magnifying-glass-chart"
            size="1.7rem"
            color="var(--app-color-text-color)">
          </nxt-icon>
        </button>
        <button
          class="ctrl-btn"
          id="${ Constants.FILTER_BTN_ID }">
          <nxt-icon
            icon="fa-solid fa-filter"
            size="1.7rem"
            color="var(--app-color-text-color)">
          </nxt-icon>
        </button>
        <button
          class="ctrl-btn"
          id="${ Constants.SEARCH_BTN_ID }">
          <nxt-icon
            icon="fa-solid fa-magnifying-glass"
            size="1.7rem"
            color="var(--app-color-text-color)">
          </nxt-icon>
        </button>
      </nxt-flex>
    </div>
  `;
};

const controlPanel = (state: State): string => {
  return `
    <div class="control-panel-anchor">
      <div class="control-panel">
        <div class="view-controls-wrapper">
          ${ viewControls(state) }
        </div>
        <button
          class="ctrl-btn"
          id="${ Constants.CLOSE_CONTROLS_BTN_ID }">
          <nxt-icon
            icon="fa-solid fa-xmark"
            size="1.3rem"
            color="var(--app-color)">
          </nxt-icon>
        </button>
      </div>
    </div>
  `;
}

const viewControls = (state: State): string => {
  return `
    <nxt-flex gap="var(--space-md)">
      <button
        class="ctrl-btn ${ state.view === Views.TABLE ? 'active' : '' }"
        id="${ Constants.TABLE_BTN_ID }">
        <nxt-icon
          icon="fa-solid fa-table-columns"
          size="1.3rem"
          color="var(--app-color)">
        </nxt-icon>
      </button>
      <button
        class="ctrl-btn ${ state.view === Views.CHART && state.chartType === ChartTypes.BAR ? 'active' : '' }"
        id="${ Constants.CHART_BAR_BTN_ID }">
        <nxt-icon
          icon="fa-solid fa-chart-simple"
          size="1.3rem"
          color="var(--app-color)">
        </nxt-icon>
      </button>
      <button
        class="ctrl-btn ${ state.view === Views.CHART && state.chartType === ChartTypes.LINE ? 'active' : '' }"
        id="${ Constants.CHART_LINE_BTN_ID }">
        <nxt-icon
          icon="fa-solid fa-chart-line"
          size="1.3rem"
          color="var(--app-color)">
        </nxt-icon>
      </button>
      <button
        class="ctrl-btn ${ state.view === Views.CHART && state.chartType === ChartTypes.PIE ? 'active' : '' }"
        id="${ Constants.CHART_PIE_BTN_ID }">
        <nxt-icon
          icon="fa-solid fa-chart-pie"
          size="1.3rem"
          color="var(--app-color)">
        </nxt-icon>
      </button>
    </nxt-flex>
  `;
}

const content = (state: State): string => {
  return `
    <div class="content-wrapper">
      <div class="table-wrapper">
        <nxt-data-grid id="table"/>
      </div>
      <div class="chart-wrapper">
        <nxt-data-chart id="chart" type="${ state.chartType }" label-expr="name" value-expr="age" label="Ages"/>
      </div>
    </div>
  `;
}

export {
  ChartTypes,
  Constants,
  Controls,
  defaultProps,
  defaultState,
  Props,
  State,
  generateStyle,
  generateTemplate,
  Views
}