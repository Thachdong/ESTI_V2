import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useState, MouseEvent, useEffect } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { customer, suppliers } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DeleteButton,
  generatePaginationProps,
  SearchBox,
  ViewButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { CustomerDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { CustomerColumns } from "./customerColumns";

export const CustomersPage = () => {
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

  const onUpdate = useCallback(() => {
    setDialog({ open: true, type: "View" });
  }, []);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "customersList",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      customer
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

  // DATA TABLE
  const mutateDelete = useMutation((id: string) => suppliers.delete(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch();
    },
  });

  const onDelete = useCallback(async () => {
    if (confirm("Xác nhận xóa khách hàng: " + defaultValue?.companyName)) {
      await mutateDelete.mutateAsync(defaultValue?.id as string);
    }
  }, []);

  const columns: TGridColDef[] = [
    ...CustomerColumns,
    {
      field: "action",
      headerName: "Thao tác",
      renderCell: () => (
        <>
          <ViewButton
            className="min-h-[40px] min-w-[40px]"
            onClick={onUpdate}
          />
          <DeleteButton
            onClick={onDelete}
            className="min-h-[40px] min-w-[40px]"
          />
        </>
      ),
    },
  ];

  const onMouseEnterRow = (e: MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item) => item.id === id);

    setDefaultValue(currentRow);
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer">
      <div className="flex mb-3">
        <div className="w-1/2">
          <SearchBox label="Tìm kiếm sale phụ trách" />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <AddButton
            onClick={() => setDialog({ open: true, type: "Add" })}
            variant="contained"
            className="mr-3"
          >
            Tạo khách hàng
          </AddButton>
        </div>
      </div>

      <ContextMenuWrapper
        menuId="customer_table_menu"
        menuComponent={
          <Menu id="customer_table_menu">
            <Item
              id="view-product"
              onClick={() => setDialog({ open: true, type: "View" })}
            >
              Xem chi tiết
            </Item>
            <Item id="delete-product" onClick={onDelete}>
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

      <CustomerDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue as any}
      />
    </Paper>
  );
};
