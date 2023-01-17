import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { preQuote } from "src/api";
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
import { toast } from "~modules-core/toast";
import { TGridColDef } from "~types/data-grid";
import { quoteListColumns } from "./data";

export const QuoteListPage = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "preQuoteList",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      preQuote
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
  const muatateCancel = useMutation((id: string) => preQuote.cancel(id), {
    onSuccess: (data) => {
      toast.success(data?.resultMessage);

      refetch();
    },
  });

  const handleCancel = useCallback(async () => {
    const { id, preQuoteCode } = defaultValue.current || {};

    if (!id) {
      toast.error("Có lỗi xãy ra, vui lòng thử lại!");

      return;
    }

    if (confirm("Xác nhận hủy báo giá " + preQuoteCode)) {
      await muatateCancel.mutateAsync(id);
    }
  }, [defaultValue]);

  const handleRedirect = useCallback((url: string) => {
    router.push(url);
  }, []);

  // DATA TABLE
  const columns: TGridColDef[] = [
    ...quoteListColumns,
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
                handleRedirect(`quote-detail?id=${defaultValue.current?.id}`),
              label: "Nội dung chi tiết",
            },
            {
              action: () => handleRedirect("/dashboard/orders/order-request"),
              label: "Tạo đơn đặt hàng",
            },
            {
              action: handleCancel,
              label: "Hủy đơn báo giá",
            },
          ]}
        />
      ),
    },
  ];

  const contextMenu = (
    <Menu className="p-0" id="quote-request_table_menu">
      <Item
        id="view"
        onClick={() =>
          handleRedirect(`quote-detail?id=${defaultValue.current?.id}`)
        }
      >
        Nội dung chi tiết
      </Item>

      <Item
        id="note"
        onClick={() => handleRedirect("/dashboard/orders/order-request")}
      >
        Tạo đơn đặt hàng
      </Item>

      <Item id="cancel" onClick={handleCancel}>
        Hủy đơn báo giá
      </Item>
    </Menu>
  );

  const paginationProps = generatePaginationProps(pagination, setPagination);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  return (
    <>
      <Paper className="bgContainer">
        <Box className="flex items-center w-3/4 mb-3">
          <AddButton
            onClick={() => handleRedirect("quote-detail")}
            className="w-1/2 mr-3"
          >
            Tạo yêu cầu
          </AddButton>

          <SearchBox label="Nhập mã đơn Y/C, mã KH, tên KH" />
        </Box>

        <ContextMenuWrapper
          menuId="quote-request_table_menu"
          menuComponent={contextMenu}
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
      </Paper>
    </>
  );
};