import { GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Popper,
} from "@mui/material";
import { ReactNode, useState } from "react";

const defaultColumnProps: Partial<GridColDef> = {
  flex: 1,
  // it indicates that a column has fluid width. Range [0, ∞).
  filterable: false,
  // If `true`, the column is filterable.
  hideSortIcons: true,
  // Toggle the visibility of the sort icons.
  disableColumnMenu: true,
  //If `true`, the column menu is disabled for this column.
  sortable: false,
  // If `true`, the column is sortable.
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

// export const renderFilterHeader = (
//   data: GridColumnHeaderParams<any, any, any>,
//   Component: ReactNode
// ) => {
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorEl(anchorEl ? null : event.currentTarget);
//   };

//   const open = Boolean(anchorEl);

//   return (
//     <div className="flex items-center">
//       <span className="mr-2">{data.colDef.headerName}</span>

//       <button
//         type="button"
//         onClick={handleClick}
//         className="border-0"
//       >
//         {open ? <CloseIcon /> : <FilterListIcon />}
//       </button>

//       <Popper open={open} anchorEl={anchorEl} sx={{ p: 1, background: "#fff", boxShadow: 2,  borderRadius: "8px"}}>
//         <Box>
//           {Component}
//         </Box>
//       </Popper>
//     </div>
//   );
// };
