import { Box, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useQuery } from "react-query";
import { exportWarehouse, TWarehouseExport, warehouse } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  FilterButton,
  generatePaginationProps,
  RefreshButton,
  SearchBox,
  StatisticButton,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { _format } from "~modules-core/utility/fomat";
import {
  ViewListProductDrawer,
  WarehouseExportNoteDialog,
  WarehouseExportStatusDialog,
} from "~modules-dashboard/components";
import { warehouseExportColumns } from "~modules-dashboard/pages/warehouse/warehouse-export/data";
import { TDefaultDialogState } from "~types/dialog";

type TProps = {
  onViewReport: () => void;
  ViewReport: boolean;
};

export const WarehouseExportTable: React.FC<TProps> = ({
  onViewReport,
  ViewReport,
}) => {
  // LOCAL STATE AND EXTRACT PROPS
  const router = useRouter();

  const { query } = router;

  const defaultValue = useRef<any>();

  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const [pagination, setPagination] = useState(defaultPagination);

  usePathBaseFilter(pagination);

  // DIALOG METHODS
  const onCloseDialog = useCallback(() => {
    setDialog({ open: false, type: undefined });
  }, []);

  const onOpenNoteDialog = useCallback(() => {
    setDialog({ open: true, type: "note" });
  }, []);

  const onOpenStatusDialog = useCallback(() => {
    setDialog({ open: true, type: "status" });
  }, []);

  const onNavigationToDetail = useCallback(() => {
    const { id } = defaultValue.current || {};

    router.push(`/dashboard/warehouse/export-detail?id=${id}`);
  }, [router, defaultValue]);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "exportWarehouse",
      "loading",
      {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        ...query,
      },
    ],
    () =>
      exportWarehouse
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
  const columns: GridColDef<TWarehouseExport>[] = [
    ...warehouseExportColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      flex: 0,
      align: "center",
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id as string}
          items={[
            {
              action: onNavigationToDetail,
              label: "Chi tiết xuất kho",
            },
            {
              action: onOpenNoteDialog,
              label: "Ghi chú",
            },
            {
              action: onOpenStatusDialog,
              label: "Trạng thái",
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

  const [Open, setOpen] = useState<boolean>(false);
  const dataViewDetail = useRef<any>();
  const handleViewProduct = async (e: React.MouseEvent<HTMLElement>) => {
    const id: any = e.currentTarget.dataset.id;
    const currentRow = await warehouse
      .getExportWarehouseDetail(id)
      .then((res) => {
        return res.data;
      });

    dataViewDetail.current = { ...currentRow, id: id };
    setOpen(true);
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer">
      <Box className="flex justify-between items-center flex-wrap gap-3 mb-3">
        <Box className="flex items-center gap-3">
          <AddButton
            variant="contained"
            onClick={() => router.push("/dashboard/warehouse/export-detail")}
          >
            Tạo phiếu xuất kho
          </AddButton>

          <SearchBox />
        </Box>

        <Box className="flex gap-2">
          <StatisticButton onClick={onViewReport} View={ViewReport} />

          <FilterButton listFilterKey={[]} />

          <RefreshButton onClick={() => refetch()} />
        </Box>
      </Box>

      <ContextMenuWrapper
        menuId="warehouse_import_menu"
        menuComponent={
          <Menu className="font-bold text-sm p-2" id="warehouse_import_menu">
            <Item id="view-detail" onClick={onNavigationToDetail}>
              Chi tiết xuất kho
            </Item>
            <Item id="delete-transaction" onClick={onOpenNoteDialog}>
              Ghi chú
            </Item>
            <Item id="transation-note" onClick={onOpenStatusDialog}>
              Trạng thái
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
              onDoubleClick: handleViewProduct,
            },
          }}
          getRowClassName={({ id }) =>
            dataViewDetail?.current?.id == id && Open ? "!bg-[#fde9e9]" : ""
          }
        />
      </ContextMenuWrapper>

      <WarehouseExportNoteDialog
        onClose={onCloseDialog}
        open={Boolean(dialog?.open && dialog.type === "note")}
        defaultValue={defaultValue.current}
      />

      <WarehouseExportStatusDialog
        onClose={onCloseDialog}
        open={Boolean(dialog?.open && dialog.type === "status")}
        defaultValue={defaultValue.current}
        refetch={refetch}
      />

      <ViewListProductDrawer
        Open={Open}
        onClose={() => setOpen(false)}
        data={dataViewDetail?.current?.productOrderDetail}
      />
    </Paper>
  );
};
