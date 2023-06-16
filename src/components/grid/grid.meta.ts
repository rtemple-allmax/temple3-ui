interface Props {
  columns: string;
  columnsSm: string;
  columnsMd: string;
}

const defaultProps: Props = {
  columns: 'repeat(3, 1fr)',
  columnsMd: 'repeat(2, 1fr)',
  columnsSm: '1fr'
};

const generateTemplate = (): string => {
  return `<slot class="grid-container"></slot>`
};

const generateStyle = (props: Props): string => {
  return `
    .grid-container {
      display: grid;
      padding: var(--space-md);
      gap: var(--space-md);
      grid-template-columns: ${ props.columns || 'repeat(3, 1fr)' };
    }

    @media (max-width: 1000px) {
      .grid-container {
        grid-template-columns: ${ props.columnsMd || props.columns || 'repeat(2, 1fr)' };
      }
    }

    @media (max-width: 600px) {
      .grid-container {
        grid-template-columns: ${ props.columnsSm || props.columnsMd || props.columns || '1fr' };
      }
    }
  `;
};

export {
  defaultProps,
  generateStyle,
  generateTemplate,
  Props
};