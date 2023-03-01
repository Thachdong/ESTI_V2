import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { askPrice } from "src/api";
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
import { SupplierQuotesProductDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { suplierQuotesProductColumns } from "./data";

export const SupplierQuotesProductPage: React.FC = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const router = useRouter();

  const { query } = router;

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  // DIALOG METHODS
  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  // DATA FETCHING
  const {
    data: productList,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(
    [
      "SupplierQuotesProductList",
      {
        pageSize: pagination.pageSize,
        pageIndex: pagination.pageIndex,
        ...query,
      },
    ],
    () =>
      askPrice
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
    ...suplierQuotesProductColumns,
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
              action: () => onOpen("View"),
              label: "Xem chi tiết",
            },
            {
              action: () => handleCancel,
              label: "Hủy",
            },
          ]}
        />
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = productList?.items.find((item) => item.id === id);

    defaultValue.current = currentRow;
  };

  const cancelMutate = useMutation((id: string) => askPrice.cancel(id), {
    onSuccess: (data: any) => {
      toast.success(data?.resultMessage);

      refetch();
    },
  });

  const handleCancel = useCallback(async () => {
    const { id, productName } = defaultValue.current || {};

    if (confirm(`Xác nhận hủy sản phẩm ${productName}`)) {
      await cancelMutate.mutateAsync(id);
    }
  }, [defaultValue.current]);

  return (
    <Paper className="bgContainer">
      <Box className="flex justify-between mb-3">
        <Box className="w-1/2 xl:w-1/3">
          <SearchBox />
        </Box>

        <AddButton onClick={() => onOpen("Add")}>
          Tạo sản phẩm cần hỏi giá
        </AddButton>
      </Box>

      <ContextMenuWrapper
        menuId="customer_table_menu"
        menuComponent={
          <Menu className="p-0" id="customer_table_menu">
            <Item id="view" onClick={() => onOpen("View")}>
              Xem chi tiết
            </Item>
            <Item id="status" onClick={handleCancel}>
              Hủy
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={productList?.items || []}
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

      <SupplierQuotesProductDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type as string}
        defaultValue={defaultValue.current}
        refetch={refetch}
      />
    </Paper>
  );
};
