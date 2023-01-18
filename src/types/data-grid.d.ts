import { DataGridProps, GridColDef } from "@mui/x-data-grid";
import { ReactNode } from "react";

type TDataGrid = DataGridProps & {
  rows?: any[];
  columns?: TGridColDef[];
  gridProps?: Partial<DataGridProps>;
  hideSearchbar?: boolean;
  expandable?: boolean;
  generateExpandContent?: (data: any) => ReactNode;
};

type TGridColDef<TData = any> = GridColDef<TData> & {
  isSort?: boolean;
  sortKey?: string;
  sortAscValue?: number | string;
  sortDescValue?: number | string;
  isFilter?: boolean;
  filterKey?: string;
  options?: {value: string | number, label: string}[];
}