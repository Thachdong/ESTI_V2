import { Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState, MouseEvent } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { staff, TStaff } from "src/api";
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
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
      ...query,
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
    if (confirm("X??c nh???n x??a nh??n vi??n: " + defaultValue?.username)) {
      await mutateDelete.mutateAsync(defaultValue?.id as string);
    }
  }, [defaultValue]);

  const columns: TGridColDef[] = [
    ...staffColumns,
    {
      field: "action",
      headerName: "Thao t??c",
      width: 100,
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
          <SearchBox />
        </div>

        <div className="w-1/2 flex items-center justify-end">
          <AddButton
            variant="contained"
            className="mr-3"
            onClick={() => setDialog({ open: true, type: "Add" })}
          >
            T???o nh?? nh??n vi??n
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
              Xem chi ti???t
            </Item>
            <Item id="delete-product" onClick={onDelete}>
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

      <StaffDialog
        onClose={() => setDialog({ open: false })}
        open={dialog.open}
        type={dialog.type}
        defaultValue={defaultValue as any}
      />
    </Paper>
  );
};
