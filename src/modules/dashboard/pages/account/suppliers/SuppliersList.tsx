import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { suppliers } from "src/api";
import { DataTable, FilterDateRange, generatePaginationProps, renderFilterHeader } from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";

type TFilterParams = {
  FromDate?: number;
  ToDate?: number;
};

export const SuppliersList: React.FC<TFilterParams> = () => {
  const [filterParams, setFilterPrams] = useState<TFilterParams>();

  const [pagination, setPagination] = useState(defaultPagination);

  const { data, isLoading, isFetching } = useQuery(
    [
      "Suppliers",
      "loading",
      { pageIndex: pagination.pageIndex, pageSize: pagination.pageSize, ...filterParams },
    ],
    () =>
    suppliers
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          ...filterParams
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
    }
  );

  const columns: GridColDef[] = [
    {
      field: "created",
      headerName: "Ngày tạo",
      type: "dateTime",
      renderCell: (params) =>
        params.row.created
          ? moment(params.row.created).format("DD/MM/YYYY")
          : "__",
      renderHeader: (params) =>
        renderFilterHeader(
          params,
          <FilterDateRange
            handleFilter={(FromDate?: number, ToDate?: number) =>
              setFilterPrams({ FromDate, ToDate })
            }
            handleClear={() => setFilterPrams({})}
          />
        ),
    },
    { field: "supplierCode", headerName: "Mã NCC" },
    { field: "supplierName", headerName: "Tên NCC" },
    { field: "curatorName", headerName: "Tên người liên hệ" },
    { field: "curatorPositionName", headerName: "Chức vụ" },
    { field: "curatorPhone", headerName: "Số điện thoại" },
    { field: "curatorEmail", headerName: "Email" },
    { field: "CreatedBy", headerName: "Người tạo" },
    { field: "action", headerName: "Thao tác" },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  console.log(data);

  return (
    <DataTable
      rows={data?.items}
      columns={columns}
      gridProps={{
        loading: isLoading || isFetching,
        ...paginationProps,
      }}
    />
  );

};
