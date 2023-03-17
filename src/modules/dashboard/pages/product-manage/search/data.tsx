import { List, ListItem } from "@mui/material";
import moment from "moment";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const productManageColumns: TGridColDef[] = [
  {
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 8,
    sortDescValue: 1,
    filterKey: "productCode",
    width: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 9,
    sortDescValue: 2,
    filterKey: "productName",
    width: 150,
  },
  {
    field: "manufactor",
    headerName: "Hãng sản xuất",
    sortAscValue: 10,
    sortDescValue: 3,
    filterKey: "manufactor",
    width: 150,
  },
  {
    field: "origin",
    headerName: "Xuất xứ",
    sortAscValue: 11,
    sortDescValue: 4,
    filterKey: "origin",
    width: 150,
  },
  {
    field: "specs",
    headerName: "Quy cách",
    sortAscValue: 12,
    sortDescValue: 5,
    filterKey: "specs",
    width: 150,
  },
  {
    field: "unitName",
    headerName: "DVT",
    sortAscValue: 13,
    sortDescValue: 6,
    filterKey: "unitName",
    width: 150,
  },
  {
    field: "lastQuantity",
    headerName: "SL tồn",
    sortAscValue: 14,
    sortDescValue: 15,
    filterKey: "quantity",
    width: 150,
  },
  {
    field: "avaibilityQuatity",
    headerName: "SL có thể bán",
    sortAscValue: 16,
    sortDescValue: 17,
    filterKey: "unitName",
    width: 150,
  },
  {
    field: "ntbQuantity",
    headerName: "SL đặt bổ sung",
    isFilter: false,
    isSort: false,
    width: 150,
  },
  {
    field: "lastTotalPrice",
    headerName: "Tổng giá trị",
    isFilter: false,
    isSort: false,
    width: 150,
    renderCell: ({ row }) => _format.getVND(row?.lastTotalPrice),
  },
];

export const productHistoryColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({ row }) =>
      row?.created ? moment(row?.created).format("DD/MM/YYYY") : "",
  },
  {
    field: "importCode",
    headerName: "Mã nhập kho",
    isFilter: false,
    isSort: false,
    minWidth: 150,
  },
  {
    field: "exportCode",
    headerName: "Mã xuất kho",
    isFilter: false,
    isSort: false,
    minWidth: 150,
  },
  {
    field: "quantity",
    headerName: "SL",
    isFilter: false,
    isSort: false,
    minWidth: 50,
  },
  {
    field: "importProductPrice",
    headerName: "Đơn giá nhập",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({ row }) => _format.getVND(row?.importProductPrice),
  },
  {
    field: "price",
    headerName: "Đơn giá bán",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({ row }) => _format.getVND(row?.price),
  },
  {
    field: "totalPrice",
    headerName: "Thành tiền",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({ row }) => _format.getVND(row?.price),
  },
  {
    field: "lotNumber",
    headerName: "Số LOT #",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({ row }) => _format.getVND(row?.price),
  },
  {
    field: "dateManufacture",
    headerName: "Ngày SX",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({ row }) =>
      row?.dateManufacture
        ? moment(row?.dateManufacture).format("DD/MM/YYYY")
        : "",
  },
  {
    field: "dateExpiration",
    headerName: "Ngày hết hạn",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({ row }) =>
      row?.dateExpiration
        ? moment(row?.dateExpiration).format("DD/MM/YYYY")
        : "",
  },
];

export const positionColumns: TGridColDef[] = [
  {
    field: "positionName",
    headerName: "Vị trí lưu",
    isFilter: false,
    isSort: false,
    minWidth: 150,
  },
  {
    field: "quantity",
    headerName: "SL tồn",
    isFilter: false,
    isSort: false,
    minWidth: 150,
  },
  {
    field: "availableQuantity",
    headerName: "SL có thể bán",
    isFilter: false,
    isSort: false,
    minWidth: 150,
  },
  {
    field: "price",
    headerName: "Đơn giá",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({ row }) => _format.getVND(row?.price),
  },
  {
    field: "lotNumber",
    headerName: "Số LOT",
    isFilter: false,
    isSort: false,
    minWidth: 150,
  },
  {
    field: "dateManufacture",
    headerName: "Ngày SX",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({ row }) =>
      row?.dateManufacture
        ? moment(row?.dateManufacture).format("DD/MM/YYYY")
        : "",
  },
  {
    field: "dateExpiration",
    headerName: "Hạn SD",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({ row }) =>
      row?.dateManufacture
        ? moment(row?.dateManufacture).format("DD/MM/YYYY")
        : "",
  },
];

export const stockPlanColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    renderCell: ({ row }) =>
      row?.created ? moment(row?.created).format("DD/MM/YYYY") : "",
  },
  {
    field: "salesName",
    headerName: "Mã nhân viên",
    isFilter: false,
    isSort: false,
    minWidth: 150,
  },
  {
    field: "customerName",
    headerName: "Tên khách hàng",
    isFilter: false,
    isSort: false,
    minWidth: 150,
  },
  {
    field: "estimatedQuantity",
    headerName: "Nội dung kế hoạch",
    isFilter: false,
    isSort: false,
    minWidth: 150,
    flex: 1,
    renderCell: ({ row }) => {
      let data: any[];

      try {
        data = JSON.parse(row?.estimatedQuantity || "[]");
      } catch (error: any) {
        console.log(error);

        data = [];
      }

      return (
        <List>
          {data.map((d: any, index: number) => (
            <ListItem key={index}>
              {`Tháng ${
                d?.time ? moment(d.time).format("MM/YYYY") : "__"
              } - số lượng: ${d?.estimatedQuantity}`}
            </ListItem>
          ))}
        </List>
      );
    },
  },
];
