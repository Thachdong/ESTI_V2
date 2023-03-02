import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
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
import { usePathBaseFilter } from "~modules-core/customHooks";
import { BranchConfigDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { branchColumns } from "./branchColumns";

export const BranchConfigPage: React.FC = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const defaultValue = useRef<TBranch | any>();

  const [dialog, setDialog] = useState<{
    open: boolean;
    type?: "Add" | "View";
  }>({ open: false });

  usePathBaseFilter(pagination);

  // DIALOG METHODS
  const onClose = useCallback(() => setDialog({ open: false }), []);

  const onUpdate = useCallback(
    (row: TBranch) => {
      setDialog({ open: true, type: "View" });

      defaultValue.current = row;
    },
    [defaultValue]
  );

  const onAdd = useCallback(() => {
    setDialog({ open: true, type: "Add" });

    defaultValue.current = null;
  }, [defaultValue]);

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
      branchs
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
  const columns: TGridColDef<TBranch>[] = [
    ...branchColumns,
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
    <Paper className="bgContainer">
      <Box className="flex gap-3 items-center w-3/5 mb-3">
        <AddButton variant="contained" onClick={onAdd}>
          Tạo chi nhánh
        </AddButton>
        <SearchBox label="Tìm kiếm" />
      </Box>

      <DataTable
        rows={data?.items as []}
        columns={columns}
        gridProps={{
          loading: isLoading || isFetching,
          ...paginationProps,
        }}
      />

      <BranchConfigDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        title="tạo chi nhánh"
        defaultValue={defaultValue.current}
      />
    </Paper>
  );
};
