import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { suppliers } from "src/api";
import {
  AddButton,
  DataTable,
  FilterButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";

export const SuppliersList = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const router = useRouter();

  const { query } = router;

  useEffect(() => {
    const initQuery = {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    };
    router.push({ query: initQuery, ...query });
  }, [pagination]);

  const { data, isLoading, isFetching } = useQuery(
    [
      "Suppliers",
      "loading",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        query,
      },
    ],
    () =>
      suppliers
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          query,
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

  return (
    <>
      <div className="flex mb-3">
        <div className="w-1/2">
          <SearchBox />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <AddButton variant="contained" className="mr-3">
            Tạo nhà cung cấp
          </AddButton>
          <FilterButton variant="contained">Lọc</FilterButton>
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
