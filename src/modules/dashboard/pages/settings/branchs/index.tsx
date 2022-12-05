import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useCallback, useRef, useState } from "react";
import { useQuery } from "react-query";
import { branchs, TBranch } from "src/api";
import {
  AddButton,
  DataTable,
  generatePaginationProps,
  SearchBox,
  ViewButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { BranchsDialog } from "~modules-dashboard/components";

export const BranchsPage: React.FC = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const [searchContent, setSearchContent] = useState("");

  const [defaultValue, setDefaultValue] = useState<TBranch | null>();

  const [dialog, setDialog] = useState<{
    open: boolean;
    type?: "Add" | "View";
  }>({ open: false });

  const onClose = useCallback(() => setDialog({ open: false }), []);

  const onUpdate = useCallback(
    (row: TBranch) => {
      setDialog({ open: true, type: "View" });

      setDefaultValue(row);
    },
    [setDefaultValue]
  );

  const onAdd = useCallback(() => {
    setDialog({ open: true, type: "Add" });

    setDefaultValue(null);
  }, [setDefaultValue]);

  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "customersList",
      "loading",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        searchContent,
      },
    ],
    () =>
      branchs
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          searchContent,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
    }
  );

  const columns: GridColDef<TBranch>[] = [
    { field: "code", headerName: "MÃ CN" },
    { field: "name", headerName: "TÊN CN" },
    { field: "address", headerName: "ĐỊA CHỈ", flex: 2 },
    { field: "phone", headerName: "SỐ ĐIỆN THOẠI" },
    { field: "email", headerName: "EMAIL" },
    {
      field: "action",
      headerName: "CHI TIẾT",
      flex: 0,
      width: 100,
      renderCell: (record) => (
        <ViewButton onClick={() => onUpdate(record.row)} />
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="p-2 w-full h-full shadow">
      <div className="flex mb-3">
        <div className="w-1/2">
          <SearchBox label="Tìm kiếm" />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <AddButton variant="contained" onClick={onAdd}>
            Tạo chi nhánh
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

      <BranchsDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        title="tạo chi nhánh"
        defaultValue={defaultValue as any}
      />
    </Paper>
  );
};
