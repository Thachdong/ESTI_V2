import moment from "moment";
import { TGridColDef } from "~types/data-grid";

export const inventoryColumns: TGridColDef[] = [
  {
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 14,
    sortDescValue: 1,
    sortKey: "inventory_orderBy",
    filterKey: "inventory_productCode",
    width: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 15,
    sortDescValue: 2,
    sortKey: "inventory_orderBy",
    filterKey: "inventory_productName",
    width: 150,
  },
  {
    field: "manufactor",
    headerName: "Hãng SX",
    sortAscValue: 17,
    sortDescValue: 4,
    sortKey: "inventory_orderBy",
    filterKey: "inventory_manufactor",
    width: 150,
  },
  {
    field: "specs",
    headerName: "Quy cách",
    sortAscValue: 21,
    sortDescValue: 8,
    sortKey: "inventory_orderBy",
    filterKey: "inventory_specs",
    width: 150,
  },
  {
    field: "unitName",
    headerName: "ĐVT",
    sortAscValue: 22,
    sortDescValue: 9,
    sortKey: "inventory_orderBy",
    filterKey: "inventory_unitName",
    width: 150,
  },
  {
    field: "quantity",
    headerName: "SL",
    sortAscValue: 23,
    sortDescValue: 10,
    sortKey: "inventory_orderBy",
    filterKey: "inventory_quantity",
    width: 150,
  },
  {
    field: "availableQuantity",
    headerName: "SL có thể bán",
    sortAscValue: 23,
    sortDescValue: 10,
    isFilter: false,
    isSort: false, // api không sort, filter trường này
    width: 200,
  },
  {
    field: "lotNumber",
    headerName: "Lô SX",
    sortAscValue: 16,
    sortDescValue: 3,
    sortKey: "inventory_orderBy",
    filterKey: "inventory_lotNumber",
    width: 150,
  },
  {
    field: "dateManufacture",
    headerName: "Ngày SX",
    sortAscValue: 17,
    sortDescValue: 4,
    sortKey: "inventory_orderBy",
    filterKey: "inventory_dateManufacture",
    type: "date",
    width: 150,
    renderCell: ({ row }) =>
      row?.dateManufacture
        ? moment(row?.dateManufacture).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "dateExpiration",
    headerName: "Hạn sử dụng",
    sortAscValue: 18,
    sortDescValue: 5,
    sortKey: "inventory_orderBy",
    type: "date",
    filterKey: "inventory_dateExpiration",
    width: 150,
    renderCell: ({ row }) =>
      row?.dateExpiration
        ? moment(row?.dateExpiration).format("DD/MM/YYYY")
        : "__",
  },
];

export const importColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    sortAscValue: 13,
    sortDescValue: 1,
    isFilter: false,
    width: 150,
    sortKey: "import_orderBy",
    renderCell: ({ row }) =>
      row?.dateManufacture
        ? moment(row?.dateManufacture).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "warehouseSessionCode",
    headerName: "Mã nhập kho",
    sortAscValue: 24,
    sortDescValue: 25,
    sortKey: "import_orderBy",
    filterKey: "import_warehouseSessionCode",
    width: 150,
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 14,
    sortDescValue: 2,
    sortKey: "import_orderBy",
    filterKey: "import_productCode",
    width: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 15,
    sortDescValue: 3,
    sortKey: "import_orderBy",
    filterKey: "import_productName",
    width: 150,
  },
  {
    field: "manufactor",
    headerName: "Hãng SX",
    sortAscValue: 16,
    sortDescValue: 4,
    sortKey: "import_orderBy",
    filterKey: "import_manufactor",
    width: 150,
  },
  {
    field: "specs",
    headerName: "Quy cách",
    sortAscValue: 17,
    sortDescValue: 5,
    sortKey: "import_orderBy",
    filterKey: "import_specs",
    width: 150,
  },
  {
    field: "unitName",
    headerName: "ĐVT",
    sortAscValue: 18,
    sortDescValue: 6,
    sortKey: "import_orderBy",
    filterKey: "import_unitName",
    width: 150,
  },
  {
    field: "quantity",
    headerName: "SL",
    sortAscValue: 22,
    sortDescValue: 10,
    sortKey: "import_orderBy",
    filterKey: "import_quantity",
    width: 150,
  },
  {
    field: "lotNumber",
    headerName: "Lô SX",
    sortAscValue: 19,
    sortDescValue: 7,
    sortKey: "import_orderBy",
    filterKey: "import_lotNumber",
    width: 150,
  },
  {
    field: "dateManufacture",
    headerName: "Ngày SX",
    sortAscValue: 20,
    sortDescValue: 8,
    sortKey: "import_orderBy",
    filterKey: "import_dateManufacture",
    type: "date",
    width: 150,
    renderCell: ({ row }) =>
      row?.dateManufacture
        ? moment(row?.dateManufacture).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "dateExpiration",
    headerName: "Hạn sử dụng",
    sortAscValue: 21,
    sortDescValue: 9,
    sortKey: "import_orderBy",
    type: "date",
    filterKey: "import_dateExpiration",
    width: 150,
    renderCell: ({ row }) =>
      row?.dateExpiration
        ? moment(row?.dateExpiration).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "createdByName",
    headerName: "NV nhập kho",
    isSort: false,
    isFilter: false,
    width: 150,
  },
];

