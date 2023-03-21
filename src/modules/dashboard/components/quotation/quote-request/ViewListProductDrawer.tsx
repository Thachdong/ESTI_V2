import { Box, Drawer, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import { DataTable } from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
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
      field: "price",
      headerName: "Giá",
      minWidth: 150,
      renderCell: ({ row }) => _format.getVND(row?.price),
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      minWidth: 150,
    },
    {
      field: "vat",
      headerName: "Thuế GTGT",
      minWidth: 150,
    },
    {
      field: "totalPrice",
      headerName: "Thành tiền",
      minWidth: 120,
      renderCell: ({ row }) => {
        const { quantity, price, vat } = row || {};
  
        const total = quantity * price;
  
        const tax = (total * +vat) / 100;
  
        return (
          <Tooltip title={"Sau thuế: " + _format.getVND(total + tax)}>
            <Box>{_format.getVND(row.totalPrice)}</Box>
          </Tooltip>
        );
      },
    },
    {
      field: "note",
      headerName: "Ghi chú",
      minWidth: 150,
    },
  ];

  return (
    <Drawer anchor={"bottom"} open={Open} onClose={onClose}>
      <Box className="w-[100%] mb-4 pb-4">
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
