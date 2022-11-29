import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { customer } from "src/api";
import {
  AddButton,
  DataTable,
  FilterButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";

type TFilterParams = {
  FromDate?: number;
  ToDate?: number;
};

export const CustomersList = () => {
  const [filterParams, setFilterPrams] = useState<TFilterParams>();

  const [pagination, setPagination] = useState(defaultPagination);

  const [searchContent, setSearchContent] = useState("");

  const { data, isLoading, isFetching } = useQuery(
    [
      "customersList",
      "loading",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        searchContent,
        ...filterParams,
      },
    ],
    () =>
      customer
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          searchContent,
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

  return (
    <>
      <div className="flex mb-3">
        <div className="w-1/2">
          <SearchBox label="Tìm kiếm sale phụ trách" />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <AddButton variant="contained" className="mr-3">
            Tạo khách hàng
          </AddButton>
        </div>
      </div>

      <DataTable
        rows={data?.items}
        columns={columns}
        gridProps={{
          loading: isLoading || isFetching,
          ...paginationProps,
        }}
      />
    </>
  );
};
