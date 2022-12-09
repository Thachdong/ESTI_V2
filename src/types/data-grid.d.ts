import { DataGridProps, GridColDef } from "@mui/x-data-grid";

type TDataGrid = DataGridProps & {
  rows?: any[];
  columns: any[];
  gridProps?: Partial<DataGridProps>;
};

type TGridColDef = GridColDef & {
  isSort?: boolean;
  sortAscValue?: number | string;
  sortDescValue?: number | string;
  isFilter?: boolean;
  filterKey?: string;
}