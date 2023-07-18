import { Nullable } from "../../core/utils/nullable.js";

enum Constants {
  TARGET_ID = 'target'
}

interface Props {
  label: string;
  labelExpr: string;
  valueExpr: string;
  type: 'bar' | 'line' | 'bubble' | 'doughnut' | 'pie' | 'polarArea' | 'radar' | 'scatter';
}

interface State { data: any[] }

const defaultProps: Props = {
  label: 'Acquisitions by year',
  labelExpr: 'year',
  valueExpr: 'count',
  type: 'bar'
};
const defaultState: State = {
  data: [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ]
};

const generateTemplate = (props: Nullable<Props>, state: Nullable<State>): string => {
  return `
    <div class="wrapper">
      <canvas id="${ Constants.TARGET_ID }"></canvas>
    </div>
  `;
}

const generateStyles = (props: Nullable<Props>, state: Nullable<State>): string => {
  return `
    .wrapper {
      background-color: white;
      max-height: 60vh;
    }
  `;
}

export {
  Constants,
  defaultProps,
  defaultState,
  Props,
  State,
  generateStyles,
  generateTemplate
}