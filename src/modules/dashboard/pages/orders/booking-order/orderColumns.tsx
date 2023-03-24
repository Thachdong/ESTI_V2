import moment from "moment";
import { StatusChip } from "~modules-core/components";
import { orderStatus } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const orderColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "NGÀY TẠO",
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
    minWidth: 150,
    sortAscValue: 12,
    sortDescValue: 0,
    filterKey: "createdDate",
    type: "date",
  },
  {
    field: "mainOrderCode",
    headerName: "MÃ ĐH",
    minWidth: 120,
    sortAscValue: 11,
    sortDescValue: 1,
    filterKey: "mainOrderCode",
  },
  {
    field: "customerCode",
    headerName: "MÃ KH",
    minWidth: 120,
    sortAscValue: 13,
    sortDescValue: 2,
    filterKey: "code",
  },
  {
    field: "companyName",
    headerName: "TÊN KH",
    minWidth: 200,
    flex: 1,
    sortAscValue: 14,
    sortDescValue: 3,
    filterKey: "name",
  },
  {
    field: "curatorName",
    headerName: "Tên NLH",
    flex: 1,
    minWidth: 175,
    filterKey: "curatorName",
    isSort: false,
  },
  {
    field: "accountCode",
    headerName: "Mã NLH",
    flex: 1,
    minWidth: 150,
    filterKey: "curatorAccount",
    isSort: false,
  }
];
