import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { FormInputBase } from "../form-bases";
import styles from "~modules-core/styles/data-table.module.css";
import clsx from "clsx";

const defaultColumnProps: Partial<GridColDef> = {
  flex: 1,
  // it indicates that a column has fluid width. Range [0, ∞).
  filterable: false,
  // If `true`, the column is filterable.
  hideSortIcons: true,
  // Toggle the visibility of the sort icons.
  disableColumnMenu: false,
  //If `true`, the column menu is disabled for this column.
  sortable: false,
  // If `true`, the column is sortable.
  // headerClassName: "bg-main !text-white text-sm !font-normal",
  headerClassName: "h-full !p-0",
  renderHeader: (props: any) => {
    const { type, headerName } = props?.colDef || {};
    // console.log(type, headerName);
    return (
      <Box className={clsx(styles["filterable-header"], "flex flex-col")}>
        <Typography className="h-1/2">{headerName}</Typography>
        <FormInputBase className={clsx(styles["search-box"])} variant="standard" />
      </Box>
    );
  },
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
