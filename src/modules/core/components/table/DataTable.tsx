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
  },
  disableSelectionOnClick: true,
  // filterMode: "server",
  paginationMode: "server",
  // sortingMode: "server",
  // showColumnRightBorder: true,
  // showCellRightBorder: true,
};

export const DataTable: React.FC<TDataGrid> = ({
  columns,
  rows,
  gridProps,
  hideSearchbar,
  ...props
}) => {
  const fullColumns = columns?.map((col) => {
    const column = generateColumn(col);

    if (hideSearchbar) {
      delete column["renderHeader"];

      column.headerClassName = "bg-main text-white px-2";
    }

    return column;
  });

  return (
    <Box
      className={clsx(
        "data-table-container w-full overflow-auto flex-grow h-full"
      )}
    >
      <DataGrid
        headerHeight={hideSearchbar ? 32 : 64}
        getRowHeight={() => "auto"}
        {...defaultDataGridProps}
        {...gridProps}
        {...props}
        rows={rows || []}
        columns={fullColumns}
        scrollbarSize={5}
      />
    </Box>
  );
};
