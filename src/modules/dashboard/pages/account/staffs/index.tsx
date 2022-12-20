import { Paper } from "@mui/material";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState, MouseEvent } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { staff, TStaff } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { StaffDialog } from "~modules-dashboard/components/account";
import { TGridColDef } from "~types/data-grid";
import { staffColumns } from "./staffColumns";

type TDialog = {
  open: boolean;
  type?: "View" | "Add";
};

export const StaffsPage = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDialog>({ open: false });

  const [defaultValue, setDefaultValue] = useState<TStaff>();

  // PUSH PAGINATION QUERY
  useEffect(() => {
    const initQuery = {
      ...query,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    };

    router.push({ query: initQuery });
  }, [pagination, router.isReady]);

  // DIALOG METHODS
  const onUpdate = useCallback(() => {
    setDialog({ open: true, type: "View" });
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

      refetch();
    },
    onSuccess: (data) => {
      toast.success(data.resultMessage);
    },
  });

  const onDelete = useCallback(async () => {
    if (confirm("Xác nhận xóa nhân viên: " + defaultValue?.username)) {
      await mutateDelete.mutateAsync(defaultValue?.id as string);
    }
  }, [defaultValue]);

  const columns: TGridColDef[] = [
    ...staffColumns,
    {
      field: "action",
      headerName: "Thao tác",
      width: 100,
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

    setDefaultValue(currentRow);
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer">
      <div className="flex mb-3">
        <div className="w-1/2">
          <SearchBox />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <AddButton
            variant="contained"
            className="mr-3"
            onClick={() => setDialog({ open: true, type: "Add" })}
          >
            Tạo nhà nhân viên
          </AddButton>
        </div>
      </div>

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

      <StaffDialog
        onClose={() => setDialog({ open: false })}
        open={dialog.open}
        type={dialog.type}
        defaultValue={defaultValue as any}
      />
    </Paper>
  );
};
