import { Box, List, ListItem, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useFormContext } from "react-hook-form";
import { purchasePlan } from "src/api";
import {
  AddButton,
  BaseButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  FormDatepickerBase,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import { dialogColumns } from "~modules-dashboard/pages/purchase/purchase-plan/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { PurchaseDetailDialog } from "./PurchaseDetailDialog";

export const PurchaseDetailTable: React.FC = () => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({open: false});

  const [planDate, setPlanDate] = useState({
    formDate: moment().startOf("day").valueOf(),
    toDate: moment().endOf("day").valueOf(),
  });

  const { id } = useRouter().query;

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
              disabled: !!id,
            },
            {
              action: () => handleRemoveProduct(row?.id || row?.productId),
              label: "Xóa",
              disabled: !!id,
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

  return (
    <Box className="flex flex-col mb-4">
      <Box className="flex items-center mb-2">
        <Typography className="font-bold uppercase mr-4 text-sm">
          THÔNG TIN SẢN PHẨM
        </Typography>

        {!id && (
          <AddButton onClick={() => handleOpenDialog("Add")}>Thêm SP</AddButton>
        )}
      </Box>

      <Box className="bg-white rounded">
        {!id && (
          <Box className="grid grid-cols-5 gap-4 rounded mb-4 p-3">
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

            <BaseButton className="truncate bg-main" onClick={getPurchasePlan}>
              Lọc SP cần mua
            </BaseButton>
          </Box>
        )}

        <ContextMenuWrapper
          menuId="product_table_menu"
          menuComponent={
            <Menu className="p-0" id="product_table_menu">
              <Item
                id="view-product"
                disabled={!!id}
                onClick={() => handleOpenDialog("Update")}
              >
                Cập nhật
              </Item>
              <Item
                id="delete-product"
                disabled={!!id}
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

        <List className="border-0 border-t border-solid p-0 pb-1">
          <ListItem className="text-sm grid grid-cols-5 items-center gap-3 py-1 border-b border-0 border-dashed border-grey-3">
            <span className="font-semibold col-span-4 text-right">
              {" "}
              Thành tiền chưa có thuế(VNĐ):{" "}
            </span>
            <span className="text-base">{getPrice.totalPrice}</span>
          </ListItem>
          <ListItem className="text-sm grid grid-cols-5 items-center gap-3 py-1 border-b border-0 border-dashed border-grey-3">
            <span className="font-semibold col-span-4 text-right">
              Thuế GTGT(VNĐ):
            </span>{" "}
            <span className="text-base">{getPrice.totalTax}</span>
          </ListItem>
          <ListItem className="text-sm grid grid-cols-5 items-center gap-3 py-1">
            <span className="font-semibold col-span-4 text-right">
              Tổng cộng tiền thanh toán(VNĐ):
            </span>{" "}
            <span className="text-base">{getPrice.finalPrice}</span>
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
