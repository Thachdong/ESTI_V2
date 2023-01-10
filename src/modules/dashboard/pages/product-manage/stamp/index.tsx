import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState, MouseEvent } from "react";
import { Item, Menu } from "react-contexify";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { stamp } from "src/api/stamp";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  FormSelect,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination, productTypesStamp } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { toast } from "~modules-core/toast";
import { StampDialog, StampHistoryDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { stampColumns } from "./data";

export const StampPage = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const [historyDialog, setHistoryDialog] = useState(false);

  const [defaultValue, setDefaultValue] = useState<any>();

  const { control, watch } = useForm<{ labelType: number }>({
    defaultValues: { labelType: 1 },
  });

  const labelType = watch("labelType");

  usePathBaseFilter(pagination);

  // DIALOG METHODS
  const onDialogClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "stampList",
      "loading",
      {
        ...pagination,
        ...query,
        labelType,
      },
    ],
    () =>
      stamp
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          labelType,
          ...query,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
      enabled: Boolean(labelType),
    }
  );

  // DATA TABLE
  const mutateDelete = useMutation((id: string) => stamp.delete(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch();
    },
  });

  const handleDelete = useCallback(async () => {
    if (confirm("Xác nhận xóa nhãn: " + defaultValue.productName)) {
      await mutateDelete.mutateAsync(defaultValue.id as string);
    }
  }, [defaultValue]);

  const columns: TGridColDef[] = [
    ...stampColumns,
    {
      field: "action",
      headerName: "",
      align: "center",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id}
          items={[
            {
              action: () => setDialog({ open: true, type: "View" }),
              label: "Thông tin chi tiết",
            },
            {
              action: () => setHistoryDialog(true),
              label: "Lịch sử nhãn",
            },
            {
              action: handleDelete,
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  const onMouseEnterRow = (e: MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item) => item.id === id);

    setDefaultValue(currentRow);
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer flex flex-col">
      <Box className="grid grid-cols-2 mb-3">
        <FormSelect
          controlProps={{ control, name: "labelType" }}
          label="Nhóm sản phẩm"
          options={productTypesStamp}
        />

        <Box className="flex items-center justify-end">
          <AddButton
            onClick={() => setDialog({ open: true, type: "Add" })}
            variant="contained"
            className="mr-3"
          >
            Thêm nhãn sản phẩm
          </AddButton>
        </Box>
      </Box>

      <ContextMenuWrapper
        menuId="product_table_menu"
        menuComponent={
          <Menu className="p-0" id="product_table_menu">
            <Item
              id="view-product"
              onClick={() => setDialog({ open: true, type: "View" })}
            >
              Xem chi tiết
            </Item>
            <Item
              id="view-product"
              onClick={() => setHistoryDialog(true)}
            >
              Lịch sử nhãn
            </Item>
            <Item id="delete-product" onClick={handleDelete}>
              Xóa
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={data?.items as []}
          columns={columns}
          gridProps={{
            loading: isLoading || isFetching,
            ...paginationProps,
          }}
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
            },
          }}
        />
      </ContextMenuWrapper>

      <StampDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue as any}
      />

      <StampHistoryDialog
        onClose={() => setHistoryDialog(false)}
        open={historyDialog}
        title="Lịch sử nhãn"
      />
    </Paper>
  );
};
