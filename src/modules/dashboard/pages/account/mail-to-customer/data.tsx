import moment from "moment";
import { TGridColDef } from "~types/data-grid";

export const notifyColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    flex: 1,
    isFilter: false,
    isSort: false,
    renderCell: ({row}) => row?.created ? moment(row.created).format("DD/MM/YYYY") : ""
  },
  {
    field: "createdByName",
    headerName: "Người gửi",
    flex: 1,
    isFilter: false,
    isSort: false,
  },
  {
    field: "subject",
    headerName: "Tiêu đề",
    flex: 2,
    isFilter: false,
    isSort: false,
  },
  {
    field: "content",
    headerName: "Nội dung",
    flex: 1,
    isFilter: false,
    isSort: false,
    renderCell: ({row}) => <div dangerouslySetInnerHTML={{__html: row?.content}} />
  },
];
