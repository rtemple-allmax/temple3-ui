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
  name: string;
  type: ColumnTypes;
}

interface TableConfig {
  data: any[];
  columns: Column[];
}

export {
  Column,
  ColumnTypes,
  TableConfig
}