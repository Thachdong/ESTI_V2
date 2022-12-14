import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { documentType, TDocumentType } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DeleteButton,
  SearchBox,
  ViewButton,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { DocumentTypeDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";

export const DocumentTypesPage = () => {
  // EXTRACT PROPS
  const router = useRouter();

  const { query } = router;

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const [defaultValue, setDefaultValue] = useState<any>();

  // SIDE EFFECTS
  // PUSH PAGINATION QUERY
  useEffect(() => {
    router.push({ query });
  }, [router.isReady]);

  // DIALOG METHODS
  const onDialogClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "document-types",
      "loading",
      {
        ...query,
      },
    ],
    () => documentType.getList({ ...query }).then((res) => res.data)
  );

  // DATA TABLE
  const columns: TGridColDef[] = [
    {
      field: "name",
      headerName: "Loại tài liệu",
      isFilter: false,
      isSort: false,
      flex: 1,
    },
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

  const mutateDelete = useMutation((id: string) => documentType.delete(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch();
    },
  });

  const handleDelete = useCallback(async () => {
    if (confirm("Xác nhận xóa loại tài liệu: " + defaultValue.name)) {
      await mutateDelete.mutateAsync(defaultValue.id as string);
    }
  }, [defaultValue]);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.find((item: any) => item.id === id);

    setDefaultValue(currentRow);
  };

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
          rows={data || []}
          columns={columns}
          gridProps={{
            loading: isLoading || isFetching,
          }}
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
            },
          }}
          hideSearchbar={true}
          hideFooterPagination={true}
        />
      </ContextMenuWrapper>

      <DocumentTypeDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue as any}
      />
    </Paper>
  );
};
