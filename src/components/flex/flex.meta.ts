interface Props {
  height: string;
  justifyContent: string,
  alignItems: string;
  padding: string;
}

const defaultProps: Props = {
  height: 'auto',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '0'
}

const generateTemplate = (): string => { return `<slot></slot>` };
const generateStyle = (props: Props): string => {
  return `
    :host {
      height: ${ props.height};
    }
    slot {
      display: flex;
      height: 100%;
      padding: ${ props.padding };
      justify-content: ${ props.justifyContent };
      align-items: ${ props.alignItems };
    }
  `
}

export {
  defaultProps,
  generateStyle,
  generateTemplate,
  Props
};