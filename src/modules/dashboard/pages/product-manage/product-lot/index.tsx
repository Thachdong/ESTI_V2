import { Box, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useMutation, useQuery } from "react-query";
import { productDocument, productLot, TDocument } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  FilterButton,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { usePathBaseFilter } from "~modules-core/customHooks";
import { toast } from "~modules-core/toast";
import { ProductLotDialog } from "~modules-dashboard/components";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { lotColumns } from "./data";

export const ProductLotPage: React.FC = () => {
  // EXTRACT PROPS
  const router = useRouter();

  const { query } = router;

  const [pagination, setPagination] = useState(defaultPagination);

  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const defaultValue = useRef<any>();

  usePathBaseFilter(pagination);

  // DIALOG METHODS
  const onDialogClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "ProductLotList",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      productLot
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
  const mutateDelete = useMutation((id: string) => productLot.delete(id), {
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch();
    },
  });

  const handleDelete = useCallback(async () => {
    const { lotNumber, id } = defaultValue.current || {};

    if (confirm("Xác nhận xóa LOT: " + lotNumber)) {
      await mutateDelete.mutateAsync(id as string);
    }
  }, [defaultValue]);

  const columns: TGridColDef<TDocument>[] = [
    ...lotColumns,
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
              action: () => setDialog({ open: true, type: "View" }),
              label: "Thông tin chi tiết",
            },
            {
              action: handleDelete,
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = data?.items.find((item) => item.id === id);

    defaultValue.current = currentRow;
  };

  const paginationProps = generatePaginationProps(pagination, setPagination);

  // DOM RENDER
  return (
    <Paper className="bgContainer flex flex-col">
      <Box className="flex items-center gap-3 w-3/5 mb-3">
        <Box className="flex items-center justify-end">
          <AddButton
            onClick={() => setDialog({ open: true, type: "Add" })}
            variant="contained"
          >
            Thêm LOT
          </AddButton>
        </Box>

        <SearchBox label="Tìm kiếm" />

        <FilterButton listFilterKey={[]} />
      </Box>

      <ContextMenuWrapper
        menuId="product_lot_menu"
        menuComponent={
          <Menu className="p-0" id="product_lot_menu">
            <Item
              id="view-lot"
              onClick={() => setDialog({ open: true, type: "View" })}
            >
              Xem chi tiết
            </Item>
            <Item id="delete-lot" onClick={handleDelete}>
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

      <ProductLotDialog
        onClose={onDialogClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current}
      />
    </Paper>
  );
};
