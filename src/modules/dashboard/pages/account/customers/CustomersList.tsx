import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { customer, suppliers } from "src/api";
import {
  AddButton,
  DataTable,
  DeleteButton,
  generatePaginationProps,
  SearchBox,
  ViewButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { CustomerDialog } from "~modules-dashboard/components";
import { TDefaultDialogState } from "~types/dialog";

export const CustomersList = () => {
  const { query } = useRouter();

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const [defaultValue, setDefaultValue] = useState<any>();

  // DIALOG METHODS
  const onDialogClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "customersList",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      customer
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          ...query,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
    }
  );

  // DATA TABLE
  const onUpdate = useCallback(
    (row: any) => {
      setDialog({ open: true, type: "View" });

      setDefaultValue(row);
    },
    [setDefaultValue]
  );

  const mutateDelete = useMutation((id: string) => suppliers.delete(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch();
    },
  });

  const onDelete = useCallback(async (supplier: any) => {
    if (confirm("Xác nhận nhân viên: " + supplier.supplierName)) {
      await mutateDelete.mutateAsync(supplier.id as string);
    }
  }, []);

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
    { field: "createdByName", headerName: "Người tạo" },
    {
      field: "action",
      headerName: "Thao tác",
      renderCell: (record) => (
        <>
          <ViewButton
            className="min-h-[40px] min-w-[40px]"
            onClick={() => onUpdate(record.row)}
          />
          <DeleteButton
            onClick={() => onDelete(record.row)}
            className="min-h-[40px] min-w-[40px]"
          />
        </>
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <>
      <div className="flex mb-3">
        <div className="w-1/2">
          <SearchBox label="Tìm kiếm sale phụ trách" />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <AddButton onClick={() => setDialog({ open: true, type: "Add" })} variant="contained" className="mr-3">
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

      <CustomerDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue as any}
      />
    </>
  );
};
