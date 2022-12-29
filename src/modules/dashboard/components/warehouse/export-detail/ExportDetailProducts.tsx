import { Box, Paper, Typography } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Item, Menu } from "react-contexify";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
} from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { productColumns } from "./data";
import { ProductDialog } from "./ProductDialog";

type TProps = {
  products: any[];
  productOptions: any[];
  warehouseConfigId: string;
  productsOperator: any;
};

export const ExportDetailProducts: React.FC<TProps> = ({
  products,
  productOptions,
  warehouseConfigId,
  productsOperator
}) => {
  // EXTRACT PROPS
  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const [defaultValue, setDefaultValue] = useState<any>();

  const renderProducts = products?.map((product: any, index: number) => ({
    ...product,
    no: index + 1,
  }));

  const totalPrice = useMemo(
    () =>
      products?.reduce(
        (total: number, product: any) => total + product?.totalPrice,
        0
      ),
    [products]
  );

  // DIALOG METHODS
  const onCloseDialog = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onUpdateDialog = useCallback(() => {
    setDialog({ open: true, type: "Update" });
  }, []);

  const onAddDialog = useCallback(() => {
    setDialog({ open: true, type: "Add" });
  }, []);

  const onCopyDialog = useCallback(() => {
    setDialog({ open: true, type: "Copy" });
  }, []);

  const handleDeleteProduct = useCallback(() => {
    if (!defaultValue) return;

    if (confirm("Xác nhận xóa SP: " + defaultValue.productCode)) {
      productsOperator.deleteProduct(defaultValue.id)
    }
  }, [defaultValue]);

  // DATA TABLE
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
              action: onUpdateDialog,
              label: "Cập nhật",
            },
            {
              action: onCopyDialog,
              label: "Copy",
            },
            {
              action: handleDeleteProduct,
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = products?.find((item) => item.id?.toString() === id);

    setDefaultValue(currentRow);
  };

  return (
    <Paper className="rounded-sm p-3">
      <Box className="flex justify-between items-center mb-3">
        <Typography className="text-sm font-medium flex-grow">
          SẢN PHẨM
        </Typography>

        <AddButton
          onClick={onAddDialog}
          variant="contained"
        >
          Thêm SP
        </AddButton>
      </Box>

      <ContextMenuWrapper
        menuId="product_table_menu"
        menuComponent={
          <Menu className="p-0" id="product_table_menu">
            <Item id="update-product" onClick={onUpdateDialog}>
              Cập nhật
            </Item>

            <Item id="copy-product" onClick={onCopyDialog}>
              Copy
            </Item>

            <Item id="delete-product" onClick={handleDeleteProduct}>
              Xóa
            </Item>
          </Menu>
        }
      >
        <DataTable
          rows={renderProducts || []}
          columns={columns}
          autoHeight={true}
          hideSearchbar={true}
          hideFooter
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
            },
          }}
        />
      </ContextMenuWrapper>

      <Typography className="my-3">
        Tổng cộng tiền thanh toán(VNĐ):
        <strong> {_format.getVND(totalPrice)}</strong>
      </Typography>

      <ProductDialog
        onClose={onCloseDialog}
        open={!!dialog?.open}
        type={dialog?.type}
        defaultValue={defaultValue}
        warehouseConfigId={warehouseConfigId}
        productsOperator={productsOperator}
        productOptions={productOptions}
      />
    </Paper>
  );
};