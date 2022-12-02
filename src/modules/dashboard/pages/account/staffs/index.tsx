import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { staff, TStaff } from "src/api";
import {
  AddButton,
  DataTable,
  DeleteButton,
  FilterButton,
  generatePaginationProps,
  SearchBox,
  ViewButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { StaffDialog } from "~modules-dashboard/components/account";

type TFilterParams = {
  FromDate?: number;
  ToDate?: number;
};

type TDialog = {
  open: boolean;
  type?: "View" | "Add";
};

export const StaffsPage = () => {
  const [filterParams, setFilterPrams] = useState<TFilterParams>();

  const [pagination, setPagination] = useState(defaultPagination);

  const [searchContent, setSearchContent] = useState("");

  const [dialog, setDialog] = useState<TDialog>({ open: false });

  const [defaultValue, setDefaultValue] = useState<TStaff>();

  const onUpdate = useCallback(
    (row: any) => {
      setDialog({ open: true, type: "View" });

      setDefaultValue(row);
    },
    [setDefaultValue]
  );

  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "staffsList",
      "loading",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        searchContent,
        ...filterParams,
      },
    ],
    () =>
      staff
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

  const mutateDelete = useMutation((id: string) => staff.deleteStaff(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);

      refetch();
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage);
    }
  })

  const onDelete = useCallback(async (staff: TStaff) => {
    if (confirm("Xác nhận nhân viên: " + staff.username)) {
      await mutateDelete.mutateAsync(staff.id)
    }
  }, []);

  const columns: GridColDef[] = [
    {
      field: "code",
      headerName: "Mã",
    },
    { field: "username", headerName: "Tên tài khoản" },
    { field: "fullName", headerName: "Tên nhân viên" },
    { field: "roleCode", headerName: "Chức vụ" },
    { field: "branchCode", headerName: "Chi nhánh" },
    { field: "phone", headerName: "Số điện thoại" },
    { field: "address", headerName: "Địa chỉ" },
    { field: "email", headerName: "Email" },
    {
      field: "birthday",
      headerName: "Ngày sinh",
      renderCell: ({ row }) =>
        row.birthday ? moment(row.birthday).format("DD/MM/YYYY") : "__",
    },
    { field: "statusName", headerName: "Trạng thái" },
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
          <SearchBox />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <AddButton
            variant="contained"
            className="mr-3"
            onClick={() => setDialog({ open: true, type: "Add" })}
          >
            Tạo nhà nhân viên
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

      <StaffDialog
        onClose={() => setDialog({ open: false })}
        open={dialog.open}
        type={dialog.type}
        defaultValue={defaultValue as any}
      />
    </>
  );
};
