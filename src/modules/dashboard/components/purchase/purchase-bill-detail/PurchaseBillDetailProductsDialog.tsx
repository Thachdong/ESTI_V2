import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import {
  BaseButton,
  Dialog,
  FormInputBase,
  FormSelect,
} from "~modules-core/components";
import { FormInputNumber } from "~modules-core/components/form-hooks/FormInputNumber";
import { VAT } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

type TProps = TDialog & {
  productList: any[]
}

export const PurchaseBillDetailProductsDialog: React.FC<TProps> = ({
  onClose,
  open,
  type,
  defaultValue,
  productList
}) => {
  const [product, setProduct] = useState<any>();

  const { control, handleSubmit, reset, watch, setValue } = useForm();

  const { watch: contextWatch, setValue: setContextValue } = useFormContext();

  const products = contextWatch("products");

  const { quantity = 0, price = 0, vat = 0 } = watch();

  const title =
    type === "Add" ? "Thêm sản phẩm" : "Cập nhật sản phẩm";

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
  }, [products, product])

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
    const index = products.findIndex((prod: any) => prod.id === product.id);

    if (index !== -1) {
      toast.error(`SP ${product?.productName} đã được nhập!`);

      return true;
    }

    return false;
  }, [products, product])

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="md"
      title={title}
      headerClassName="text-center"
    >
      <Box className="grid grid-cols-2 gap-4 mb-4">
        <FormSelect
          options={productList}
          controlProps={{
            control,
            name: "productId",
            rules: { required: "Phải chọn SP" },
          }}
          callback={callback}
          labelKey="productCode"
          valueKey="productId"
          label="Mã SP"
        />

        <FormSelect
          options={productList}
          controlProps={{
            control,
            name: "productId",
            rules: { required: "Phải chọn SP" },
          }}
          callback={callback}
          labelKey="productName"
          valueKey="productId"
          label="Tên SP"
        />

        <FormInputBase
          value={product?.productManufactor}
          label="Hãng sản xuất"
          disabled
        />

        <FormInputBase value={product?.productSpecs} label="Quy cách" disabled />

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
