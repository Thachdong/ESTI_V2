import { Box, List, ListItem, Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useFormContext } from "react-hook-form";
import { askPrice } from "src/api";
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
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { dialogColumns } from "./data";
import { PurchaseDetailDialog } from "./SupplierQuotesDetailDialog";

type TProps = {
  disabled: boolean;
};

export const SupplierQuotesDetailProduct: React.FC<TProps> = ({ disabled }) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const [planDate, setPlanDate] = useState({
    formDate: moment().subtract(1, "month").startOf("day").valueOf(),
    toDate: moment().endOf("day").valueOf(),
  });

  const { id } = useRouter().query;

  const defaultValue = useRef<any>();

  const { watch, setValue } = useFormContext();

  const { products = [], supplierCode } = watch() || [];

  // METHODS
  const handleCloseDialog = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const handleOpenDialog = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  const getSupplierQuotePlan = useCallback(async () => {
    if (!supplierCode) {
      toast.error("Vui lòng chọn nhà cung cấp trước!");

      return;
    }
    const orderPlans = await askPrice
      .getList({
        pageIndex: 1,
        pageSize: 999,
        supplierCode,
        fromdate: planDate?.formDate,
        todate: planDate?.toDate,
      })
      .then((res) => res.data.items || []);

    setValue("products", [...products, ...orderPlans]);
  }, [planDate, supplierCode]);

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
              label: "Cập nhật",
              disabled: disabled,
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

            <BaseButton
              className="truncate bg-main px-2"
              onClick={getSupplierQuotePlan}
            >
              Lọc SP cần hỏi giá
            </BaseButton>
          </Box>
        )}

        <ContextMenuWrapper
          menuId="product_table_menu"
          menuComponent={
            <Menu className="p-0" id="product_table_menu">
              <Item
                id="view-product"
                disabled={disabled}
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

        <List className="border-0 border-t border-solid px-3">
          <ListItem className="h-[34px] flex items-center gap-3 text-sm border-0 border-b border-dashed border-grey-3">
            <span className="font-semibold">
              {" "}
              Thành tiền chưa có thuế(VNĐ):{" "}
            </span>
            <span className="text-base">{getPrice.totalPrice}</span>
          </ListItem>
          <ListItem className="h-[34px] flex items-center gap-3 text-sm border-0 border-b border-dashed border-grey-3">
            <span className="font-semibold">Thuế GTGT(VNĐ):</span>{" "}
            <span className="text-base">{getPrice.totalTax}</span>
          </ListItem>
          <ListItem className="h-[34px] flex items-center gap-3 text-sm">
            <span className="font-semibold">
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
