import { Box, LinearProgress } from "@mui/material";
import { DataGrid, DataGridProps, viVN } from "@mui/x-data-grid";
import { TDataGrid } from "~types/data-grid";
import { NoRowsOverlay } from "./NoRowsOverlay";
import { generateColumn } from "./utility";

const defaultDataGridProps: Partial<DataGridProps> = {
  rowsPerPageOptions: [5, 10, 20, 50, 100],
  localeText: viVN.components.MuiDataGrid.defaultProps.localeText,
  components: { LoadingOverlay: LinearProgress, NoRowsOverlay: NoRowsOverlay },
  disableSelectionOnClick: true,
  filterMode: "server",
  paginationMode: "server",
  autoHeight: true,
  headerHeight: 42,
};

export const DataTable: React.FC<TDataGrid> = ({
  columns,
  rows,
  gridProps,
}) => {
  const fullColumns = columns?.map((col) => generateColumn(col));

  return (
    <Box className="w-full overflow-x-auto">
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
