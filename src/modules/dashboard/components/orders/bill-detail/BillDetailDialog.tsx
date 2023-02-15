import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import {
  BaseButton,
  Dialog,
  FormInputBase,
  FormInputNumberBase,
  FormSelect,
} from "~modules-core/components";
import { FormInputNumber } from "~modules-core/components/form-hooks/FormInputNumber";
import { VAT } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

type TProps = TDialog & {
  productList: any[];
};

export const BillDetailDialog: React.FC<TProps> = ({
  onClose,
  open,
  type,
  defaultValue,
  productList,
}) => {
  const [product, setProduct] = useState<any>();

  const { control, handleSubmit, reset, watch, setValue } = useForm();

  const { watch: contextWatch, setValue: setContextValue } = useFormContext();

  const products = contextWatch("products");

  const remainProducts = productList.filter((prod: any) =>
    products.findIndex((p: any) => p?.productId === prod?.productId)
  );

  const { quantity = 0, vat = 0 } = watch();

  const { price = 0 } = product || {};

  const title = type === "Add" ? "Thêm sản phẩm" : "Cập nhật sản phẩm";

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
      setProduct({});
    } else {
      reset({ ...defaultValue });

      setProduct({ ...defaultValue });
    }
  }, [type]);

  useEffect(() => {
    const total = quantity * price;

    setValue("totalPrice", total + (total * vat) / 100);
  }, [quantity, price, vat]);

  // METHODS
  const addProduct = useCallback(
    (data: any) => {
      setContextValue("products", [...products, { ...product, ...data }]);

      setProduct(null);

      reset({});

      onClose();
    },
    [products, product]
  );

  const updateProduct = useCallback(
    (data: any) => {
        if (product?.quantity < data?.quantity) {
            toast.error("Số lượng tối đa là " + product.quantity)

            return false;
        }
      const updatedProducts = products.map((prod: any) =>
        prod?.productId === data?.productId
          ? { ...product, ...data }
          : { ...prod }
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
      maxWidth="md"
      title={title}
      headerClassName="text-center"
    >
      <Box className="grid grid-cols-2 gap-4 mb-4">
        {type === "Update" ? (
          <FormInputBase
            value={product?.productCode}
            label="Mã SP"
            disabled
            shrinkLabel
          />
        ) : (
          <FormSelect
            options={remainProducts}
            controlProps={{
              control,
              name: "productId",
              rules: { required: "Phải chọn SP" },
            }}
            callback={(opt) => setProduct(opt)}
            labelKey="productCode"
            valueKey="productId"
            label="Mã SP"
            shrinkLabel
          />
        )}

        <FormInputNumber
          controlProps={{
            control,
            name: "quantity",
            rules: { required: "Phải nhập số lượng" },
          }}
          label="Số lượng"
          shrinkLabel
        />

        <FormSelect
          controlProps={{
            control,
            name: "vat",
            rules: { required: "Phải chọn VAT" },
          }}
          options={VAT}
          label="Thuế GTGT"
          shrinkLabel
        />

        <FormInputBase
          value={product?.productName}
          label="Tên SP"
          disabled
          shrinkLabel
        />

        <FormInputBase
          value={product?.productManufactor}
          label="Hãng sản xuất"
          disabled
          shrinkLabel
        />

        <FormInputBase
          value={product?.productSpecs}
          label="Quy cách"
          disabled
          shrinkLabel
        />

        <FormInputBase
          value={product?.unitName}
          label="Đơn vị"
          disabled
          shrinkLabel
        />

        <FormInputNumberBase label="Giá" value={price} disabled shrinkLabel />

        <FormInputNumber
          controlProps={{
            control,
            name: "totalPrice",
          }}
          label="Thành tiền"
          disabled
          shrinkLabel
        />

        <FormInputBase
          label="Số lượng tối đa"
          value={product?.quantity}
          disabled
          shrinkLabel
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
