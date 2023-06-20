import { ForConfig } from "../../core/types/for.types";

interface State {
  config: ForConfig
}

const defaultState = {
  config: {
    items: [],
    template: (item: any) => '',
    style: '',
  }
};

const generateTemplate = (state: State): string => {
  return `
    <style>${ state.config.style }</style>
    ${ state.config.items.map(x => state.config.template(x)).join('')}
  `;
};

export { defaultState, generateTemplate, State };