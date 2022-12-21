import { Box, Paper } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useQuery } from "react-query";
import { TWarehouseExport, warehouse } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";
import { importWarehouseColumns } from "./data";

export const WarehouseImportPage: React.FC = () => {
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [defaultValue, setDefaultValue] = useState<any>();

  const [searchContent, setSearchContent] = useState("");

  // PUSH PAGINATION QUERY
  useEffect(() => {
    const initQuery = {
      ...query,
      pageIndex: pagination.pageIndex,
      pageSize: pagination.pageSize,
    };

    router.push({ query: initQuery });
  }, [pagination, router.isReady]);

  const columns: TGridColDef<TWarehouseExport>[] = [
    ...importWarehouseColumns,
    {
      field: "action",
      headerName: "Thao tác",
      align: "center",
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id}
          items={[
            {
              action: () => console.log(""),
              label: "Thông tin chi tiết",
            },
            {
              action: () => console.log(""),
              label: "Lịch sử nhãn",
            },
            {
              action: () => console.log(""),
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "exportWarehouse",
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

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item) => item.id === id);

    setDefaultValue(currentRow);
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Paper className="bgContainer flex flex-col">
      <Box className="text-right mb-2">
        <AddButton
          variant="contained"
          onClick={() =>
            router.push("/dashboard/warehouse/create-warehouse-import")
          }
        >
          Tạo phiếu nhập kho
        </AddButton>
      </Box>

      <ContextMenuWrapper
        menuId="warehouse_import_menu"
        menuComponent={
          <Menu className="p-0" id="warehouse_import_menu">
            <Item id="view-product" onClick={() => console.log("view-product")}>
              Xem chi tiết
            </Item>
            <Item id="view-product" onClick={() => console.log("view-product")}>
              Lịch sử nhãn
            </Item>
            <Item
              id="delete-product"
              onClick={() => console.log("view-product")}
            >
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
    </Paper>
  );
};
