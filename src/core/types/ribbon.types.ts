enum RibbonSectionTypes {
  Row = 'row',
  Col = 'col',
  Single = 'single',
  Custom = 'custom'
}

interface RibbonData {
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

export { RibbonControl, RibbonData, RibbonSection, RibbonSectionTypes, RibbonTab };