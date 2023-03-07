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

  const { control, reset, watch, handleSubmit, setValue } = useForm<any>();

  const { quantity, price } = watch();

  const { setValue: setProductsValue, getValues } = useFormContext();

  const title = type === "Add" ? "Thêm SP" : "Cập nhật SP";

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    } else {
      const { productId, quantity, price, vat, note, id } = defaultValue || {};

      reset({ productId, quantity, price, vat: String(vat), note, id });
    }
  }, [defaultValue, type]);

  useEffect(() => {
    if (!quantity || !price) {
      setValue("totalPrice", 0);
    } else {
      setValue("totalPrice", quantity * price);
    }
  }, [quantity, price]);

  // METHODS
  const handleAddProduct = useCallback(
    (data: any) => {
      const { manufactor, specs, productCode, productName, unitName } =
        selectedProduct || {};

      const products = getValues("products") || [];

      const addedProducts = [
        ...products,
        {
          ...data,
          manufactor,
          specs,
          productCode,
          productName,
          unitName,
        },
      ];

      setProductsValue("products", addedProducts);

      toast.success(`Cập nhật SP ${productCode} thành công !`);

      reset({});

      onClose();
    },
    [selectedProduct]
  );

  const handleUpdateProduct = useCallback(
    (data: any) => {
      const { manufactor, specs, productCode, productName, unitName } =
        selectedProduct || {};

      const { id, productId } = data || {};

      const updatedProducts = getValues("products")?.map?.((prod: any) => {
        const isUpdate = (prod?.id || prod?.productId) === (id || productId);

        return isUpdate
          ? {
              ...data,
              manufactor,
              specs,
              productCode,
              productName,
              unitName,
            }
          : { ...prod };
      });

      setProductsValue("products", updatedProducts);

      toast.success(`Cập nhật SP ${productCode} thành công !`);

      reset({});

      onClose();
    },
    [selectedProduct]
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
          callback={(prod) => setSelectedProduct(prod)}
        />

        <FormSelectAsync
          controlProps={{
            control,
            name: "productId",
          }}
          label="Tên SP"
          labelKey="productName"
          fetcher={productApi.getList}
          callback={(prod) => setSelectedProduct(prod)}
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

        <FormInputNumber
          label="Thành tiền"
          disabled
          controlProps={{
            control,
            name: "totalPrice",
          }}
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
          <BaseButton className="mr-2" onClick={handleSubmit(handleAddProduct)}>
            Thêm
          </BaseButton>
        ) : (
          <BaseButton
            className="mr-2"
            onClick={handleSubmit(handleUpdateProduct)}
          >
            Cập nhật
          </BaseButton>
        )}

        <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
          Đóng
        </BaseButton>
      </Box>
    </Dialog>
  );
};
