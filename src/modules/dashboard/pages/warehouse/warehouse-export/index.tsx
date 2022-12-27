import { Box, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Item, Menu } from "react-contexify";
import { useQuery } from "react-query";
import { exportWarehouse, TWarehouseExport } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { _format } from "~modules-core/utility/fomat";
import { TDefaultDialogState } from "~types/dialog";
import { warehouseExportColumns } from "./data";

export const WarehouseExportPage: React.FC = () => {
  // LOCAL STATE AND EXTRACT PROPS
  const router = useRouter();

  const { query } = router;

  const [defaultValue, setDefaultValue] = useState<any>();

  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const [pagination, setPagination] = useState(defaultPagination);

  usePathBaseFilter(pagination);

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
              action: () => console.log(""),
              label: "Chi tiết xuất kho",
            },
            {
              action: () => console.log(""),
              label: "Ghi chú",
            },
            {
              action: () => console.log(""),
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

    setDefaultValue(currentRow);
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer">
      <Box className="text-right mb-2">
        <AddButton
          variant="contained"
          onClick={() =>
            router.push("/dashboard/warehouse/create-warehouse-export")
          }
        >
          Tạo phiếu xuất kho
        </AddButton>
      </Box>

      <ContextMenuWrapper
        menuId="warehouse_import_menu"
        menuComponent={
          <Menu className="p-0" id="warehouse_import_menu">
            <Item id="view-detail">Chi tiết xuất kho</Item>
            <Item id="delete-transaction">Ghi chú</Item>
            <Item
              id="transation-note"
              onClick={() => setDialog({ open: true, type: "note" })}
            >
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
            },
          }}
        />
      </ContextMenuWrapper>
    </Paper>
  );
};
