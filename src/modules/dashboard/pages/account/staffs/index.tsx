import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, {
  useCallback,
  useEffect,
  useState,
  MouseEvent,
  useRef,
} from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { staff, TStaff } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  FilterButton,
  generatePaginationProps,
  RefreshButton,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { toast } from "~modules-core/toast";
import {
  StaffsDialog,
  StaffsStatusDialog,
} from "~modules-dashboard/components/account";
import { TGridColDef } from "~types/data-grid";
import { staffColumns } from "./staffColumns";

type TDialog = {
  open: boolean;
  type?: "View" | "Add" | "UpdateStatus";
};

export const StaffsPage = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDialog>({ open: false });

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  // DIALOG METHODS
  const onUpdate = useCallback(() => {
    setDialog({ open: true, type: "View" });
  }, []);

  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpenStatus = useCallback(() => {
    setDialog({ open: true, type: "UpdateStatus" });
  }, []);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "staffsList",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      staff
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
  const mutateDelete = useMutation((id: string) => staff.deleteStaff(id), {
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
    onSuccess: (data) => {
      refetch();

      toast.success(data.resultMessage);
    },
  });

  const onDelete = useCallback(async () => {
    const { username, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa nhân viên: " + username)) {
      await mutateDelete.mutateAsync(id as string);
    }
  }, [defaultValue]);

  const columns: TGridColDef[] = [
    ...staffColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      align: "center",
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id}
          items={[
            {
              action: onUpdate,
              label: "Thông tin chi tiết",
            },
            {
              action: onOpenStatus,
              label: "Cập nhật trạng thái",
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
            variant="contained"
            onClick={() => setDialog({ open: true, type: "Add" })}
          >
            Tạo nhân viên
          </AddButton>
          <SearchBox />
        </Box>
        <Box className="flex items-center gap-3">
          <FilterButton listFilterKey={[]} />
          <RefreshButton onClick={() => refetch()} />
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
            <Item id="delete-product" onClick={onOpenStatus}>
              Cập nhật trạng thái
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

      <StaffsDialog
        onClose={onClose}
        open={dialog.open && dialog?.type !== "UpdateStatus"}
        defaultValue={defaultValue.current}
        refetch={refetch}
        type={dialog.type}
      />

      <StaffsStatusDialog
        onClose={onClose}
        open={dialog.open && dialog?.type === "UpdateStatus"}
        defaultValue={defaultValue.current}
        refetch={refetch}
      />
    </Paper>
  );
};
