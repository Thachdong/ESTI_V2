import moment from "moment";
import { TGridColDef } from "~types/data-grid";

export const CustomerColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    type: "date",
    width: 125,
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
    filterKey: "createdDate",
    sortDescValue: 0,
    sortAscValue: 9,
  },
  // {
  //   field: "branchCode",
  //   headerName: "Chi nhánh",
  //   width: 150,
  //   filterKey: "salesCode",
  //   sortDescValue: 2,
  //   sortAscValue: 11,
  // },
  {
    field: "salesCode",
    headerName: "Sale phụ trách",
    width: 150,
    filterKey: "salesCode",
    sortDescValue: 2,
    sortAscValue: 11,
  },
  {
    field: "customerCode",
    headerName: "Mã KH",
    width: 150,
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
    width: 125,
    filterKey: "companyTaxCode",
    sortDescValue: 5,
    sortAscValue: 14,
  },
  {
    field: "professionName",
    headerName: "Ngành nghề",
    width: 125,
    filterKey: "professionId",
    sortDescValue: 6,
    sortAscValue: 15,
  },
  {
    field: "createdByName",
    headerName: "Người tạo",
    width: 125,
    filterKey: "createdBy",
    sortDescValue: 8,
    sortAscValue: 17,
  },
];
