import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { TUnit, units } from "src/api";
import {
  AddButton,
  DataTable,
  DropdownButton,
  generatePaginationProps,
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

  const [defaultValue, setDefaultValue] = useState<TUnit | null>();

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

      setDefaultValue(row);
    },
    [setDefaultValue]
  );

  const onAdd = useCallback(() => {
    setDialog({ open: true, type: "Add" });

    setDefaultValue(null);
  }, [setDefaultValue]);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "unitsList",
      "loading",
      {
        ...pagination,
        ...query
      },
    ],
    () =>
      units
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          ...query
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
      )
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer">
      <div className="flex mb-3">
        <div className="w-1/2">
          <SearchBox label="Tìm kiếm tên đơn vị" />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <AddButton variant="contained" onClick={onAdd}>
            Tạo đơn vị
          </AddButton>
        </div>
      </div>

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
        defaultValue={defaultValue as any}
      />
    </Paper>
  );
};
