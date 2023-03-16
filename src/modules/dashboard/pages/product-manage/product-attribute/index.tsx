import { Box, Paper } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { productAtribute } from "src/api";
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
import { ProductAttributeDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";

export const ProductAttributePage = () => {
  // EXTRACT PROPS
  const router = useRouter();

  const { query } = router;

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const [pagination, setPagination] = useState(defaultPagination);

  const defaultValue = useRef<any>();

  // DIALOG METHODS
  const onDialogClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "ProductAttributeList",
      {
        ...query,
        ...pagination,
      },
    ],
    () =>
      productAtribute
        .getList({
          ...query,
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        })
        .then((res) => res.data),
    {
      onSuccess: (data: any) => {
        setPagination({ ...pagination, total: data?.totalItem });
      },
    }
  );

  // DATA TABLE
  const columns: TGridColDef[] = [
    {
      field: "productAttributesName",
      headerName: "Tên thuộc tính",
      isSort: false,
      filterKey: "productAttributesName",
      flex: 1,
    },
    {
      field: "productAttributesCode",
      headerName: "Đơn vị",
      filterKey: "productAttributesCode",
      isSort: false,
      flex: 1,
    },
    {
      field: "createdByName",
      headerName: "Người tạo",
      filterKey: "createdBy",
      isSort: false,
      flex: 1,
    },
    {
      field: "created",
      headerName: "Người tạo",
      filterKey: "createdDate",
      type: "date",
      isSort: false,
      renderCell: ({ row }) =>
        row?.created ? moment(row?.created).format("DD/MM/YYYY") : "",
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

  const mutateDelete = useMutation((id: string) => productAtribute.delete(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch();
    },
  });

  const handleDelete = useCallback(async () => {
    const { productAttributesName, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa thuộc tính: " + productAttributesName)) {
      await mutateDelete.mutateAsync(id as string);
    }
  }, [defaultValue]);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items?.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  // DOM RENDER
  return (
    <Paper className="bgContainer flex flex-col">
      <Box className="flex justify-between mb-3">
        <AddButton
          onClick={() => setDialog({ open: true, type: "Add" })}
          variant="contained"
        >
          Thêm thuộc tính
        </AddButton>
        <RefreshButton onClick={() => refetch()} />
      </Box>

      <ContextMenuWrapper
        menuId="attribute_table_menu"
        menuComponent={
          <Menu className="p-0" id="attribute_table_menu">
            <Item
              id="view-attribute"
              onClick={() => setDialog({ open: true, type: "View" })}
            >
              Xem chi tiết
            </Item>
            <Item id="delete-attribute" onClick={handleDelete}>
              Xóa
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={data?.items || []}
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

      <ProductAttributeDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current}
      />
    </Paper>
  );
};
