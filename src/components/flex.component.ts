import { Component } from "../core/bases/component.base";

interface Props {
  height: string;
  justifyContent: string,
  alignItems: string;
}

class FlexComponent extends Component<Props, {}> {
  afterInit(): void {
    const { currentProps } = this;
    if (currentProps) {
      const templateString = '<slot></slot>';
      const styleString = `
        :host {
          height: ${ currentProps.height || 'auto' };
        }
        slot {
          display: flex;
          height: 100%;
          justify-content: ${ currentProps.justifyContent || 'flex-start' };
          align-items: ${ currentProps.alignItems || 'flex-start' };
        }
      `;
      this.setTemplate(templateString);
      this.setStyle(styleString);
    }
  }
}

export { FlexComponent };
