import { Nullable } from "../../core/utils/nullable.js";

interface Props { placeholder: string; eventname: string; }
interface State { bg: string; }

const defaultProps: Props = { placeholder: '', eventname: 'change' };
const defaultState: State = { bg: 'black' };

const generateTemplate = (props: Nullable<Props>, state: Nullable<State>): string => {
  return  `
    <div class="wrapper"> 
      <input class="input" type="text" placeholder="${ props?.placeholder }"/>
      <button class="test-btn">Test</button>
      <button class="test-btn2">Test2</button>
    </div>
    
  `;
};

const generateStyle = (props: Nullable<Props>, state: Nullable<State>): string => {
  if (state) {
    return `
    .wrapper {
      padding: 5rem;
      background-color: ${ state.bg };
    }
    .input {
      font-size: 2rem;
    }
    button {
      font-size: 2rem;
    }
  `;
  }
  return '';
};

export {
  defaultProps,
  defaultState,
  generateStyle,
  generateTemplate,
  Props,
  State
};