export const exportColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Ngày tạo",
    sortAscValue: 13,
    sortDescValue: 1,
    isFilter: false,
    width: 150,
    sortKey: "export_orderBy",
    renderCell: ({ row }) =>
      row?.dateManufacture
        ? moment(row?.dateManufacture).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "warehouseSessionCode",
    headerName: "Mã xuất kho",
    sortAscValue: 24,
    sortDescValue: 25,
    sortKey: "export_orderBy",
    filterKey: "export_warehouseSessionCode",
    width: 150,
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 14,
    sortDescValue: 2,
    sortKey: "export_orderBy",
    filterKey: "export_productCode",
    width: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 15,
    sortDescValue: 3,
    sortKey: "export_orderBy",
    filterKey: "export_productName",
    width: 150,
  },
  {
    field: "manufactor",
    headerName: "Hãng SX",
    sortAscValue: 16,
    sortDescValue: 4,
    sortKey: "export_orderBy",
    filterKey: "export_manufactor",
    width: 150,
  },
  {
    field: "specs",
    headerName: "Quy cách",
    sortAscValue: 17,
    sortDescValue: 5,
    sortKey: "export_orderBy",
    filterKey: "export_specs",
    width: 150,
  },
  {
    field: "unitName",
    headerName: "ĐVT",
    sortAscValue: 18,
    sortDescValue: 6,
    sortKey: "export_orderBy",
    filterKey: "export_unitName",
    width: 150,
  },
  {
    field: "quantity",
    headerName: "SL",
    sortAscValue: 22,
    sortDescValue: 10,
    sortKey: "export_orderBy",
    filterKey: "export_quantity",
    width: 150,
  },
  {
    field: "lotNumber",
    headerName: "Lô SX",
    sortAscValue: 19,
    sortDescValue: 7,
    sortKey: "export_orderBy",
    filterKey: "export_lotNumber",
    width: 150,
  },
  {
    field: "dateManufacture",
    headerName: "Ngày SX",
    sortAscValue: 20,
    sortDescValue: 8,
    sortKey: "export_orderBy",
    filterKey: "export_dateManufacture",
    type: "date",
    width: 150,
    renderCell: ({ row }) =>
      row?.dateManufacture
        ? moment(row?.dateManufacture).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "dateExpiration",
    headerName: "Hạn sử dụng",
    sortAscValue: 21,
    sortDescValue: 9,
    sortKey: "export_orderBy",
    type: "date",
    filterKey: "export_dateExpiration",
    width: 150,
    renderCell: ({ row }) =>
      row?.dateExpiration
        ? moment(row?.dateExpiration).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "createdByName",
    headerName: "NV nhập kho",
    isSort: false,
    isFilter: false,
    width: 150,
  },
];

export const positionHistoryColumns: TGridColDef[] = [
  {
    field: "importDate",
    headerName: "Ngày nhập",
    sortAscValue: 11,
    sortDescValue: 1,
    sortKey: "history_orderBy",
    filterKey: "history_importDate",
    type: "date",
    width: 150,
    renderCell: ({ row }) =>
      row?.importDate ? moment(row?.importDate).format("DD/MM/YYYY") : "__",
  },
  {
    field: "exportDate",
    headerName: "Ngày xuất",
    sortAscValue: 12,
    sortDescValue: 2,
    sortKey: "history_orderBy",
    filterKey: "history_exportDate",
    type: "date",
    width: 150,
    renderCell: ({ row }) =>
      row?.exportDate ? moment(row?.exportDate).format("DD/MM/YYYY") : "__",
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    sortAscValue: 14,
    sortDescValue: 2,
    sortKey: "history_orderBy",
    filterKey: "history_productCode",
    width: 150,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    sortAscValue: 13,
    sortDescValue: 3,
    sortKey: "history_orderBy",
    filterKey: "history_productName",
    width: 150,
  },
  {
    field: "lotNumber",
    headerName: "Mã lô SX",
    sortAscValue: 15,
    sortDescValue: 5,
    sortKey: "history_orderBy",
    filterKey: "history_lotNumber",
    width: 150,
  },
  {
    field: "dateManufacture",
    headerName: "Ngày SX",
    sortAscValue: 16,
    sortDescValue: 6,
    sortKey: "history_orderBy",
    filterKey: "history_dateManufacture",
    width: 150,
    renderCell: ({ row }) =>
      row?.dateManufacture
        ? moment(row?.dateManufacture).format("DD/MM/YYYY")
        : "__",
  },
  {
    field: "dateExpiration",
    headerName: "Hạn sử dụng",
    sortAscValue: 17,
    sortDescValue: 7,
    sortKey: "history_orderBy",
    filterKey: "history_dateExpiration",
    type: "date",
    width: 150,
  },
  {
    field: "quantity",
    headerName: "SL",
    sortAscValue: 18,
    sortDescValue: 8,
    sortKey: "history_orderBy",
    filterKey: "history_quantity",
    width: 75,
  },
  {
    field: "createdByName",
    headerName: "Người tạo",
    isFilter: false,
    isSort: false,
    width: 150,
  },
];