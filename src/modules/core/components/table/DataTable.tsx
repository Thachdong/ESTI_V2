import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";
import { Box, LinearProgress } from "@mui/material";
import { DataGrid, DataGridProps, viVN } from "@mui/x-data-grid";
import PlusIcon from "@mui/icons-material/AddRounded";
import MinusIcon from "@mui/icons-material/RemoveRounded";

import { TDataGrid, TGridColDef } from "~types/data-grid";
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
  columns: rawCols,
  rows,
  gridProps,
  hideSearchbar,
  expandable,
  ...props
}) => {
  // LOCAL STATES
  const [columns, setColumns] = useState<TGridColDef[]>([]);

  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  // METHODS
  const handleExpand = useCallback((id: string) => {
    setExpandedRows((prev) => [...prev, id]);
  }, []);

  const handleUnExpand = useCallback((id: string) => {
    setExpandedRows((prev) => prev.filter((key) => key !== id));
  }, []);

  const handleColumns = useCallback(() => {
    const cols = rawCols?.map((col) => {
      const column = generateColumn(col);

      if (hideSearchbar) {
        delete column["renderHeader"];

        column.headerClassName = "!bg-[#9FADBB] text-white px-2 font-bold";
      }

      return column;
    });

    const expandCol: TGridColDef = {
      field: "expandColumn",
      headerName: "",
      width: 28,
      isFilter: false,
      isSort: false,
      renderCell: ({ row }) =>
        expandedRows.includes(row.id) ? (
          <MinusIcon onClick={() => handleUnExpand(row.id)} />
        ) : (
          <PlusIcon onClick={() => handleExpand(row.id)} />
        ),
    };

    if (expandable === true) {
      setColumns([generateColumn(expandCol), ...cols]);
    } else {
      setColumns(cols);
    }
  }, [rawCols, expandable, expandedRows]);

  // SIDE EFFECTS
  useEffect(() => {
    handleColumns();
  }, [rawCols, expandable, expandedRows]);

  return (
    <Box
      className={clsx(
        "data-table-container w-full overflow-auto flex-grow h-full"
      )}
    >
      <DataGrid
        headerHeight={hideSearchbar ? 32 : 64}
        getRowHeight={() => "auto"}
        rows={rows || []}
        columns={columns}
        scrollbarSize={5}
        getRowClassName={({ id }) =>
          expandedRows.includes(id as string)
            ? "expanded-row relative mb-[150px]"
            : ""
        }
        {...defaultDataGridProps}
        {...gridProps}
        {...props}
      />
    </Box>
  );
};
