interface State {
  render: boolean
}

const defaultState: State = { render: false };

const generateTemplate = (state: State): string => {
  if (state.render) {
    return `<slot></slot>`;
  }

  return '';
};

export { defaultState, generateTemplate, State }
