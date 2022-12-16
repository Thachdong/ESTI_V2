import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { TUnit, units } from "src/api";
import {
  AddButton,
  DataTable,
  DeleteButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { ViewButton } from "~modules-core/components/buttons/ViewButton";
import { defaultPagination } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { UnitDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { productColumns } from "./unitColumns";

export const UnitsPage: React.FC = () => {
  const router = useRouter();
  
  const { query } = router;
  
  const [pagination, setPagination] = useState(defaultPagination);

  const [defaultValue, setDefaultValue] = useState<TUnit | null>();

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
      width: 100,
      flex: 0,
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

      <UnitDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue as any}
      />
    </Paper>
  );
};
