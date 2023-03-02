import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useQuery } from "react-query";
import { bill } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  FilterButton,
  generatePaginationProps,
  RefreshButton,
  StatisticButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { _format } from "~modules-core/utility/fomat";
import { ViewListProductDrawer } from "~modules-dashboard/components";
import { billColumns } from "~modules-dashboard/pages/orders/bill-list/billColumns";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { BillListBillDialog } from "./BillListBillDialog";
import { BillListStatusDialog } from "./BillListStatusDialog";

type TProps = {
  onViewReport: () => void;
  ViewReport: boolean;
};

export const BillListTable: React.FC<TProps> = ({
  onViewReport,
  ViewReport,
}) => {
  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const router = useRouter();

  const { query } = router;

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "bills",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      bill
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

  // METHODS
  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  // DATA TABLE
  const columns: TGridColDef[] = [
    ...billColumns,
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
              label: "Nội dung chi tiết",
            },
            {
              action: () => onOpen("AddBill"),
              label: "Thêm phiếu thanh toán",
              disabled: !defaultValue.current?.unPaid,
            },
            {
              action: () => onOpen("UpdateStatus"),
              label: "Cập nhật trạng thái",
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

  const [Open, setOpen] = useState<boolean>(false);
  const dataViewDetail = useRef<any>();
  const handleViewProduct = async (e: React.MouseEvent<HTMLElement>) => {
    const id: any = e.currentTarget.dataset.id;
    const currentRow = await bill.getBillDetail(id).then((res) => {
      return res.data;
    });

    dataViewDetail.current = { ...currentRow, id: id };
    setOpen(true);
  };
  return (
    <Paper className="flex-grow !h-screen shadow bgContainer p-3">
      <Box className="flex gap-4 items-center mb-3 justify-between">
        <Box>
          <AddButton
            variant="contained"
            onClick={() => router.push("/dashboard/orders/bill-detail/")}
          >
            TẠO MỚI HOÁ ĐƠN
          </AddButton>
        </Box>
        <Box className="flex gap-2">
          <StatisticButton onClick={onViewReport} View={ViewReport} />
          <FilterButton listFilterKey={[]} />
          <RefreshButton onClick={() => refetch()} />
        </Box>
      </Box>
      <ContextMenuWrapper
        menuId="bill_table_menu"
        menuComponent={
          <Menu className="p-0" id="bill_table_menu">
            <Item
              id="view-bill"
              onClick={() =>
                router.push({
                  pathname: "/dashboard/orders/bill-detail",
                  query: { id: defaultValue.current?.id },
                })
              }
            >
              Nội dung chi tiết
            </Item>
            <Item
              disabled={!defaultValue.current?.unPaid}
              id="add-bill"
              onClick={() => onOpen("AddBill")}
            >
              Thêm phiếu thanh toán
            </Item>
            <Item id="update-bill" onClick={() => onOpen("UpdateStatus")}>
              Cập nhật trạng thái
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

      <BillListBillDialog
        onClose={onClose}
        open={Boolean(dialog.open && dialog.type === "AddBill")}
        type={dialog.type}
        defaultValue={defaultValue.current}
        refetch={refetch}
      />

      <BillListStatusDialog
        onClose={onClose}
        open={Boolean(dialog.open && dialog.type === "UpdateStatus")}
        type={dialog.type}
        defaultValue={defaultValue.current}
        refetch={refetch}
      />

      <ViewListProductDrawer
        Open={Open}
        onClose={() => setOpen(false)}
        data={dataViewDetail?.current?.BillDetailView}
      />
    </Paper>
  );
};
