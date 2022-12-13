import { GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import clsx from "clsx";
import { TGridColDef } from "~types/data-grid";
import { CustomHeader } from "./CustomHeader";

// CHÚ Ý: KHÔNG TỰ Ý ĐỔI GIÁ TRỊ CÁC TRƯỜNG:
// filterable, disableColumnMenu, sortable, disableColumnMenu
// MANY THANKS!
const defaultColumnProps: Partial<TGridColDef> = {
  // flex: 0.5,
  // it indicates that a column has fluid width. Range [0, ∞).
  filterable: false,
  // If `true`, the column is filterable.
  hideSortIcons: true,
  // Toggle the visibility of the sort icons.
  disableColumnMenu: true,
  //If `true`, the column menu is disabled for this column.
  sortable: false,
  // If `true`, the column is sortable.
  headerClassName: clsx("p-0"),
  isFilter: true,
  isSort: true,
  renderHeader: (params: GridColumnHeaderParams) => (
    <CustomHeader params={params} />
  ),
};

export const generateColumn = (props: GridColDef) => ({
  ...defaultColumnProps,
  ...props,
});

export const generatePaginationProps = (
  pagination: TPagination,
  setPagination: React.Dispatch<React.SetStateAction<TPagination>>
) => ({
  pageSize: pagination.pageSize,

  rowCount: pagination.total,

  page: pagination.pageIndex - 1,

  onPageChange: (newPage: number) =>
    setPagination((old) => ({ ...old, pageIndex: newPage + 1 })),

  onPageSizeChange: (newPageSize: number) =>
    setPagination((old) => ({ ...old, pageSize: newPageSize })),
});
