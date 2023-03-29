import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useState, MouseEvent, useRef } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { role, suppliers, TSupplier } from "src/api";
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
import { curatorPositions, defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { toast } from "~modules-core/toast";
import { SuppliersDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { supplider2Columns, supplierColumns } from "./supplierColumns";

export const SuppliersPage = () => {
  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  const { query } = useRouter();

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
      "Suppliers",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      suppliers
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
    const { supplierName, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa nhà cung cấp: " + supplierName)) {
      await mutateDelete.mutateAsync(id as string);
    }
  }, [defaultValue]);

  const columns: TGridColDef<TSupplier>[] = [
    ...supplierColumns,
    {
      field: "curatorPositionName",
      headerName: "Chức vụ",
      minWidth: 150,
      sortAscValue: 12,
      sortDescValue: 4,
      filterKey: "curatorPosition",
      type: "select",
      options: curatorPositions.map(
        (item) => ({ value: item?.id, label: item?.name } as any)
      ),
    },
    ...supplider2Columns,
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
              action: onUpdate,
              label: "Thông tin chi tiết",
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
      <Box className="mb-3 flex items-center justify-between flex-wrap gap-2">
        <Box className="flex items-center gap-3">
          <AddButton
            variant="contained"
            onClick={() => setDialog({ open: true, type: "Add" })}
          >
            Tạo nhà cung cấp
          </AddButton>
          <SearchBox />
        </Box>
        <Box className="flex items-center gap-3">
          <FilterButton listFilterKey={[]} />
          <RefreshButton onClick={() => refetch()} />
          <ExportButton api={suppliers.export} filterParams={{...query, pageSize: 99999}} />
        </Box>
      </Box>

      <ContextMenuWrapper
        menuId="suppliers_table_menu"
        menuComponent={
          <Menu className="p-0" id="suppliers_table_menu">
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

      <SuppliersDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current}
      />
    </Paper>
  );
};
