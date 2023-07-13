enum SortingState {
  None,
  Ascending,
  Descending
}

enum ColumnTypes {
  none,
  text,
  number,
  boolean,
  control,
  selection,
  date,
  currency
}

interface Column {
  label: () => string;
  dataField: string;
  type: ColumnTypes;
  sortIndex: number;
  sortingState: SortingState;
  width?: string;
  editable: boolean;
  visible: () => boolean;
  templateFn?: (state: any, record: any) => string;
  templateFnMd?: (state: any, record: any) => string;
  templateFnSm?: (state: any, record: any) => string;
}

interface TableConfig {
  name: string;
  width?: string;
  maxHeight?: string;
  maxHeightMd?: string;
  maxHeightSm?: string;
  showBorders: boolean;
  alternation: boolean;
  data: any[];
  columns: Column[];
  showFilter: boolean,
  filterExpr: string;
  filterValue: string;
  mediumSize: number;
  smallSize: number;
}

export {
  Column,
  ColumnTypes,
  SortingState,
  TableConfig
}