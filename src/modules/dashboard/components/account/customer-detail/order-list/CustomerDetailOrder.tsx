import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useQuery } from "react-query";
import { customer, mainOrder } from "src/api";
import {
  ContextMenuWrapper,
  DataTable,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { orderColumns } from "./data";

export const CustomerDetailOrder: React.FC = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const router = useRouter();

  const { query } = router;

  const { id } = query;

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data: customerDetail } = useQuery(
    ["CustomerDetail", id],
    () => customer.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

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
          //   customerCode: customerDetail?.customer?.code,
          customerCode: "KH-00019",
          ...query,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
      enabled: !!customerDetail?.customer?.code,
    }
  );

  const paginationProps = generatePaginationProps(pagination, setPagination);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  return (
    <Box className="my-4">
      <Typography className="font-bold uppercase text-sm mb-3">
        Danh sách đơn hàng
      </Typography>

      <ContextMenuWrapper
        menuId="order_request_table_menu"
        menuComponent={
          <Menu className="p-0" id="order_request_table_menu">
            <Item id="view-order">Xem chi tiết</Item>

            <Item id="update-status" onClick={() => undefined}>
              Trạng thái
            </Item>

            <Item id="order-note" onClick={() => undefined}>
              Ghi chú
            </Item>

            <Item
              id="delete-order"
              //   onClick={() =>
              //     router.push({
              //       pathname: "/dashboard/orders/bill-detail/",
              //       query: { fromOrderId: defaultValue.current?.id },
              //     })
              //   }
            >
              Tạo hóa đơn
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={data?.items as []}
          columns={orderColumns}
          autoHeight
          gridProps={{
            loading: isLoading || isFetching,
            ...paginationProps,
          }}
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
              //   onDoubleClick: handleViewProduct,
            },
          }}
          //   getRowClassName={({ id }) =>
          //     dataViewDetail?.current?.id == id && Open ? "!bg-[#fde9e9]" : ""
          //   }
        />
      </ContextMenuWrapper>
    </Box>
  );
};
