import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { staff } from "src/api";
import { quoteRequest } from "src/api/quote-request";
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
import { QuoteRequestHeader } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { quotationRequestColumns } from "./data";

export const QuotationRequestsPage = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "quoteRequestsList",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      quoteRequest
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

  const { data: saleStaffs } = useQuery(["SaleStaffs"], () =>
    staff
      .getListSale()
      .then((res) =>
        res.data.map((d: any) => ({ label: d?.code, value: d?.id }))
      )
  );

  // METHODS
  const muatateCancel = useMutation((id: string) => quoteRequest.cancel(id), {
    onSuccess: (data) => {
      toast.success(data?.resultMessage);

      refetch();
    },
  });

  const muatateDelete = useMutation((id: string) => quoteRequest.delete(id), {
    onSuccess: (data) => {
      toast.success(data?.resultMessage);

      refetch();
    },
  });

  const handleCancel = useCallback(async () => {
    const { id, preOrderCode } = defaultValue.current || {};

    if (!id) {
      toast.error("Có lỗi xãy ra, vui lòng thử lại!");

      return;
    }

    if (confirm("Xác nhận tạm dừng yêu cầu " + preOrderCode)) {
      await muatateCancel.mutateAsync(id);
    }
  }, [defaultValue]);

  const handleDelete = useCallback(async () => {
    const { id, preOrderCode } = defaultValue.current || {};

    if (!id) {
      toast.error("Có lỗi xãy ra, vui lòng thử lại!");

      return;
    }

    if (confirm("Xác nhận xóa yêu cầu " + preOrderCode)) {
      await muatateDelete.mutateAsync(id);
    }
  }, [defaultValue]);

  const handleRedirect = useCallback((url: string) => {
    const status = defaultValue.current?.preOrderStatus;

    if (status > 0) {
      toast.error("Yêu cầu đã được xử lý!");

      return;
    }
    router.push(url);
  }, [defaultValue.current]);

  // DATA TABLE
  const columns: TGridColDef[] = [
    ...quotationRequestColumns,
    {
      field: "salesCode",
      headerName: "Nhân viên sale",
      minWidth: 150,
      filterKey: "salesId",
      sortAscValue: 14,
      sortDescValue: 6,
      type: "select",
      options: saleStaffs,
    },
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
                handleRedirect(
                  `quote-request-detail?id=${defaultValue.current?.id}`
                ),
              label: "Nội dung chi tiết",
            },
            {
              action: () =>
                handleRedirect(
                  `quote-detail?fromRequestId=${defaultValue.current?.id}`
                ),
              label: "Tạo báo giá",
              disabled: row?.preOrderStatus > 0,
            },
            {
              action: handleCancel,
              label: "Tạm ngưng yêu cầu",
            },
            {
              action: handleDelete,
              label: "Hủy đơn yêu cầu",
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
          handleRedirect(`quote-request-detail?id=${defaultValue.current?.id}`)
        }
      >
        Nội dung chi tiết
      </Item>
      <Item
        id="note"
        disabled={defaultValue.current?.preOrderStatus > 0}
        onClick={() =>
          handleRedirect(
            `quote-detail?fromRequestId=${defaultValue.current?.id}`
          )
        }
      >
        Tạo báo giá
      </Item>
      <Item id="status" onClick={handleCancel}>
        Tạm ngưng yêu cầu
      </Item>
      <Item id="cancel" onClick={handleDelete}>
        Hủy đơn yêu cầu
      </Item>
    </Menu>
  );

  const paginationProps = generatePaginationProps(pagination, setPagination);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item) => item.id === id);

    defaultValue.current = currentRow;
  };

  return (
    <>
      <QuoteRequestHeader />

      <Paper className="bgContainer">
        <Box className="flex items-center w-3/4 mb-3">
          <AddButton
            onClick={() => handleRedirect("quote-request-detail")}
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
