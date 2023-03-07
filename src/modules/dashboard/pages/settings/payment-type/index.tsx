import { Box, Paper } from "@mui/material";
import moment from "moment";
import React, { useCallback, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { paymentType, TUnit } from "src/api";
import {
  AddButton,
  DataTable,
  DropdownButton,
  SearchBox,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { PaymentTypeDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";

export const PaymentTypePage: React.FC = () => {
  const [dialog, setDialog] = useState<{
    open: boolean;
    type?: "Add" | "View";
  }>({ open: false });

  const defaultValue = useRef<any>();

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
    ["paymentTypeList"],
    () => paymentType.getList().then((res) => res.data)
  );

  // DATA TABLE
  // MUTATION DECLERATIONS
  const mutateDelete = useMutation((id: string) => paymentType.delete(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      toast.success(data?.resultMessage);

      refetch?.();
    },
  });

  const onDelete = useCallback(async (paymentType: any) => {
    const { paymentTypeName, id } = paymentType || {};
    if (confirm("Xác nhận xóa đơn vị: " + paymentTypeName)) {
      await mutateDelete.mutateAsync(id);
    }
  }, []);

  const columns: TGridColDef[] = [
    {
      field: "created",
      headerName: "Ngày tạo",
      flex: 1,
      renderCell: ({ row }) => moment(row?.created).format("DD/MM/YYYY"),
    },
    {
      field: "paymentTypeName",
      headerName: "Tên",
      flex: 2,
    },
    {
      field: "action",
      headerName: "Thao tác",
      minWidth: 100,
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

  return (
    <Paper className="bgContainer">
      <Box className="flex items-center gap-3 w-full md:w-4/5 lg:w-3/5 mb-3">
        <AddButton className="min-w-[300px]" variant="contained" onClick={onAdd}>
          Tạo hình thức thanh toán
        </AddButton>
        <SearchBox label="Tìm kiếm tên đơn vị" />
      </Box>

      <DataTable
        rows={data as []}
        columns={columns}
        gridProps={{
          loading: isLoading || isFetching,
        }}
        hideSearchbar
        hideFooter
      />

      <PaymentTypeDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current as any}
      />
    </Paper>
  );
};
