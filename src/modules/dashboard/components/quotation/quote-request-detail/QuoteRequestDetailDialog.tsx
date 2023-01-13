import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { products as productApi } from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormInputBase,
  FormSelectAsync,
} from "~modules-core/components";
import { FormInputNumber } from "~modules-core/components/form-hooks/FormInputNumber";
import { TDialog } from "~types/dialog";

export const QuoteRequestDetailDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  defaultValue,
}) => {
  const [product, setProduct] = useState<any>();

  const { control, handleSubmit, reset } = useForm();

  const { watch: contextWatch, setValue: setContextValue } = useFormContext();

  const products = contextWatch("products");

  const title = type === "Add" ? "Thêm sản phẩm" : "Cập nhật sản phẩm";

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
      setProduct({});
    } else {
      reset({ ...defaultValue });
    }
  }, [type]);

  // METHODS
  const callback = useCallback(
    (data: any) => {
      setProduct(data);
    },
    [setProduct]
  );

  const addProduct = useCallback(
    (data: any) => {
      const no = products.length + 1;
      setContextValue("products", [
        ...products,
        { ...product, ...data, no},
      ]);

      setProduct(null);

      reset({});

      onClose();
    },
    [products, product]
  );

  const updateProduct = useCallback(
    (data: any) => {
      const updatedProducts = products.map((prod: any) =>
        prod?.no === data?.no ? { ...product, ...data } : { ...prod }
      );

      setContextValue("products", updatedProducts);

      onClose();
    },
    [products]
  );

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="sm"
      title={title}
      headerClassName="text-center"
    >
      <Box className="grid gap-4">
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
