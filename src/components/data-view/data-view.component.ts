import { TableConfig } from "../../core/types/table.types";
import { Component } from "../../core/bases/component.base";
import { DataChartComponent } from "../data-chart/data-chart.component";
import { DataGridComponent } from "../data-grid/data-grid.component";
import { ChartTypes, Constants, Controls, Props, State, Views, defaultProps, defaultState, generateStyle, generateTemplate } from "./data-view.meta";

class DataViewComponent extends Component<Props, State> {
  constructor() {
    super(defaultProps, defaultState);
  }

  protected beforeInit(): void {
    this.state.value$.subscribe(state => {
      if (state) {
        this.setTemplate(generateTemplate(state))
        this.setStyle(generateStyle(state));
        this.render();
        (this.root?.getElementById('table') as DataGridComponent)?.setState('config', state.config);
        (this.root?.getElementById('chart') as DataChartComponent)?.hydrate(state.config.data);
      }
    });
  }

  protected afterRender(): void {
    this.root?.getElementById(Constants.VIEW_BTN_ID)?.addEventListener('click', () => this.setState('availableControls', Controls.CHART));
    this.root?.getElementById(Constants.CLOSE_CONTROLS_BTN_ID)?.addEventListener('click', () => this.setState('availableControls', Controls.NONE));
    this.root?.getElementById(Constants.TABLE_BTN_ID)?.addEventListener('click', () => this.replaceState({ view: Views.TABLE, availableControls: Controls.NONE }));
    this.root?.getElementById(Constants.CHART_BAR_BTN_ID)?.addEventListener('click', () => this.replaceState({ view: Views.CHART, chartType: ChartTypes.BAR, availableControls: Controls.NONE }));
    this.root?.getElementById(Constants.CHART_LINE_BTN_ID)?.addEventListener('click', () => this.replaceState({ view: Views.CHART, chartType: ChartTypes.LINE, availableControls: Controls.NONE }));
    this.root?.getElementById(Constants.CHART_PIE_BTN_ID)?.addEventListener('click', () => this.replaceState({ view: Views.CHART, chartType: ChartTypes.PIE, availableControls: Controls.NONE }));
  }

  public configure(config: TableConfig): void {
    this.setState('config', config);
  }
}

customElements.define('nxt-data-view', DataViewComponent);

export { DataViewComponent };