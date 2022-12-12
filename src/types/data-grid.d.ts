import { DataGridProps, GridColDef } from "@mui/x-data-grid";

type TDataGrid = DataGridProps & {
  rows?: any[];
  columns: any[];
  gridProps?: Partial<DataGridProps>;
};

type TGridColDef<TData = any> = GridColDef<TData> & {
  isSort?: boolean;
  sortAscValue?: number | string;
  sortDescValue?: number | string;
  isFilter?: boolean;
  filterKey?: string;
  options?: {value: string | number, label: string}[];
}