import {
  Box,
  Drawer,
  List,
  ListItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { DataTable } from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

type TProps = {
  Open: boolean;
  onClose: () => void;
  data: any[];
  extraData?: {
    requirements: string;
    attachFile: string;
  };
};

export const ViewListProductDrawer: React.FC<TProps> = ({
  Open,
  onClose,
  data,
  extraData,
}) => {
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
      field: "importProductPrice",
      headerName: "Giá trị xuất kho",
      minWidth: 200,
      renderCell: ({ row }) => _format.getVND(row?.importProductPrice),
    },
    {
      field: "price",
      headerName: "Giá bán",
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
      headerName: "Thuế GTGT(%)",
      minWidth: 150,
    },
    {
      field: "totalPrice",
      headerName: "Tổng giá bán",
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

  const renderExtraData = useCallback(() => {
    if (!!extraData) {
      const { requirements, attachFile } = extraData || {};

      const fileList = attachFile?.split(",");

      return (
        <Box className="p-4">
          <Box>
            <span className="font-semibold">Yêu cầu bổ sung:</span>{" "}
            {requirements}
          </Box>
          <Box>
            <span className="font-semibold">File đính kèm: </span>
            {!attachFile && (
              <span className="text-xs">(Không có file đính kèm)</span>
            )}
          </Box>
          <List>
            {!!attachFile &&
              fileList.map((file: string) => (
                <ListItem key={file}>
                  <a
                    href={file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate"
                  >
                    {file}
                  </a>
                </ListItem>
              ))}
          </List>
        </Box>
      );
    }
  }, [extraData]);

  return (
    <Drawer anchor={"bottom"} open={Open} onClose={onClose}>
      {renderExtraData()}
      <Box className="w-full mb-4 pb-4">
        <Typography className="p-3 font-semibold text-sm">
          DANH SÁCH SẢN PHẨM
        </Typography>

        <DataTable
          rows={data}
          columns={columns}
          hideFooter
          hideSearchbar
          autoHeight
        />
      </Box>
    </Drawer>
  );
};
