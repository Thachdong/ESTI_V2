import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { category, TCategory } from "src/api";
import { AddButton, ContextMenuWrapper, DataTable, DeleteButton, generatePaginationProps, SearchBox, ViewButton } from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { CatalogDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { categoryColumns } from "./categoryColumns";

export const CategoryPage: React.FC = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const [defaultValue, setDefaultValue] = useState<any>();

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
      "categoryList",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      category
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

  // TABLE DATA
  // 1. DELETE ROW
  const mutateDelete = useMutation((id: string) => category.delete(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch();
    },
  });

  const handleDelete = useCallback(async () => {
    if (confirm("X??c nh???n x??a Danh m???c: " + defaultValue?.name)) {
      await mutateDelete.mutateAsync(defaultValue?.id as string);
    }
  }, [defaultValue]);

  const columns: TGridColDef<TCategory>[] = [
    ...categoryColumns,
    {
      field: "action",
      headerName: "Thao t??c",
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

  return (
    <Paper className="bgContainer flex flex-col">
      <Box className="grid grid-cols-2 mb-3">
        <SearchBox label="T??m ki???m sale ph??? tr??ch" />

        <Box className="flex items-center justify-end">
          <AddButton
            onClick={() => setDialog({ open: true, type: "Add" })}
            variant="contained"
            className="mr-3"
          >
            Th??m danh m???c SP
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
              Xem chi ti???t
            </Item>
            <Item id="delete-product" onClick={handleDelete}>
              X??a
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

      <CatalogDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue as any}
      />
    </Paper>
  );
};
