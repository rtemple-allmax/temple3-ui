import { Nullable } from "../../core/utils/nullable";

interface Props {
  icon: string;
  size?: string;
  color?: string;
  padding?: string;
}

interface State {
  initial: boolean;
}

const defaultProps: Props = { icon: '' };
const defaultState: State = { initial: true };

const generateTemplate = (props: Nullable<Props>, state: Nullable<State>): string => {
  if (props) { return `<i class="icon ${ props.icon }"></i>`; }
  return '';
};

const generateStyle = (props: Nullable<Props>, state: Nullable<State>): string => {
  if (props) {
    return `
      .icon {
        font-size: ${ props.size || '1rem' };
        color: ${ props.color || 'black' };
        padding: ${ props.padding || '0' };
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