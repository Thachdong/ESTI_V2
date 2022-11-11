import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { customer } from "src/api";
import {
  DataTable,
  FilterDateRange,
  generatePaginationProps,
  renderFilterHeader,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";

type TFilterParams = {
  FromDate?: number;
  ToDate?: number;
};

export const CustomersList = () => {
  const [filterParams, setFilterPrams] = useState<TFilterParams>();

  const [pagination, setPagination] = useState(defaultPagination);

  const { data, isLoading, isFetching } = useQuery(
    [
      "customersList",
      "loading",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        ...filterParams,
      },
    ],
    () =>
      customer
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          ...filterParams,
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
    { field: "branchCode", headerName: "Chi nhánh" },
    { field: "customerCode", headerName: "Sale phụ trách" },
    { field: "companyProfessionId", headerName: "Mã KH" },
    { field: "companyName", headerName: "Tên KH" },
    { field: "companyTaxCode", headerName: "Mã số thuế" },
    { field: "salesCode", headerName: "Ngành nghề" },
    { field: "preOrderStatusName", headerName: "Trạng thái" },
    { field: "action", headerName: "Người tạo" },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  console.log(data?.items);
  

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
