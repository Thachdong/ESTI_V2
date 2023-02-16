import { Box, Typography } from "@mui/material";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { products as productApi } from "src/api";
import {
  FormInput,
  FormInputBase,
  FormInputNumber,
  FormSelect,
} from "~modules-core/components";
import { VAT } from "~modules-core/constance";

export const PurchasePlanProduct: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>();

  const { control, watch, setValue } = useFormContext();

  const { supplierId, quantity, price, vat } = watch();

  // DATA FETCHING
  const { data: productBySupplier } = useQuery(
    ["GetProductBySupplier", supplierId],
    () =>
      productApi.getBySupplierId(supplierId as string).then((res) => res.data),
    {
      enabled: !!supplierId,
    }
  );

  // METHODS
  const callback = useCallback((opt: any) => {
    setSelectedProduct(opt);
  }, []);

  useEffect(() => {
    if (!quantity || !price) {
      setValue("totalPrice", 0)
    } else {
      const total = quantity * price;

      const tax = total * (+vat) / 100;

      setValue("totalPrice", total + tax)
    }
    
  }, [quantity, price, vat])

  return (
    <Box className="mb-4">
      <Typography className="font-semibold text-sm mb-2">
        THÔNG TIN SẢN PHẨM CẦN MUA
      </Typography>

      <Box className="grid grid-cols-2 gap-4">
        <FormSelect
          controlProps={{
            control,
            name: "productId",
            rules: { required: "Phải nhập mã SP" },
          }}
          label="Mã SP:"
          labelKey="productCode"
          valueKey="productId"
          options={productBySupplier || []}
          callback={callback}
        />

        <FormSelect
          controlProps={{
            control,
            name: "vat",
            rules: { required: "Phải chọn VAT" },
          }}
          options={VAT}
          label="Thuế GTGT:"
        />

        <FormSelect
          controlProps={{
            control,
            name: "productId",
          }}
          label="Tên SP:"
          labelKey="productName"
          valueKey="productId"
          options={productBySupplier || []}
          callback={callback}
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "price",
            rules: { required: "Phải nhập đơn giá" },
          }}
          label="Đơn giá:"
        />

        <FormInputBase
          label="Hãng sản xuất:"
          value={selectedProduct?.manufactor}
          disabled
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "quantity",
            rules: { required: "Phải nhập số lượng" },
          }}
          label="Số lượng:"
        />
        <Box>
          <FormInputBase
            label="Quy cách:"
            value={selectedProduct?.specs}
            disabled
            className="mb-4"
          />

          <FormInputBase
            label="Đơn vị:"
            value={selectedProduct?.unitName}
            disabled
            className="mb-4"
          />

          <FormInputNumber
            controlProps={{
              control,
              name: "totalPrice",
            }}
            label="Thành tiền:"
            disabled={true}
          />
        </Box>
        <FormInput
          controlProps={{
            control,
            name: "note",
          }}
          label="Ghi chú:"
          multiline
          minRows={6}
        />
      </Box>
    </Box>
  );
};
