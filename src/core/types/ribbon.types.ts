enum RibbonSectionTypes {
  Row = 'row',
  Col = 'col',
  Single = 'single',
  Custom = 'custom'
}

interface RibbonConfig {
  tabs: RibbonTab[];
}

interface RibbonTab {
  label: string;
  active: boolean;
  sections: RibbonSection[];
}

interface RibbonSection {
  label: string;
  customTemplate?: string;
  type: RibbonSectionTypes;
  controls?: RibbonControl[];
}

interface RibbonControl {
  label: string;
  icon: string;
  handler: VoidFunction;
}

export { RibbonControl, RibbonConfig, RibbonSection, RibbonSectionTypes, RibbonTab };