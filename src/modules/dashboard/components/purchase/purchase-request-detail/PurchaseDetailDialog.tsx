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

export const PurchaseDetailDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  defaultValue,
}) => {
  // LOCAL STATE AND EXTRACT PROPS
  const [selectedProduct, setSelectedProduct] = useState<any>();

  const { control, reset, watch, handleSubmit } = useForm();

  const { watch: watchProduct, setValue: setProductsValue } = useFormContext();

  const products = watchProduct("products") || [];

  const title = type === "Add" ? "Thêm SP" : "Cập nhật SP";

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    } else {
      reset({ ...defaultValue });
    }
  }, [defaultValue, type]);

  // METHODS
  const calculatePrice = useCallback(() => {
    const quantity = watch("quantity") || 0;

    const price = watch("price") || 0;

    const vat = watch("vat") || 0;

    if (!quantity || !price || !vat) return 0;

    return (price + (price * vat / 100)) * quantity
  }, [])

  const callback = useCallback((opt: any) => {
    setSelectedProduct(opt);
  }, []);

  const getProduct = useCallback((productData: any) => {
    return {
      id: selectedProduct?.id,
      productCode: selectedProduct?.productCode,
      productName: selectedProduct?.productName,
      manufactor: selectedProduct?.manufactor,
      specs: selectedProduct?.specs,
      unitName: selectedProduct?.unitName,
      unitId: selectedProduct?.unitId,
      vat: productData?.vat,
      note: productData?.note,
      quantity: productData?.quantity,
      price: productData?.price,
      totalPrice: calculatePrice(),
    };
  }, [selectedProduct]);

  const handleAddProduct = useCallback(
    (data: any) => {
      const index = products.findIndex((prod: any) => prod?.id === selectedProduct?.id);

      if (index !== -1) {
        toast.error(`Sản phẩm ${selectedProduct?.productCode} đã được chọn !`);

        return;
      }

      setProductsValue("products", [...products, getProduct(data)]);

      onClose();
    },
    [setProductsValue, selectedProduct]
  );

  const handleUpdateProduct = useCallback(
    (data: any) => {
      const updatedProducts = products.map((prod: any) =>
        prod?.id === data?.id ? { ...data } : { ...prod }
      );

      setProductsValue("products", updatedProducts);
    },
    [setProductsValue]
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
          controlProps={{
            control,
            name: "productId",
            rules: { required: "Phải nhập mã SP" },
          }}
          label="Mã SP"
          labelKey="productCode"
          fetcher={productApi.getList}
          callback={callback}
        />

        <FormSelectAsync
          controlProps={{
            control,
            name: "productId",
          }}
          label="Tên SP"
          labelKey="productName"
          fetcher={productApi.getList}
          callback={callback}
        />

        <FormInputBase
          label="Hãng sản xuất"
          value={selectedProduct?.manufactor}
          disabled
        />

        <FormInputBase
          label="Quy cách"
          value={selectedProduct?.specs}
          disabled
        />

        <FormInputBase
          label="Đơn vị"
          value={selectedProduct?.unitName}
          disabled
        />

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
            rules: { required: "Phải nhập đơn giá" },
          }}
          label="Đơn giá"
        />

        <FormSelect
          options={VAT}
          controlProps={{
            control,
            name: "vat",
            rules: { required: "Phải chọn VAT" },
          }}
          label="VAT"
        />

        <FormInputBase
          label="Thành tiền"
          disabled
          value={calculatePrice()}
        />

        <FormInput
          controlProps={{
            control,
            name: "notee",
          }}
          label="Ghi chú"
          multiline
          minRows={2}
        />
      </Box>
      <Box className="flex items-center justify-center mt-4">
        {type === "Add" ? (
          <BaseButton className="mr-2" onClick={handleSubmit(handleAddProduct)}>
            Thêm
          </BaseButton>
        ) : (
          <BaseButton className="mr-2">Cập nhật</BaseButton>
        )}

        <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
          Đóng
        </BaseButton>
      </Box>
    </Dialog>
  );
};
