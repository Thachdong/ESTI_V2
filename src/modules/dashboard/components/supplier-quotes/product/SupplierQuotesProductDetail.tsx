import { Box, Typography } from "@mui/material";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { products as productApi } from "src/api";
import {
  FormDatepicker,
  FormInput,
  FormInputBase,
  FormInputNumber,
  FormSelect,
} from "~modules-core/components";
import { VAT } from "~modules-core/constance";

type TProps = {
  disabled: boolean;
};

export const SupplierQuotesProductDetail: React.FC<TProps> = ({ disabled }) => {
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
      setValue("totalPrice", 0);
    } else {
      const total = quantity * price;

      const tax = (total * +vat) / 100;

      setValue("totalPrice", total + tax);
    }
  }, [quantity, price, vat]);

  return (
    <Box className="mb-4">
      <Typography className="font-semibold text-sm mb-2">
        THÔNG TIN SẢN PHẨM CẦN HỎI GIÁ
      </Typography>

      <Box className="grid grid-cols-2 gap-3">
        <FormSelect
          controlProps={{
            control,
            name: "productId",
            rules: { required: "Phải nhập mã SP" },
          }}
          label="Sản phẩm: "
          valueKey="productId"
          options={productBySupplier || []}
          callback={callback}
          disabled={disabled}
          getOptionLabel={(opt: any) =>
            !!opt ? `${opt?.productCode} / ${opt?.productName}` : ""
          }
        />

        <FormInputBase
          label="Hãng sản xuất:"
          value={selectedProduct?.manufactor}
          disabled
        />

        <FormSelect
          controlProps={{
            control,
            name: "vat",
            rules: { required: "Phải chọn VAT" },
          }}
          options={VAT}
          label="Thuế GTGT:"
          disabled={disabled}
        />

        <FormInputBase
          label="Quy cách:"
          value={selectedProduct?.specs}
          disabled
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "price",
            rules: { required: "Phải nhập đơn giá" },
          }}
          label="Đơn giá:"
          disabled={disabled}
        />

        <FormInputBase
          label="Đơn vị:"
          value={selectedProduct?.unitName}
          disabled
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "quantity",
            rules: { required: "Phải nhập số lượng" },
          }}
          label="Số lượng:"
          disabled={disabled}
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "totalPrice",
          }}
          label="Thành tiền:"
          disabled={true}
        />

        <FormInput
          controlProps={{
            control,
            name: "note",
          }}
          label="Ghi chú:"
          multiline
          minRows={3}
          disabled={disabled}
        />

        <FormInput
          controlProps={{
            control,
            name: "productStatus",
          }}
          label="Trạng thái SP:"
          disabled={disabled}
        />
      </Box>
    </Box>
  );
};
