import { Button } from "@mui/material";
import moment from "moment";
import { TDocument } from "src/api";
import { TGridColDef } from "~types/data-grid";

export const documentColumns: TGridColDef<TDocument>[] = [
  {
    sortAscValue: 8,
    sortDescValue: 0,
    filterKey: "createdDate",
    field: "created",
    headerName: "Ngày tạo",
    type: "date",
    width: 150,
    renderCell: (params) =>
      params.row.created
        ? moment(params.row.created).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "ProductCode",
    headerName: "Mã SP",
    sortAscValue: 10,
    sortDescValue: 2,
    filterKey: "productCode",
    width: 150,
  },
  {
    field: "ProductName",
    headerName: "Tên SP",
    sortAscValue: 11,
    sortDescValue: 3,
    filterKey: "productName",
    width: 150,
  },
  {
    field: "ProductManufactor",
    headerName: "Nhà sản xuất",
    sortAscValue: 12,
    sortDescValue: 4,
    filterKey: "productManufactor",
    width: 150,
  },
  {
    field: "LotNumber",
    headerName: "LOT#",
    sortAscValue: 13,
    sortDescValue: 5,
    filterKey: "lotNumber",
    width: 150,
  },
  {
    field: "documentTypeName",
    headerName: "Loại tài liệu",
    sortAscValue: 14,
    sortDescValue: 6,
    filterKey: "type",
    width: 150,
  },
  {
    field: "documentCareerName",
    headerName: "Tài liệu chuyên ngành",
    sortAscValue: 15,
    sortDescValue: 7,
    filterKey: "careerSlug",
    width: 150,
  },
  {
    field: "AttachFile",
    headerName: "File",
    width: 150,
    renderCell: ({ row }) => (
      <Button variant="text">
        <a href={row.attachFile} target="_blank" rel="noopener noreferrer">
          Xem chi tiết
        </a>
      </Button>
    ),
  },
];
