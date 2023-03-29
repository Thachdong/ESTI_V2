import { useCallback, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { customerType, TCustomerType } from "src/api/customer-type";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  SearchBox,
} from "~modules-core/components";
import { Box, Paper } from "@mui/material";
import { TGridColDef } from "~types/data-grid";
import { customerTypeColumns } from "./data";
import { Item, Menu } from "react-contexify";
import { toast } from "~modules-core/toast";
import { CustomerTypeDialog } from "~modules-dashboard/components";

export const CustomerTypeConfigPage: React.FC = () => {
  const defaultValue = useRef<TCustomerType | any>();

  const [dialog, setDialog] = useState<{
    open: boolean;
    type?: "Add" | "View";
  }>({ open: false });

  // DIALOG METHODS
  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback((type: "Add" | "View" | undefined) => {
    setDialog({ open: true, type });
  }, []);

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    ["customerTypesList"],
    () => customerType.getAll().then((res) => res.data)
  );

  // DATA TABLE
  const columns: TGridColDef<TCustomerType>[] = [
    ...customerTypeColumns,
    {
      field: "action",
      headerName: "Thao tác",
      maxWidth: 75,
      align: "center",
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id}
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

    const currentRow = data?.find((item) => item.id === id);

    defaultValue.current = currentRow;
  };

  const mutationDelete = useMutation(
    async (id: string) => customerType.delete(id),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch();
      },
    }
  );

  const handleDelete = useCallback(async () => {
    const { id, levelName } = defaultValue.current || {};

    if (confirm(`Xác nhận xóa ${levelName}`)) {
      await mutationDelete.mutateAsync(id);
    }
  }, [defaultValue]);

  return (
    <Paper className="bgContainer">
      <Box className="flex items-center gap-3 mb-3">
        <AddButton variant="contained" onClick={() => onOpen("Add")}>
          Tạo loại khách hàng
        </AddButton>
        <SearchBox label="Tìm kiếm" />
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
            <Item id="delete-product" onClick={handleDelete}>
              Xóa
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={data as []}
          columns={columns}
          gridProps={{
            loading: isLoading || isFetching,
            hideFooterPagination: true,
          }}
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
            },
          }}
          hideSearchbar
          hideFooter
        />
      </ContextMenuWrapper>

      <CustomerTypeDialog
        onClose={onClose}
        open={dialog.open}
        type={dialog.type}
        refetch={refetch}
        defaultValue={defaultValue.current}
      />
    </Paper>
  );
};
