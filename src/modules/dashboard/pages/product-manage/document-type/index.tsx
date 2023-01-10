import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { documentType } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  RefreshButton,
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

  const defaultValue = useRef<any>();

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
      headerName: "",
      align: "center",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id as string}
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
    const {name, id} = defaultValue.current || {};

    if (confirm("Xác nhận xóa loại tài liệu: " + name)) {
      await mutateDelete.mutateAsync(id as string);
    }
  }, [defaultValue]);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  // DOM RENDER
  return (
    <Paper className="bgContainer flex flex-col">
      <Box className="flex justify-end mb-3">
        <RefreshButton onClick={() => refetch()} />
        <AddButton
          onClick={() => setDialog({ open: true, type: "Add" })}
          variant="contained"
          className="ml-3"
        >
          Thêm tài liệu
        </AddButton>
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
        defaultValue={defaultValue.current}
      />
    </Paper>
  );
};
