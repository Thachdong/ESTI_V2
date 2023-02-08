import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useFormContext } from "react-hook-form";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
} from "~modules-core/components";
import { QuoteRequestDetailDialog } from "~modules-dashboard/components";
import { productColumns } from "~modules-dashboard/pages/quotation/quote-request-detail/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";

export const QuoteRequestDetailProduct: React.FC = () => {
  const {id} = useRouter().query;

  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const defaultValue = useRef<any>();

  const { watch, setValue } = useFormContext();

  const products = watch("products");

  const columns: TGridColDef[] = [
    ...productColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id}
          items={[
            {
              action: () => onOpen("Update"),
              label: "Thông tin chi tiết",
              disabled: !!id
            },
            {
              action: handleDelete,
              label: "Xóa",
              disabled: !!id
            },
          ]}
        />
      ),
    },
  ];

  // METHODS
  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  const handleDelete = useCallback(() => {
    const { productCode, no } = defaultValue.current || {};

    if (confirm("Xác nhận xóa SP: " + productCode)) {
      setValue(
        "products",
        products.filter((prod: any) => prod?.no !== no)
      );
    }
  }, [defaultValue, products]);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = products.find((item: any) => item.no?.toString() === id);

    defaultValue.current = currentRow;
  };

  return (
    <Box className="flex flex-col col-span-2">
      <Box className="flex items-center mb-3">
        <Typography className="font-bold uppercase mr-3">Sản phẩm</Typography>

        <AddButton disabled={!!id} onClick={() => onOpen("Add")}>Thêm SP báo giá </AddButton>
      </Box>

      <Box className="bg-white">
        <ContextMenuWrapper
          menuId="product_table_menu"
          menuComponent={
            <Menu className="p-0" id="product_table_menu">
              <Item id="view-product" disabled={!!id} onClick={() => onOpen("Update")}>
                Cập nhật
              </Item>
              <Item id="delete-product" disabled={!!id} onClick={handleDelete}>
                Xóa
              </Item>
            </Menu>
          }
        >
          <DataTable
            columns={columns}
            rows={products}
            hideFooter
            hideSearchbar
            autoHeight
            getRowId={(row) => row.no}
            componentsProps={{
              row: {
                onMouseEnter: onMouseEnterRow,
              },
            }}
            paginationMode="client"
          />
        </ContextMenuWrapper>
      </Box>

      <QuoteRequestDetailDialog
        onClose={onClose}
        open={!!dialog?.open}
        type={dialog?.type}
        defaultValue={defaultValue.current}
      />
    </Box>
  );
};
