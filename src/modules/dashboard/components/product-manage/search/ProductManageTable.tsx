import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { productManage, products, warehouseConfig } from "src/api";
import {
  ContextMenuWrapper,
  DataTable,
  DeleteButton,
  DownloadButton,
  DropdownButton,
  generatePaginationProps,
  SearchBox,
  ViewButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { toast } from "~modules-core/toast";
import { ProductManageDialog } from "~modules-dashboard/components";
import {
  columnGroupingModel,
  productManageColumns,
} from "~modules-dashboard/pages/product-manage/search/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";

export const ProductManageTable = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  // DIALOG METHODS
  const onDialogClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  // DATA FETCHING
  const { data, refetch } = useQuery(
    [
      "productsList",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        ...query,
      },
    ],
    () =>
      productManage
        .getList({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          ...query,
        })
        .then((res) => {
          const { items } = res.data;
          // ADD ID TO EACH ITEM
          const updatedItems = items?.map((item, index) => ({
            ...item,
            rowId: "row_id_" + index,
          }));

          return { ...res.data, items: updatedItems };
        }),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
    }
  );

  const { data: warehouseIds } = useQuery(["warehouseIds"], () =>
    warehouseConfig.getList({ pageIndex: 1, pageSize: 999 }).then((res) =>
      res.data?.items?.map((item: any) => ({
        value: item?.id,
        label: item?.code,
      }))
    )
  );

  // DATA TABLE
  const mutateDelete = useMutation((id: string) => products.delete(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch();
    },
  });

  const columns: TGridColDef[] = [
    {
      field: "warehouseConfigCode",
      headerName: "Mã Kho",
      sortAscValue: 7,
      sortDescValue: 0,
      filterKey: "warehouseConfigId",
      minWidth: 150,
      flex: 1,
      type: "select",
      options: warehouseIds as [],
    },
    ...productManageColumns,
    {
      field: "action",
      headerName: "",
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
              action: handleDelete,
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  const handleDelete = useCallback(async () => {
    const { id, productName } = defaultValue.current || {};

    if (!id) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại!");

      return;
    }

    if (confirm("Xác nhận xóa SP: " + productName)) {
      await mutateDelete.mutateAsync(id as string);
    }
  }, [defaultValue]);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item) => item.rowId === id);

    defaultValue.current = currentRow;
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer flex flex-col">
      <Box className="grid grid-cols-2 mb-3">
        <SearchBox label="Tra cứu mã kho, mã sp, tên sp, hãng sản xuất" />

        <Box className="flex items-center justify-end">
          <DownloadButton
            onClick={() =>
              productManage.downloadAllProduct({ pageSize: 9999, pageIndex: 1 })
            }
            variant="contained"
            className=""
          >
            Tải file excel
          </DownloadButton>
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
              Xem chi tiết SP
            </Item>
            <Item id="delete-product" onClick={handleDelete}>
              Xóa SP
            </Item>
          </Menu>
        }
      >
        <DataTable
          experimentalFeatures={{ columnGrouping: true }}
          columnGroupingModel={columnGroupingModel}
          rows={data?.items as []}
          columns={columns}
          gridProps={{
            ...paginationProps,
          }}
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
            },
          }}
          getRowId={(row) => row.rowId}
          className="grouping-column "
        />
      </ContextMenuWrapper>

      <ProductManageDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current}
      />
    </Paper>
  );
};
