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
}

interface TableConfig {
  data: any[];
  columns: Column[];
}

export {
  Column,
  ColumnTypes,
  SortingState,
  TableConfig
}