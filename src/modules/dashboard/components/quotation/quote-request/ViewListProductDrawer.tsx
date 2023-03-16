import { Box, Drawer, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataTable } from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { TGridColDef } from "~types/data-grid";

type TProps = {
  Open: boolean;
  onClose: () => void;
  data: any[];
};

export const ViewListProductDrawer: React.FC<TProps> = ({
  Open,
  onClose,
  data,
}) => {
  const [pagination, setPagination] = useState(defaultPagination);

  const columns: TGridColDef[] = [
    {
      field: "STT",
      headerName: "STT",
      width: 50,
      renderCell: ({ row }) =>
        data?.findIndex((item) => item?.id == row?.id) + 1,
    },
    {
      field: "productCode",
      headerName: "Mã SP",
      minWidth: 150,
    },
    {
      field: "productName",
      headerName: "Tên SP",
      minWidth: 200,
      flex: 1,
    },
    {
      field: "manufactor",
      headerName: "Hãng SX",
      minWidth: 150,
    },
    {
      field: "specs",
      headerName: "Quy cách",
      minWidth: 150,
    },
    {
      field: "unitName",
      headerName: "Đơn vị",
      minWidth: 150,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      minWidth: 150,
    },
    {
      field: "note",
      headerName: "Ghi chú",
      minWidth: 150,
    },
  ];

  return (
    <Drawer anchor={"bottom"} open={Open} onClose={onClose}>
      <Box className="w-[100%] mb-4">
        <Typography className="p-3 font-semibold text-sm">
          DANH SÁCH SẢN PHẨM
        </Typography>
        <DataTable
          rows={data}
          columns={columns}
          hideFooter
          hideSearchbar
          autoHeight
          paginationMode="client"
          gridProps={{
            loading: false,
            ...pagination,
          }}
        />
      </Box>
    </Drawer>
  );
};
