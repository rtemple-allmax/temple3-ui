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
  label: string;
  dataField: string;
  type: ColumnTypes;
  sortIndex: number;
  sortingState: SortingState;
  width?: string;
}

interface TableConfig {
  name: string;
  width?: string;
  maxHeight?: string;
  maxHeightSm?: string;
  data: any[];
  columns: Column[];
}

export {
  Column,
  ColumnTypes,
  SortingState,
  TableConfig
}