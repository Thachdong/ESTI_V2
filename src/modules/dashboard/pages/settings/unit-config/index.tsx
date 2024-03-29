import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { TUnit, units } from "src/api";
import {
  AddButton,
  DataTable,
  DropdownButton,
  FilterButton,
  generatePaginationProps,
  RefreshButton,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { toast } from "~modules-core/toast";
import { UnitConfigDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { productColumns } from "./unitColumns";

export const UnitConfigPage: React.FC = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const defaultValue = useRef<TUnit | null>();

  const [dialog, setDialog] = useState<{
    open: boolean;
    type?: "Add" | "View";
  }>({ open: false });

  usePathBaseFilter(pagination);

  // DIALOG METHODS
  const onClose = useCallback(() => setDialog({ open: false }), []);

  const onUpdate = useCallback(
    (row: TUnit) => {
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
      "unitsList",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      units
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
  const mutateDelete = useMutation((id: string) => units.delete(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      toast.success(data?.resultMessage);

      refetch?.();
    },
  });

  const onDelete = useCallback(async (unit: TUnit) => {
    if (confirm("Xác nhận xóa đơn vị: " + unit.unitName)) {
      await mutateDelete.mutateAsync(unit.id);
    }
  }, []);

  const columns: TGridColDef<TUnit>[] = [
    ...productColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      flex: 0,
      align: "center",
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id as string}
          items={[
            {
              action: () => onUpdate(row),
              label: "Thông tin chi tiết",
            },
            {
              action: () => onDelete(row),
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer">
      <Box className="flex justify-between items-center flex-wrap gap-3 mb-3">
        <Box className="flex items-center gap-3">
          <AddButton variant="contained" onClick={onAdd}>
            Tạo đơn vị
          </AddButton>
          <SearchBox label="Tìm kiếm tên đơn vị" />
        </Box>
        <Box className="flex gap-3">
          <FilterButton listFilterKey={[]} />
          <RefreshButton onClick={() => refetch()} />
        </Box>
      </Box>

      <DataTable
        rows={data?.items as []}
        columns={columns}
        gridProps={{
          loading: isLoading || isFetching,
          ...paginationProps,
        }}
      />

      <UnitConfigDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current as any}
      />
    </Paper>
  );
};
