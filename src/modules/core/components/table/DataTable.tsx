import { Box, LinearProgress } from "@mui/material";
import { DataGrid, DataGridProps, viVN } from "@mui/x-data-grid";
import { TDataGrid } from "~types/data-grid";
import { NoRowsOverlay } from "./NoRowsOverlay";
import { generateColumn } from "./utility";
import styles from "~modules-core/styles/data-table.module.css";
import clsx from "clsx";

const defaultDataGridProps: Partial<DataGridProps> = {
  rowsPerPageOptions: [5, 10, 20, 50, 100],
  localeText: viVN.components.MuiDataGrid.defaultProps.localeText,
  components: {
    LoadingOverlay: LinearProgress,
    NoRowsOverlay: NoRowsOverlay,
  },
  disableSelectionOnClick: true,
  filterMode: "server",
  paginationMode: "server",
  sortingMode: "server",
  autoHeight: true,
  headerHeight: 96,
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
    <Box className={clsx(styles["data-table"], "w-full overflow-x-auto")}>
      <DataGrid
        {...defaultDataGridProps}
        {...gridProps}
        rows={rows || []}
        columns={fullColumns}
        className="h-100"
        onSortModelChange={(props) => console.log(props)}
      />
    </Box>
  );
};
