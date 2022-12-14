import moment from "moment";
import { TUnit } from "src/api";
import { TGridColDef } from "~types/data-grid";

export const productColumns: TGridColDef<TUnit>[] = [
    {
        field: "unitName",
        headerName: "TÊN ĐƠN VỊ",
        flex: 1,
        filterKey: "unitName",
        sortAscValue: 5,
        sortDescValue: 1,
      },
      {
        field: "created",
        type: "date",
        headerName: "NGÀY TẠO",
        renderCell: (record) => moment(record.value).format("DD/MM/YYYY"),
        flex: 1,
        filterKey: "createdDate",
        sortAscValue: 7,
        sortDescValue: 3,
      },
      {
        field: "createdByName",
        headerName: "NGƯỜI TẠO",
        flex: 1,
        filterKey: "createdBy",
        sortAscValue: 6,
        sortDescValue: 2,
      },
]