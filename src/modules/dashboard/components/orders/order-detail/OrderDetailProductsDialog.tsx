import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { products as productApi } from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { FormInputNumber } from "~modules-core/components/form-hooks/FormInputNumber";
import { VAT } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const OrderDetailProductsDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  defaultValue,
}) => {
  const [product, setProduct] = useState<any>();

  const { control, handleSubmit, reset, watch, setValue } = useForm();

  const { watch: contextWatch, setValue: setContextValue } = useFormContext();

  const products = contextWatch("products");

  const { productId, quantity = 0, price = 0, vat = 0 } = watch();

  const title =
    type === "Add" ? "Thêm sản phẩm báo giá" : "Cập nhật sản phẩm báo giá";

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
      setProduct({});
    } else {
      reset({ ...defaultValue });
    }
  }, [type]);

  useEffect(() => {
    const total = quantity * price;

    setValue("totalPrice", total + (total * vat) / 100);
  }, [quantity, price, vat]);

  useEffect(() => {
    type === "Add" && isSelectedProduct();
  }, [products, productId])

  // METHODS
  const callback = useCallback((data: any) => {
    setProduct(data);
  }, []);

  const addProduct = useCallback(
    (data: any) => {
      if (isSelectedProduct()) {
        return;
      }

      setContextValue("products", [...products, { ...product, ...data }]);

      setProduct(null);

      reset({});

      onClose();
    },
    [products, product]
  );

  const updateProduct = useCallback(
    (data: any) => {
      const updatedProducts = products.map((prod: any) =>
        prod?.productId === data?.productId ? { ...product, ...data } : { ...prod }
      );

      setContextValue("products", updatedProducts);

      onClose();
    },
    [products]
  );

  const isSelectedProduct = useCallback(() => {
    const index = products.findIndex((prod: any) => prod.id === productId);

    if (index !== -1) {
      toast.error(`SP ${products[index]?.productName} đã được nhập!`);

      return true;
    }

    return false;
  }, [products, productId])

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="md"
      title={title}
      headerClassName="text-center"
    >
      <Box className="grid grid-cols-2 gap-4 mb-4">
        <FormSelectAsync
          fetcher={productApi.getList}
          controlProps={{
            control,
            name: "productId",
            rules: { required: "Phải chọn SP" },
          }}
          callback={callback}
          labelKey="productCode"
          label="Mã SP"
        />

        <FormSelectAsync
          fetcher={productApi.getList}
          controlProps={{
            control,
            name: "productId",
            rules: { required: "Phải chọn SP" },
          }}
          callback={callback}
          labelKey="productName"
          label="Tên SP"
        />

        <FormInputBase
          value={product?.manufactor}
          label="Hãng sản xuất"
          disabled
        />

        <FormInputBase value={product?.specs} label="Quy cách" disabled />

        <FormInputBase value={product?.unitName} label="Đơn vị" disabled />

        <FormInputNumber
          controlProps={{
            control,
            name: "quantity",
            rules: { required: "Phải nhập số lượng" },
          }}
          label="Số lượng"
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "price",
            rules: { required: "Phải nhập giá" },
          }}
          label="Giá"
        />

        <FormSelect
          controlProps={{
            control,
            name: "vat",
            rules: { required: "Phải chọn VAT" },
          }}
          options={VAT}
          label="Thuế GTGT"
        />

        <FormInputNumber
          controlProps={{
            control,
            name: "totalPrice",
            rules: { required: "Phải nhập thành tiền" },
          }}
          label="Thành tiền"
          disabled
        />

        <FormInput
          controlProps={{
            control,
            name: "note",
          }}
          label="Ghi chú"
          multiline
          minRows={2}
        />
      </Box>

      <Box className="flex items-center justify-center mt-4">
        {type === "Add" ? (
          <BaseButton onClick={handleSubmit(addProduct)}>Thêm</BaseButton>
        ) : (
          <BaseButton onClick={handleSubmit(updateProduct)}>
            Cập nhật
          </BaseButton>
        )}

        <BaseButton type="button" className="!bg-main-1 ml-2" onClick={onClose}>
          Đóng
        </BaseButton>
      </Box>
    </Dialog>
  );
};
