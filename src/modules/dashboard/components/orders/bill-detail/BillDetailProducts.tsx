import { Box, List, ListItem, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useFormContext } from "react-hook-form";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
} from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import { productColumns } from "~modules-dashboard/pages/orders/bill-detail/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { BillDetailDialog } from "./BillDetailDialog";

type TProps = {
  disabled?: boolean;
  productList: any[];
};

export const BillDetailProducts: React.FC<TProps> = ({
  disabled,
  productList,
}) => {
  const { id } = useRouter().query;

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
              disabled: !!id,
            },
            {
              action: handleDelete,
              label: "Xóa",
              disabled: !!id,
            },
          ]}
        />
      ),
    },
  ];

  // METHODS
  const getPrice = useMemo(() => {
    const initResult = {
      totalPrice: 0,
      totalTax: 0,
      finalPrice: 0,
    };

    const resultObj = products.reduce(
      (result: any, { price, quantity, vat }: any) => {
        const total = quantity * price;

        const tax = (total * vat) / 100;

        return {
          totalPrice: result?.totalPrice + total,
          totalTax: result?.totalTax + tax,
          finalPrice: result?.finalPrice + total + tax,
        };
      },
      initResult
    );

    return {
      totalPrice: _format.getVND(resultObj.totalPrice),
      totalTax: _format.getVND(resultObj.totalTax),
      finalPrice: _format.getVND(resultObj.finalPrice),
    };
  }, [products]);

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

    const currentRow = products.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  return (
    <Box className="flex flex-col col-span-2">
      <Box className="flex items-center mb-3 justify-between">
        <Typography className="font-bold uppercase mr-3 text-sm">
          Sản phẩm
        </Typography>

        <AddButton disabled={!!id} onClick={() => onOpen("Add")}>
          Thêm SP
        </AddButton>
      </Box>

      <Box className="bg-white">
        <ContextMenuWrapper
          menuId="product_table_menu"
          menuComponent={
            <Menu className="p-0" id="product_table_menu">
              <Item
                disabled={!!id}
                id="view-product"
                onClick={() => onOpen("Update")}
              >
                Cập nhật
              </Item>
              <Item disabled={!!id} id="delete-product" onClick={handleDelete}>
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
            paginationMode="client"
            componentsProps={{
              row: {
                onMouseEnter: onMouseEnterRow,
              },
            }}
          />
        </ContextMenuWrapper>
        <List className="border-0 border-t border-solid">
          <ListItem>
            Thành tiền chưa có thuế(VNĐ): {getPrice.totalPrice}
          </ListItem>
          <ListItem>Thuế GTGT(VNĐ): {getPrice.totalTax}</ListItem>
          <ListItem>
            Tổng cộng tiền thanh toán(VNĐ): {getPrice.finalPrice}
          </ListItem>
        </List>
      </Box>

      <BillDetailDialog
        onClose={onClose}
        open={!!dialog?.open}
        type={dialog?.type}
        defaultValue={defaultValue.current}
        productList={productList}
      />
    </Box>
  );
};
