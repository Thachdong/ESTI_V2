import moment from "moment";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const CustomerColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    type: "date",
    minWidth: 125,
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
    filterKey: "createdDate",
    sortDescValue: 0,
    sortAscValue: 9,
  },
  {
    field: "salesCode",
    headerName: "Sale phụ trách",
    minWidth: 150,
    filterKey: "salesCode",
    sortDescValue: 2,
    sortAscValue: 11,
  },
  {
    field: "customerCode",
    headerName: "Mã KH",
    minWidth: 150,
    filterKey: "customerCode",
    sortDescValue: 3,
    sortAscValue: 12,
  },
  {
    field: "companyName",
    headerName: "Tên KH",
    minWidth: 150,
    filterKey: "companyName",
    sortDescValue: 4,
    sortAscValue: 13,
    flex: 1,
  },
  {
    field: "companyTaxCode",
    headerName: "Mã số thuế",
    minWidth: 125,
    filterKey: "companyTaxCode",
    sortDescValue: 5,
    sortAscValue: 14,
  },
  {
    field: "professionName",
    headerName: "Ngành nghề",
    minWidth: 125,
    filterKey: "professionId",
    sortDescValue: 6,
    sortAscValue: 15,
  },
  {
    field: "totalTurnover",
    headerName: "Tổng doanh thu",
    minWidth: 150,
    isFilter: false,
    sortDescValue: 20,
    sortAscValue: 21,
    renderCell: ({ row }) => _format.getVND(row?.totalTurnover),
  },
  {
    field: "totalProfit",
    headerName: "Tổng lợi nhuận",
    minWidth: 150,
    isFilter: false,
    sortDescValue: 0,
    sortAscValue: 0,
    renderCell: ({ row }) => _format.getVND(row?.totalProfit),
  },
  {
    field: "commissionMoney",
    headerName: "Tổng hoa hồng",
    minWidth: 150,
    isFilter: false,
    sortDescValue: 0,
    sortAscValue: 0,
    renderCell: ({ row }) => _format.getVND(row?.commissionMoney),
  },
  {
    field: "totalCore", // api trả về totalCore không phải totalScore
    headerName: "Tổng điểm tích lũy",
    minWidth: 175,
    isFilter: false,
    isSort: false,
  },
  {
    field: "totalOrder",
    headerName: "Số lần mua",
    minWidth: 150,
    filterKey: "totalOrder",
    sortDescValue: 18,
    sortAscValue: 19,
  },
  {
    field: "lastPurchasesDate",
    headerName: "Ngày mua gần nhất",
    minWidth: 200,
    isFilter: false, // tại thời điểm hiện tại có nhiều trường api chưa sort, search
    sortDescValue: 22,
    sortAscValue: 23,
    renderCell: ({ row }) => _format.converseDate(row?.lastPurchasesDate),
  },
  {
    field: "numDayNotPurchare",
    headerName: "Số ngày chưa mua",
    minWidth: 175,
    isFilter: false,
    isSort: false,
  },
  {
    field: "createdByName",
    headerName: "Người tạo",
    minWidth: 125,
    filterKey: "createdBy",
    sortDescValue: 8,
    sortAscValue: 17,
  },
];
