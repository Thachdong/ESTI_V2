import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useQuery } from "react-query";
import { mainOrder } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import {
  BookingOrderNoteDialog,
  BookingOrderStatusDialog,
  ViewListProductDrawer,
} from "~modules-dashboard/components";
import { orderColumns } from "~modules-dashboard/pages/orders/booking-order/orderColumns";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";

export const BookingOrderTable: React.FC = () => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const [pagination, setPagination] = useState(defaultPagination);

  const router = useRouter();

  const { query } = router;

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "mainOrders",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      mainOrder
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
  const columns: TGridColDef[] = [
    ...orderColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id as string}
          items={[
            {
              action: () =>
                router.push({
                  pathname: "/dashboard/orders/order-detail/",
                  query: { id: row?.id },
                }),
              label: "Thông tin chi tiết",
            },
            {
              action: () => onOpen("UpdateStatus"),
              label: "Trạng thái",
            },
            {
              action: () => onOpen("AddNote"),
              label: "Ghi chú",
            },
            {
              action: () =>
                router.push({
                  pathname: "/dashboard/warehouse/export-detail/",
                  query: { fromOrderId: row?.id },
                }),
              label: "Tạo phiếu xuất kho",
              disabled: row?.status !== 2,
            },
            {
              action: () =>
                router.push({
                  pathname: "/dashboard/orders/bill-detail/",
                  query: { fromOrderId: row?.id },
                }),
              label: "Tạo hóa đơn",
            },
          ]}
        />
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  // METHODS
  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  const [Open, setOpen] = useState<boolean>(false);
  const dataViewDetail = useRef<any>();
  const handleViewProduct = async (e: React.MouseEvent<HTMLElement>) => {
    const id: any = e.currentTarget.dataset.id;
    const currentRow = await mainOrder.getMainOrderDetail(id).then((res) => {
      return res.data;
    });

    dataViewDetail.current = { ...currentRow, id: id };
    setOpen(true);
  };

  return (
    <Paper className="bgContainer p-3 shadow">
      <Box className="flex gap-4 items-center mb-3">
        <Box>
          <AddButton
            variant="contained"
            onClick={() => router.push("/dashboard/orders/order-detail")}
          >
            TẠO MỚI ĐƠN ĐẶT HÀNG
          </AddButton>
        </Box>
      </Box>
      <ContextMenuWrapper
        menuId="order_request_table_menu"
        menuComponent={
          <Menu className="p-0" id="order_request_table_menu">
            <Item
              id="view-order"
              onClick={() =>
                router.push({
                  pathname: "/dashboard/orders/order-detail/",
                  query: { id: defaultValue.current?.id },
                })
              }
            >
              Xem chi tiết
            </Item>

            <Item id="update-status" onClick={() => onOpen("UpdateStatus")}>
              Trạng thái
            </Item>

            <Item id="order-note" onClick={() => onOpen("AddNote")}>
              Ghi chú
            </Item>

            <Item
              id="warehouse-export"
              onClick={() =>
                router.push({
                  pathname: "/dashboard/warehouse/export-detail/",
                  query: { fromOrderId: defaultValue.current?.id },
                })
              }
              disabled={defaultValue.current?.status !== 2}
            >
              Tạo phiếu xuất kho
            </Item>

            <Item
              id="delete-order"
              onClick={() =>
                router.push({
                  pathname: "/dashboard/orders/bill-detail/",
                  query: { fromOrderId: defaultValue.current?.id },
                })
              }
            >
              Tạo hóa đơn
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
              onDoubleClick: handleViewProduct,
            },
          }}
          getRowClassName={({ id }) =>
            dataViewDetail?.current?.id == id && Open ? "!bg-[#fde9e9]" : ""
          }
        />
      </ContextMenuWrapper>

      <BookingOrderStatusDialog
        onClose={onClose}
        open={Boolean(dialog.open && dialog.type === "UpdateStatus")}
        type={dialog.type}
        defaultValue={defaultValue.current}
      />

      <BookingOrderNoteDialog
        onClose={onClose}
        open={Boolean(dialog.open && dialog.type === "AddNote")}
        type={dialog.type}
        defaultValue={defaultValue.current}
      />
      <ViewListProductDrawer
        Open={Open}
        onClose={() => setOpen(false)}
        data={dataViewDetail?.current?.mainOrderDetail}
      />
    </Paper>
  );
};
