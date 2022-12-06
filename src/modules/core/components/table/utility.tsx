import { GridColDef } from "@mui/x-data-grid";

const defaultColumnProps: Partial<GridColDef> = {
  flex: 1,
  // it indicates that a column has fluid width. Range [0, ∞).
  filterable: false,
  // If `true`, the column is filterable.
  hideSortIcons: false,
  // Toggle the visibility of the sort icons.
  disableColumnMenu: false,
  //If `true`, the column menu is disabled for this column.
  sortable: false,
  // If `true`, the column is sortable.
  headerClassName: "bg-main !text-white text-sm !font-normal",
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
