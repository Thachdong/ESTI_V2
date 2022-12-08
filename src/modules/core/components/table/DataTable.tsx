import clsx from "clsx";
import React from "react";
import { Box, LinearProgress } from "@mui/material";
import { DataGrid, DataGridProps, viVN } from "@mui/x-data-grid";
import { TDataGrid } from "~types/data-grid";
import { NoRowsOverlay } from "./NoRowsOverlay";
import { generateColumn } from "./utility";
import "~modules-core/styles/data-table.module.css";

const defaultDataGridProps: Partial<DataGridProps> = {
  rowsPerPageOptions: [5, 10, 20, 50, 100],
  localeText: viVN.components.MuiDataGrid.defaultProps.localeText,
  components: {
    LoadingOverlay: LinearProgress,
    NoRowsOverlay: NoRowsOverlay,
    ColumnsPanel: () => <Box>ColumnsPanel</Box>
  },
  disableSelectionOnClick: true,
  filterMode: "server",
  paginationMode: "server",
  sortingMode: "server",
  autoHeight: true,
  headerHeight: 64,
  showColumnRightBorder: true,
  showCellRightBorder: true,
};

export const DataTable: React.FC<TDataGrid> = ({
  columns,
  rows,
  gridProps,
}) => {
  const fullColumns = columns?.map((col) => generateColumn(col));

  return (
    <Box className={clsx("w-full overflow-x-auto")}>
      <DataGrid
        {...defaultDataGridProps}
        {...gridProps}
        rows={rows || []}
        columns={fullColumns}
        className="h-100"
      />
    </Box>
  );
};
