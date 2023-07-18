import { Nullable } from "../../core/utils/nullable.js";

interface Props { placeholder: string; eventname: string; }
interface State { bg: string; }

const defaultProps: Props = { placeholder: '', eventname: 'change' };
const defaultState: State = { bg: 'black' };

const generateTemplate = (props: Nullable<Props>): string => {
  return  `
    <div class="wrapper"> 
      <input class="input" type="text" placeholder="${ props?.placeholder }"/>
    </div>
    
  `;
};

const generateStyle = (): string => {
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