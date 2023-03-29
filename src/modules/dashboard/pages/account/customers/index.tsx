import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useState, MouseEvent, useRef } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { customer } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  ExportButton,
  FilterButton,
  generatePaginationProps,
  RefreshButton,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { toast } from "~modules-core/toast";
import {
  CustomerFilterBox,
  CustomersCuratorDrawer,
  CustomersDialog,
} from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { CustomerColumns } from "./customerColumns";

export const CustomersPage = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const [open, setOpen] = useState(false);

  const defaultValue = useRef<any>();

  const drawerRef = useRef<any>();

  usePathBaseFilter(pagination);

  // DIALOG METHODS
  const onDialogClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpenDrawer = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const id: any = e.currentTarget.dataset.id;

    drawerRef.current = id;

    setOpen(true);
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
  const mutateDelete = useMutation((id: string) => customer.delete(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch();
    },
  });

  const onDelete = useCallback(async () => {
    const { companyName, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa khách hàng: " + companyName)) {
      await mutateDelete.mutateAsync(id as string);
    }
  }, [defaultValue]);

  const columns: TGridColDef[] = [
    ...CustomerColumns,
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
                router.push({
                  pathname: "/dashboard/account/customer-detail",
                  query: { id: row?.id },
                }),
              label: "Chi tiết / cập nhật",
            },
            {
              action: onDelete,
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  const onMouseEnterRow = (e: MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item) => item.id === id);

    defaultValue.current = currentRow;
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer">
      <Box className="flex justify-between items-center flex-wrap gap-3 mb-3">
        <Box className="flex items-center gap-3">
          <AddButton
            onClick={() => setDialog({ open: true, type: "Add" })}
            variant="contained"
          >
            Tạo khách hàng
          </AddButton>
          <SearchBox label="Tìm kiếm" />
        </Box>
        <Box className="flex items-center gap-3">
          <FilterButton
            listFilterKey={[]}
            renderFilterComponent={() => <CustomerFilterBox />}
          />

          <RefreshButton onClick={() => refetch()} />

          <ExportButton
            api={customer.export}
            filterParams={{ ...query, pageSize: 99999 }}
          />
        </Box>
      </Box>

      <ContextMenuWrapper
        menuId="customer_table_menu"
        menuComponent={
          <Menu className="p-0" id="customer_table_menu">
            <Item
              id="view-product"
              onClick={() =>
                router.push({
                  pathname: "/dashboard/account/customer-detail",
                  query: { id: defaultValue?.current?.id },
                })
              }
            >
              Chi tiết / cập nhật
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
              onDoubleClick: onOpenDrawer,
            },
          }}
          getRowClassName={({ id }) =>
            drawerRef?.current == id && open ? "!bg-[#fde9e9]" : ""
          }
        />
      </ContextMenuWrapper>

      <CustomersDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current}
      />

      <CustomersCuratorDrawer
        open={open}
        onClose={() => setOpen(false)}
        customerId={drawerRef.current}
      />
    </Paper>
  );
};
