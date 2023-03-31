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
    field: "lotNumber",
    headerName: "Số LOT",
    minWidth: 100, // api yêu cầu bỏ ràng buộc
    // renderCell: ({ row }) =>
    //   row?.lotNumber ? (
    //     row.lotNumber
    //   ) : (
    //     <span className="text-error">Chưa nhập</span>
    //   ),
  },
  {
    field: "dateManufacture",
    headerName: "Ngày SX",
    minWidth: 100, // api yêu cầu bỏ ràng buộc
    // renderCell: ({ row }) =>
    //   row?.dateManufacture ? (
    //     moment(row?.dateManufacture).format("DD/MM/YYYY")
    //   ) : (
    //     <span className="text-error">Chưa nhập</span>
    //   ),
  },
  {
    field: "dateExpiration",
    headerName: "Hạn SD",
    minWidth: 100, // api yêu cầu bỏ ràng buộc
    // renderCell: ({ row }) =>
    //   row?.dateExpiration ? (
    //     moment(row?.dateExpiration).format("DD/MM/YYYY")
    //   ) : (
    //     <span className="text-error">Chưa nhập</span>
    //   ),
  },
  {
    field: "positionName",
    headerName: "Vị trí",
    minWidth: 100, // api yêu cầu bỏ ràng buộc
    // renderCell: ({ row }) =>
    //   row?.positionName ? (
    //     row.positionName
    //   ) : (
    //     <span className="text-error">Chưa nhập</span>
    //   ),
  },
  {
    field: "quantity",
    headerName: "SL",
    width: 50,
    renderCell: ({ row }) =>
      row?.quantity ? (
        row?.quantity
      ) : (
        <span className="text-error">Chưa nhập</span>
      ),
  },
  {
    field: "vat",
    headerName: "Thuế GTGT(%)",
    width: 120,
  },
  {
    field: "price",
    headerName: "Đơn giá",
    minWidth: 120,
    renderCell: ({ row }) => _format.getVND(row?.price),
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
];
