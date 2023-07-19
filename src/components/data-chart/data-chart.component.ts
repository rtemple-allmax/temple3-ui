import { ChartItem } from "chart.js";
import { Chart } from 'chart.js/auto'
import { Component } from "../../core/bases/component.base.js";
import { Props, State, defaultProps, defaultState, generateStyles, generateTemplate, Constants } from "./data-chart.meta.js";
import { combineLatest } from "rxjs";
import { SelectBoxComponent } from "../select-box/select-box.component.js";
import { TextBoxComponent } from "../text-box/text-box.component.js";

class DataChartComponent extends Component<Props, State> {
  private chart: any = null;

  private types = [
    { id: 'bar', name: 'Bar' },
    { id: 'line', name: 'Line' },
    { id: 'bubble', name: 'Bubble' },
    { id: 'doughnut', name: 'Doughnut' },
    { id: 'pie', name: 'Pie' },
    { id: 'polarArea', name: 'Polar Area' },
    { id: 'radar', name: 'Radar' },
    { id: 'scatter', name: 'Scatter' },
  ];
  
  constructor() {
    super(defaultProps, defaultState);
  }

  protected beforeInit(): void {
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
      const typeChooser = this.root.getElementById('type-chooser') as SelectBoxComponent;
      if (typeChooser) {
        typeChooser.hydrate(this.types);
        typeChooser.addEventListener('valueChanged', (e: Event) => {
          if (this.isCustomEvent(e)) {
            const val = (e as CustomEvent).detail as 'bar' | 'line' | 'bubble' | 'doughnut' | 'pie' | 'polarArea' | 'radar' | 'scatter';
            if (val) {
              this.setType(val);
            }
          }
        })
      }
    }
  }

  public hydrate(data: any[]): void {
    this.setState('data', data);
  }

  public setType(type: 'bar' | 'line' | 'bubble' | 'doughnut' | 'pie' | 'polarArea' | 'radar' | 'scatter'): void {
    if (this.props.value) {
      const altered = { ...this.props.value, type };
      this.props.value = altered;
    }
  }

  private isCustomEvent(event: Event): event is CustomEvent {
    return 'detail' in event;
  }
}

customElements.define('nxt-data-chart', DataChartComponent);

export { DataChartComponent };