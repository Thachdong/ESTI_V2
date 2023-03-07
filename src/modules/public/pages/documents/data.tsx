import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import { TGridColDef } from "~types/data-grid";

export const documentColumns: TGridColDef[] = [
  {
    field: "productCode",
    headerName: "Mã sản phẩm",
    minWidth: 150,
    flex: 1,
    isSort: false,
  },
  {
    field: "productName",
    headerName: "Tên sản phẩm",
    minWidth: 150,
    flex: 1,
    isSort: false,
  },
  {
    field: "lotNumber",
    headerName: "LOT #",
    minWidth: 150,
    isSort: false,
  },
  {
    field: "documentTypeName",
    headerName: "Loại tài liệu",
    minWidth: 150,
    isSort: false,
  },
  {
    field: "attachFiles",
    headerName: "File Download",
    minWidth: 150,
    isSort: false,
    renderCell: ({ row }) => (
      <Stack>
        {row.attachFiles?.map?.((file: string, index: number) => (
          <Box key={index} className="truncate">
            <a href={file}>{file}</a>
          </Box>
        ))}
      </Stack>
    ),
  },
];
