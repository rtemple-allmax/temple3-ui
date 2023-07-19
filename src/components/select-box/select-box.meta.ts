import { ObservableBinding } from "../../core/types/observable-binding.type.js";
import { Nullable } from "../../core/utils/nullable.js";

interface Props { name: string; valueExpr: string; displayExpr: string;}
interface State { items: any[]; selectedIndex: number; }

const defaultProps: Props = { name: 'select', valueExpr: '', displayExpr: '' };
const defaultState: State = { items: [],  selectedIndex: 0 };

const generateTemplate = (props: Nullable<Props>, state: Nullable<State>): string => {
  if (props && state) {
    return  `
    <div class="wrapper"> 
      <select name="${ props.name }" id="${ props.name }"> 
        ${ options(props, state) }
      </select>
    </div>
  `;
  }
  return '';
};

const generateStyle = (): string => {
  return '';
};

const options = (props: Props, state: State): string => {
  const results: string[] = [];
  for(const x of state.items) {
    results.push(`<option value="${ x[props.valueExpr] }">${ x[props.displayExpr] }</option>`)
  }
  return results.join('');
}

export {
  defaultProps,
  defaultState,
  generateStyle,
  generateTemplate,
  Props,
  State
};