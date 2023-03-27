import { Box, Typography } from "@mui/material";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { products as productApi, referencePrice } from "src/api";
import {
  FormInput,
  FormInputBase,
  FormInputNumber,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { VAT } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";

type TProps = {
  disabled: boolean;
  type: string;
};

export const PurchasePlanProduct: React.FC<TProps> = ({ disabled, type }) => {
  const [selectedProduct, setSelectedProduct] = useState<any>();

  const [selectedReferencePrice, setSelectedReferencePrice] = useState<any>();

  const { control, watch, setValue } = useFormContext();

  const { supplierId, quantity, price, productId } = watch();

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

  // SIDE EFFECTS
  useEffect(() => {
    if (!quantity || !price) {
      setValue("totalPrice", 0);
    } else {
      const total = quantity * price;

      setValue("totalPrice", total);
    }
  }, [quantity, price]);

  useEffect(() => {
    if (!!selectedReferencePrice) {
      setValue("supplierId", selectedReferencePrice?.supplierId)
    }
  }, [selectedReferencePrice])
  
  return (
    <Box className="mb-4">
      <Typography className="font-semibold text-sm mb-2">
        THÔNG TIN SẢN PHẨM CẦN MUA
      </Typography>

      <Box className="grid grid-cols-2 gap-3">
        {type === "Add" ? (
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
            shrinkLabel
          />
        ) : (
          <FormSelectAsync
            controlProps={{
              control,
              name: "productId",
              rules: { required: "Phải nhập mã SP" },
            }}
            label="Mã SP:"
            labelKey="productCode"
            fetcher={productApi.getList}
            callback={callback}
            disabled={true}
            shrinkLabel
          />
        )}

        {type === "Add" ? (
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
            shrinkLabel
          />
        ) : (
          <FormSelectAsync
            controlProps={{
              control,
              name: "productId",
              rules: { required: "Phải nhập mã SP" },
            }}
            label="Mã SP:"
            labelKey="productName"
            fetcher={productApi.getList}
            callback={callback}
            disabled={true}
            shrinkLabel
          />
        )}

        <FormSelectAsync
          controlProps={{
            control,
            name: "referencePriceId",
          }}
          label="DS giá tham khảo: "
          getOptionLabel={(opt: any) =>
            !!opt ? `${opt.supplierName} - đơn giá: ${_format.getVND(opt.price)} - ${opt.productStatus}` : ""
          }
          fetcher={referencePrice.getList}
          fetcherParams={{ productId }}
          disabled={!productId}
          shrinkLabel
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "price",
            rules: { required: "Phải nhập đơn giá" },
          }}
          label="Đơn giá:"
          disabled={disabled}
          shrinkLabel
        />

        <FormInputBase
          label="Hãng sản xuất:"
          value={selectedProduct?.manufactor}
          disabled
          shrinkLabel
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
          shrinkLabel
        />

        <FormInputBase
          label="Quy cách:"
          value={selectedProduct?.specs}
          disabled
          className="mb-3"
          shrinkLabel
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "quantity",
            rules: { required: "Phải nhập số lượng" },
          }}
          label="Số lượng:"
          disabled={disabled}
          shrinkLabel
        />

        <FormInputBase
          label="Đơn vị:"
          value={selectedProduct?.unitName}
          disabled
          className="mb-3"
          shrinkLabel
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "totalPrice",
          }}
          label="Thành tiền (Không thuế):"
          disabled={true}
          shrinkLabel
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
          className="col-span-2"
          shrinkLabel
        />
      </Box>
    </Box>
  );
};
