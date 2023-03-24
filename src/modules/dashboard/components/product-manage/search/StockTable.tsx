import { Box, Typography } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { stockPlan } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  generatePaginationProps,
  RefreshButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { stockPlanColumns } from "~modules-dashboard/pages/product-manage/search/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { StockDialog } from "./StockDialog";

type TProps = {
  productId: string;
  productCode: string;
  productName: string;
};

export const StockTable: React.FC<TProps> = ({
  productId,
  productCode,
  productName,
}) => {
  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const defaultValue = useRef<any>();

  // DATA FETCHING
  const { data, refetch, isLoading, isFetching } = useQuery(
    [
      "StockPlanList",
      {
        ...pagination,
        productId,
      },
    ],
    () =>
      stockPlan
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          warehouseConfigProductId: productId,
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
      enabled: !!productId,
    }
  );

  // METHODS
  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  const mutateDelete = useMutation((id: string) => stockPlan.delete(id), {
    onSuccess: (data: any) => {
      toast.success(data?.resultMessage);

      refetch();
    },
  });

  const handleDelete = useCallback(async () => {
    if (confirm("Xác nhận xóa kế hoạch stock hàng")) {
      await mutateDelete.mutateAsync(defaultValue.current?.id);
    }
  }, [defaultValue.current]);

  const columns: TGridColDef[] = [
    ...stockPlanColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id as string}
          items={[
            {
              action: () => onOpen("Update"),
              label: "Cập nhật",
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

  const paginationProps = generatePaginationProps(pagination, setPagination);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  return (
    <Box className="flex flex-col h-[75vh]">
      <Box className="flex items-center justify-end my-2">
        <Typography className="flex-grow font-semibold uppercase">
          Kế hoạch
        </Typography>
        <AddButton onClick={() => onOpen("Add")} className="min-w-[45px] mr-3">
          Tạo
        </AddButton>

        <RefreshButton onClick={() => refetch()} />
      </Box>

      <ContextMenuWrapper
        menuId="stock_plan_table_menu"
        menuComponent={
          <Menu className="p-0" id="stock_plan_table_menu">
            <Item id="update" onClick={() => onOpen("Update")}>
              Cập nhật
            </Item>

            <Item id="delete" onClick={handleDelete}>
              Xóa
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={data?.items as []}
          columns={columns}
          gridProps={{
            loading: isFetching || isLoading,
            ...paginationProps,
          }}
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
            },
          }}
          hideSearchbar={true}
        />
      </ContextMenuWrapper>

      <StockDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        product={{
          code: productCode,
          name: productName,
          id: productId,
        }}
        defaultValue={defaultValue.current}
        refetch={refetch}
      />
    </Box>
  );
};
