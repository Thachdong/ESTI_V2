import { Box, Paper } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { TWarehouseExport, warehouse } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import {
  ViewListProductDrawer,
  WarehouseImportNoteDialog,
} from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { importWarehouseColumns } from "./data";

export const WarehouseImportPage: React.FC = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const defaultValue = useRef<any>();

  const [dialog, setDialog] = useState<TDefaultDialogState>();

  usePathBaseFilter(pagination);

  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "importWarehouse",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      warehouse
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
  const columns: TGridColDef<TWarehouseExport>[] = [
    ...importWarehouseColumns,
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
              action: handleRedirectToDetail,
              label: "Chi tiết nhập kho",
            },
            {
              action: handleDeleteTransaction,
              label: "Hủy nhập kho",
            },
            {
              action: () => console.log(""),
              label: "Ghi chú",
            },
          ]}
        />
      ),
    },
  ];

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item: any) => item?.id === id);

    defaultValue.current = currentRow;
  };

  const handleRedirectToDetail = useCallback(() => {
    const { id } = defaultValue.current || {};

    router.push({
      pathname: "/dashboard/warehouse/import-detail",
      query: {
        id,
      },
    });
  }, [defaultValue]);

  const deleteMutation = useMutation(
    (id: string) => warehouse.deleteTransaction(id),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch();
      },
    }
  );

  const handleDeleteTransaction = useCallback(async () => {
    const { warehouseSessionCode, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa phiên nhập kho " + warehouseSessionCode)) {
      await deleteMutation.mutateAsync(id);
    }
  }, [deleteMutation, defaultValue]);

  const [Open, setOpen] = useState<boolean>(false);
  const dataViewDetail = useRef<any>();
  const handleViewProduct = async (e: React.MouseEvent<HTMLElement>) => {
    const id: any = e.currentTarget.dataset.id;
    const currentRow = await warehouse
      .getImportWarehouseDetail(id)
      .then((res) => {
        return res.data;
      });
    dataViewDetail.current = { ...currentRow, id: id };
    setOpen(true);
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer">
      <Box className="text-left mb-3">
        <Link href="/dashboard/warehouse/import-detail">
          <AddButton variant="contained">Tạo phiếu nhập kho</AddButton>
        </Link>
      </Box>

      <ContextMenuWrapper
        menuId="warehouse_import_menu"
        menuComponent={
          <Menu className="p-0" id="warehouse_import_menu">
            <Item id="view-detail" onClick={handleRedirectToDetail}>
              Chi tiết nhập kho
            </Item>
            <Item id="delete-transaction" onClick={handleDeleteTransaction}>
              Hủy nhập kho
            </Item>
            <Item
              id="transation-note"
              onClick={() => setDialog({ open: true, type: "note" })}
            >
              Ghi chú
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
          getRowClassName={({ id }) =>
            dataViewDetail?.current?.id == id && Open ? "!bg-[#fde9e9]" : ""
          }
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
              onDoubleClick: handleViewProduct,
            },
          }}
        />
      </ContextMenuWrapper>

      <WarehouseImportNoteDialog
        onClose={() => setDialog({ open: false, type: undefined })}
        open={!!dialog?.open}
        defaultValue={defaultValue.current}
      />

      <ViewListProductDrawer
        Open={Open}
        onClose={() => setOpen(false)}
        data={dataViewDetail?.current?.warehouse as []}
      />
    </Paper>
  );
};
