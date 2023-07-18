import { ChartItem } from "chart.js";
import { Chart } from 'chart.js/auto'
import { Component } from "../../core/bases/component.base.js";
import { Props, State, defaultProps, defaultState, generateStyles, generateTemplate, Constants } from "./data-chart.meta.js";
import { combineLatest } from "rxjs";

class DataChartComponent extends Component<Props, State> {
  private chart: any = null;
  
  constructor() {
    super(defaultProps, defaultState);

    combineLatest([
      this.props.value$,
      this.state.value$
    ]).subscribe(([
      props,
      state
    ]) => {
      if (props && state) {
        this.setTemplate(generateTemplate(props, state));
        this.setStyle(generateStyles(props, state));
        this.render();
      }
    });
  }

  protected afterRender(): void {
    if (this.root && this.props.value && this.state.value) {
      const ctx = ((this.root.getElementById(Constants.TARGET_ID) as HTMLCanvasElement).getContext('2d') as ChartItem);
      this.chart = new Chart(
        ctx, 
        {
          type: this.props.value.type,
          data: {
            labels: this.state.value.data.map(record => record[(this.props.value as Props).labelExpr]),
            datasets: [
              {
                label: this.props.value.label,
                data: this.state.value.data.map(record => record[(this.props.value as Props).valueExpr])
              }
            ]
          }
        }
      )
    }
  }

  public hydrate(data: any[]): void {
    this.setState('data', data);
  }
}

customElements.define('nxt-data-chart', DataChartComponent);

export { DataChartComponent };