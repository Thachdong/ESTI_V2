import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { TBranch, warehouseConfig } from "src/api";
import {
  AddButton,
  DataTable,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { ViewButton } from "~modules-core/components/buttons/ViewButton";
import { defaultPagination } from "~modules-core/constance";
import { WarehouseConfigDialog } from "~modules-dashboard/components";
import { warehouseColumns } from "./warehouseColumns";

export const WarehouseConfigPage: React.FC = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const defaultValue = useRef<TBranch | null>();

  const [dialog, setDialog] = useState<{
    open: boolean;
    type?: "Add" | "View";
  }>({ open: false });

  // PUSH PAGINATION QUERY
  useEffect(() => {
    const initQuery = {
      ...query,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    };

    router.push({ query: initQuery });
  }, [pagination, router.isReady]);

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
      warehouseConfig
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
  // MUTATION DECLERATIONS
  const columns: GridColDef<TBranch>[] = [
    ...warehouseColumns,
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
      <div className="flex items-center gap-3 w-3/5 mb-3">
        <AddButton variant="contained" onClick={onAdd}>
          Tạo kho
        </AddButton>
        <SearchBox label="Tìm kiếm" />
      </div>

      <DataTable
        rows={data?.items as []}
        columns={columns}
        gridProps={{
          loading: isLoading || isFetching,
          ...paginationProps,
        }}
      />

      <WarehouseConfigDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current as any}
      />
    </Paper>
  );
};
