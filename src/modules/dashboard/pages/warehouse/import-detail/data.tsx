import { Box, Tooltip } from "@mui/material";
import moment from "moment";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const productColumns: TGridColDef[] = [
  {
    field: "no",
    headerName: "STT",
    width: 50,
    align: "center",
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    minWidth: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    minWidth: 150,
    flex: 1,
  },
  {
    field: "manufactor",
    headerName: "Hãng SX",
    minWidth: 100,
  },
  {
    field: "specs",
    headerName: "Quy cách",
    width: 100,
  },
  {
    field: "unitName",
    headerName: "Đơn vị",
    width: 75,
  },
  {
    field: "quantity",
    headerName: "SL",
    width: 50,
  },
  {
    field: "price",
    headerName: "Giá",
    minWidth: 120,
    renderCell: ({ row }) => _format.getVND(row?.price),
  },
  {
    field: "vat",
    headerName: "Thuế GTGT",
    width: 120,
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
    field: "lotNumber",
    headerName: "Số LOT",
    minWidth: 100,
    renderCell: ({ row }) =>
      row?.lotNumber ? (
        row.lotNumber
      ) : (
        <span className="text-error">Chưa nhập</span>
      ),
  },
  {
    field: "dateManufacture",
    headerName: "Ngày SX",
    minWidth: 100,
    renderCell: ({ row }) =>
      row?.dateManufacture ? (
        moment(row?.dateManufacture).format("DD/MM/YYYY")
      ) : (
        <span className="text-error">Chưa nhập</span>
      ),
  },
  {
    field: "dateExpiration",
    headerName: "Hạn SD",
    minWidth: 100,
    renderCell: ({ row }) =>
      row?.dateExpiration ? (
        moment(row?.dateExpiration).format("DD/MM/YYYY")
      ) : (
        <span className="text-error">Chưa nhập</span>
      ),
  },
  {
    field: "positionName",
    headerName: "Vị trí",
    minWidth: 100,
    renderCell: ({ row }) =>
      row?.positionName ? (
        row.positionName
      ) : (
        <span className="text-error">Chưa nhập</span>
      ),
  },
];
