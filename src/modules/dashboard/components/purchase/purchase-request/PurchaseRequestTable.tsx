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
  ViewListProductDrawer,
} from "~modules-dashboard/components";
import { purchaseRequestColumns } from "~modules-dashboard/pages/purchase/purchase-request/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";

export const PurchaseRequestTable = () => {
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

  const [Open, setOpen] = useState<boolean>(false);
  const dataViewDetail = useRef<any>();
  const handleViewProduct = async (e: React.MouseEvent<HTMLElement>) => {
    const id: any = e.currentTarget.dataset.id;
    const currentRow = await purchaseOrder
      .getProductOrderDetail(id)
      .then((res) => {
        return res.data;
      });

    dataViewDetail.current = { ...currentRow, id: id };
    setOpen(true);
  };

  return (
    <Paper className="bgContainer">
      <Box className="flex mb-3 gap-3 items-center w-3/5">
        <AddButton
          onClick={() =>
            router.push("/dashboard/purchase/purchase-request-detail")
          }
        >
          Tạo đơn mua hàng
        </AddButton>
        <SearchBox />
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
              onDoubleClick: handleViewProduct,
            },
          }}
          getRowClassName={({ id }) =>
            dataViewDetail?.current?.id == id && Open ? "!bg-[#fde9e9]" : ""
          }
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

      <ViewListProductDrawer
        Open={Open}
        onClose={() => setOpen(false)}
        data={dataViewDetail?.current?.productOrderDetail}
      />
    </Paper>
  );
};
