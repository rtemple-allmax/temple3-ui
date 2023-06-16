import { Component } from "../core/bases/component.base";

interface Props {
  height: string;
  justifyContent: string,
  alignItems: string;
}

class FlexComponent extends Component<Props, {}> {
  afterInit(props: Props, state: {}): void {
    const templateString = '<slot></slot>';
    const styleString = `
      :host {
        height: ${ props.height || 'auto' };
      }
      slot {
        display: flex;
        height: 100%;
        justify-content: ${ props.justifyContent || 'flex-start' };
        align-items: ${ props.alignItems || 'flex-start' };
      }
    `;
    this.setTemplate(templateString);
    this.setStyle(styleString);
  }
  
}

export { FlexComponent };
