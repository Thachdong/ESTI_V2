import clsx from "clsx";
import React from "react";
import { Box, LinearProgress } from "@mui/material";
import {
  DataGrid,
  DataGridProps,
  viVN,
  GridToolbarColumnsButton,
  GridToolbarContainer,
} from "@mui/x-data-grid";
import { TDataGrid } from "~types/data-grid";
import { NoRowsOverlay } from "./NoRowsOverlay";
import { generateColumn } from "./utility";
import "~modules-core/styles/data-table.module.css";
import SettingsIcon from "@mui/icons-material/Settings";

const defaultDataGridProps: Partial<DataGridProps> = {
  rowsPerPageOptions: [5, 10, 20, 50, 100],
  localeText: viVN.components.MuiDataGrid.defaultProps.localeText,
  components: {
    LoadingOverlay: LinearProgress,
    NoRowsOverlay: NoRowsOverlay,
    // Toolbar: () => (
    //   <GridToolbarContainer>
    //     <GridToolbarColumnsButton startIcon={<SettingsIcon />} />
    //   </GridToolbarContainer>
    // ),
  },
  disableSelectionOnClick: true,
  filterMode: "server",
  paginationMode: "server",
  sortingMode: "server",
  headerHeight: 64,
  showColumnRightBorder: true,
  showCellRightBorder: true,
};

export const DataTable: React.FC<TDataGrid> = ({
  columns,
  rows,
  gridProps,
  ...props
}) => {
  const fullColumns = columns?.map((col) => generateColumn(col));

  return (
    <Box className={clsx("w-full overflow-auto flex-grow h-full")}>
      <DataGrid
        {...defaultDataGridProps}
        // localeText={{
        //   ...defaultDataGridProps.localeText,
        //   toolbarColumns: "Cài đặt",
        // }}
        {...gridProps}
        {...props}
        rows={rows || []}
        columns={fullColumns}
        scrollbarSize={5}
      />
    </Box>
  );
};
