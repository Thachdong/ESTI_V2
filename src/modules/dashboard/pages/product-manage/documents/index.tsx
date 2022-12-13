import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { category, productDocument, TDocument } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DeleteButton,
  generatePaginationProps,
  SearchBox,
  ViewButton,
} from "~modules-core/components";
import { defaultPagination, parentCategoryId } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { DocumentDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { documentColumns } from "./data";

export const DocumentsPage: React.FC = () => {
  // EXTRACT PROPS
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const [defaultValue, setDefaultValue] = useState<any>();

  // SIDE EFFECTS
  // PUSH PAGINATION QUERY
  useEffect(() => {
    const initQuery = {
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      ...query,
    };

    router.push({ query: initQuery });
  }, [pagination, router.isReady]);

  // DIALOG METHODS
  const onDialogClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "product-documents",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      productDocument
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

  const { data: parentCategorys } = useQuery(["parentCategorys"], () =>
    category
      .getList({ pageIndex: 1, pageSize: 50, parentId: parentCategoryId })
      .then((res) => res.data.items.map(item => ({value: item.id, label: item.name})))
  );

  // DATA TABLE
  const mutateDelete = useMutation((id: string) => productDocument.delete(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch();
    },
  });

  const handleDelete = useCallback(async () => {
    if (confirm("Xác nhận xóa tài liệu SP: " + defaultValue.productName)) {
      await mutateDelete.mutateAsync(defaultValue.id as string);
    }
  }, [defaultValue]);

  const columns: TGridColDef<TDocument>[] = [
    {
      ...documentColumns[0]
    },
    {
      field: "categoryName",
      headerName: "Nhóm SP",
      sortAscValue: 9,
      sortDescValue: 1,
      filterKey: "category",
      type: "select",
      options: parentCategorys,
      width: 150,
    },
    ...documentColumns.slice(1),
    {
      field: "action",
      headerName: "Thao tác",
      renderCell: () => (
        <>
          <ViewButton
            className="min-h-[40px] min-w-[40px]"
            onClick={() => setDialog({ open: true, type: "View" })}
          />
          <DeleteButton
            onClick={handleDelete}
            className="min-h-[40px] min-w-[40px]"
          />
        </>
      ),
    },
  ];

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item) => item.id === id);

    setDefaultValue(currentRow);
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  // DOM RENDER
  return (
    <Paper className="bgContainer flex flex-col">
      <Box className="grid grid-cols-2 mb-3">
        <SearchBox label="Tìm kiếm sale phụ trách" />

        <Box className="flex items-center justify-end">
          <AddButton
            onClick={() => setDialog({ open: true, type: "Add" })}
            variant="contained"
            className="mr-3"
          >
            Thêm tài liệu
          </AddButton>
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
              Xem chi tiết
            </Item>
            <Item id="delete-product" onClick={handleDelete}>
              Xóa
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
            },
          }}
        />
      </ContextMenuWrapper>

      <DocumentDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue as any}
      />
    </Paper>
  );
};