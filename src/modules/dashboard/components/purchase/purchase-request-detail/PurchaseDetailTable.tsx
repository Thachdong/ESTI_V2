import { Box, List, ListItem, Typography } from "@mui/material";
import moment from "moment";
import { useCallback, useMemo, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import { purchasePlan } from "src/api";
import {
  AddButton,
  BaseButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  FormDatepickerBase,
} from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import { dialogColumns } from "~modules-dashboard/pages/purchase/purchase-plan/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { PurchaseDetailDialog } from "./PurchaseDetailDialog";

export const PurchaseDetailTable = () => {
  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const [planDate, setPlanDate] = useState({
    formDate: moment().startOf("day").valueOf(),
    toDate: moment().endOf("day").valueOf(),
  });

  const defaultValue = useRef<any>();

  const { watch, setValue } = useFormContext();

  const { products = [], supplierId, branchId } = watch() || [];

  // METHODS
  const handleCloseDialog = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const handleOpenDialog = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  const getPurchasePlan = useCallback(async () => {
    if (!supplierId || !branchId) {
      toast.error("Vui lòng chọn chi nhánh và nhà cung cấp trước!");

      return;
    }
    const purchasePlans = await purchasePlan
      .getList({
        pageIndex: 1,
        pageSize: 999,
        supplierId,
        branchId,
        fromdate: planDate?.formDate,
        todate: planDate?.toDate,
      })
      .then((res) => res.data.items)
      .then((res) =>
        res.map((prod: any) => ({
          ...prod,
          manufactor: prod?.productManufactor,
          specs: prod?.productSpecs,
        }))
      );

    setValue("products", purchasePlans || []);
  }, [planDate, supplierId, branchId]);

  const handleRemoveProduct = useCallback(
    (id: string) => {
      const { productCode } =
        products.find((prod: any) => (prod?.id || prod?.productId) === id) ||
        {};

      if (confirm("Xác nhận xóa SP " + productCode)) {
        const filteredProducts = products.filter(
          (prod: any) => (prod?.id || prod?.productId) !== id
        );

        setValue("products", filteredProducts);
      }
    },
    [products]
  );

  const columns: TGridColDef[] = [
    ...dialogColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id}
          items={[
            {
              action: () => setDialog({ open: true, type: "View" }),
              label: "Thông tin chi tiết",
            },
            {
              action: () => handleRemoveProduct(row?.id || row?.productId),
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = products.find(
      (item: any) => item.id === id || item.productId === id
    );

    defaultValue.current = currentRow;
  };

  const getPrice = useMemo(() => {
    const initResult = {
      totalPrice: 0,
      totalTax: 0,
      finalPrice: 0,
    };

    return products.reduce((result: any, { price, quantity, vat }: any) => {
      const total = quantity * price;

      const tax = (total * vat) / 100;

      return {
        totalPrice: _format.getVND(result?.totalPrice + total),
        totalTax: _format.getVND(result?.totalTax + tax),
        finalPrice: _format.getVND(result?.finalPrice + total + tax),
      };
    }, initResult);
  }, [products]);

  return (
    <Box className="flex flex-col mb-4">
      <Box className="flex items-center mb-2">
        <Typography className="font-bold uppercase mr-4">
          THÔNG TIN SẢN PHẨM
        </Typography>

        <AddButton onClick={() => handleOpenDialog("Add")}>Thêm SP</AddButton>
      </Box>

      <Box className="bg-white">
        <Box className="grid grid-cols-5 gap-4 rounded-sm mb-4 p-3">
          <FormDatepickerBase
            label="Từ ngày"
            onChange={(e: any) =>
              setPlanDate((prev) => ({ ...prev, formDate: e }))
            }
            value={planDate.formDate}
            className="col-span-2"
          />
          <FormDatepickerBase
            label="Đến ngày"
            onChange={(e: any) =>
              setPlanDate((prev) => ({ ...prev, toDate: e }))
            }
            value={planDate.toDate}
            className="col-span-2"
          />

          <BaseButton className="truncate" onClick={getPurchasePlan}>
            Lọc SP cần mua
          </BaseButton>
        </Box>

        <ContextMenuWrapper
          menuId="product_table_menu"
          menuComponent={
            <Menu className="p-0" id="product_table_menu">
              <Item
                id="view-product"
                onClick={() => handleOpenDialog("Update")}
              >
                Cập nhật
              </Item>
              <Item
                id="delete-product"
                onClick={() =>
                  handleRemoveProduct(
                    defaultValue.current?.id || defaultValue.current?.productId
                  )
                }
              >
                Xóa
              </Item>
            </Menu>
          }
        >
          <DataTable
            rows={products.map((prod: any, index: number) => ({
              ...prod,
              no: index + 1,
            }))}
            columns={columns}
            hideFooter
            autoHeight
            hideSearchbar
            paginationMode="client"
            getRowId={(row) => row.id || row.productId}
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
      <PurchaseDetailDialog
        onClose={handleCloseDialog}
        open={Boolean(dialog?.open)}
        type={dialog?.type as string}
        defaultValue={defaultValue.current}
      />
    </Box>
  );
};
