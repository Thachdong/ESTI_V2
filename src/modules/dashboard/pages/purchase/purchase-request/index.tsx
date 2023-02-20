import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useQuery } from "react-query";
import { purchaseOrder } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import {
  PurchaseRequestNoteDialog,
  PurchaseRequestStatusDialog,
} from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { purchaseRequestColumns } from "./data";

export const PurchaseRequestPage = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  // DIALOG METHODS
  const handleCloseDialog = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const handleOpenDialog = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  // DATA FETCHING
  const {
    data: purchaseList,
    isLoading,
    isFetching,
  } = useQuery(
    [
      "PurchaseList",
      {
        pageSize: pagination.pageSize,
        pageIndex: pagination.pageIndex,
        ...query,
      },
    ],
    () =>
      purchaseOrder
        .getList({
          pageSize: pagination.pageSize,
          pageIndex: pagination.pageIndex,
          ...query,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data?.pageSize });
      },
    }
  );

  const columns: TGridColDef[] = [
    ...purchaseRequestColumns,
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
              action: () =>
                router.push({
                  pathname: "/dashboard/purchase/purchase-request-detail/",
                  query: {
                    id: row?.id,
                  },
                }),
              label: "Nội dung đơn hàng",
            },
            {
              action: () => handleOpenDialog("Note"),
              label: "Ghi chú",
            },
            {
              action: () => handleOpenDialog("Status"),
              label: "Trạng thái",
            },
          ]}
        />
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = purchaseList?.items.find((item) => item.id === id);

    defaultValue.current = currentRow;
  };

  return (
    <Paper className="bgContainer">
      <Box className="flex justify-between mb-3">
        <Box className="w-1/3">
          <SearchBox />
        </Box>

        <AddButton
          onClick={() =>
            router.push("/dashboard/purchase/purchase-request-detail")
          }
        >
          Tạo đơn mua hàng
        </AddButton>
      </Box>

      <ContextMenuWrapper
        menuId="customer_table_menu"
        menuComponent={
          <Menu className="p-0" id="customer_table_menu">
            <Item
              id="view"
              onClick={() =>
                router.push({
                  pathname: "/dashboard/purchase/purchase-request-detail/",
                  query: {
                    id: defaultValue.current?.id,
                  },
                })
              }
            >
              Nội dung đơn hàng
            </Item>
            <Item id="note" onClick={() => handleOpenDialog("Note")}>
              Ghi chú
            </Item>
            <Item id="status" onClick={() => handleOpenDialog("Status")}>
              Trạng thái
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={purchaseList?.items || []}
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

      <PurchaseRequestNoteDialog
        onClose={handleCloseDialog}
        open={Boolean(dialog?.open && dialog.type === "Note")}
        defaultValue={defaultValue?.current}
      />

      <PurchaseRequestStatusDialog
        onClose={handleCloseDialog}
        open={Boolean(dialog?.open && dialog.type === "Status")}
        defaultValue={defaultValue?.current}
      />
    </Paper>
  );
};
