interface Props {
  maxHeight: string;
}

const defaultProps: Props = { maxHeight: 'auto' };

const generateTemplate = (): string => {
  return `
    <div class="scroll-wrapper">
      <div class="scroll-container">
        <slot></slot>
      </div>
    </div>
  `;
};
const generateStyle = (props: Props): string => {
  return `
    :host {
      height: 100%;
    }
    .scroll-wrapper {
      padding: var(--space-md);
      height: 100%;
    }

    .scroll-container {
      overflow-y: auto;
      overflow-x: hidden;
      height: auto;
      max-height: calc(${ props.maxHeight || 'none' } - (var(--space-md) * 2));
    }
    
    .scroll-container::-webkit-scrollbar {
      width: 5px;
      background: var(--scrollbar-base-color);
      visibility: hidden;
    }
    
    .scroll-container::-webkit-scrollbar-thumb {
      background: var(--scrollbar-thumb-color);
      border-radius: 4px;
      visibility: hidden;
    }

    .scroll-container:hover::-webkit-scrollbar, .scroll-container:hover::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  `;
};

export {
  defaultProps,
  generateStyle,
  generateTemplate,
  Props
};