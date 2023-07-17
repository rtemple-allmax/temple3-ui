import { Nullable } from "../../core/utils/nullable.js";

interface Props { placeholder: string; eventname: string; }
interface State { value: string; focused: boolean; }

const defaultProps: Props = { placeholder: '', eventname: 'change' };
const defaultState: State = { value: '', focused: false };

const generateTemplate = (props: Nullable<Props>, state: Nullable<State>): string => {
  return  `
    <input class="input" type="text" placeholder="${ props?.placeholder }" value="${ state?.value }"/>
    <p>${ state?.value }</p>  
  `;
};

const generateStyle = (props: Nullable<Props>, state: Nullable<State>): string => {
  return ``;
};

export {
  defaultProps,
  defaultState,
  generateStyle,
  generateTemplate,
  Props,
  State
};