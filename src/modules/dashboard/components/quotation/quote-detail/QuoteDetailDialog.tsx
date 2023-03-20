import { Box, List, ListItem } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { preQuote, products as productApi } from "src/api";
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

export const QuoteDetailDialog: React.FC<TDialog> = ({
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

  // DATA FETCHING
  const { data: stock = [] } = useQuery(
    ["GetStock", productId],
    () => preQuote.getProductStock([productId]).then((res) => res.data),
    {
      enabled: !!productId,
    }
  );

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

    setValue("totalPrice", total);
  }, [quantity, price]);

  useEffect(() => {
    type === "Add" && isSelectedProduct();
  }, [products, productId]);

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
      const updatedProducts = products.map((prod: any) => {
        const { id, productId } = prod || {};

        if (!!id) {
          return id === data?.id ? { ...product, ...data } : { ...prod };
        } else {
          return productId === data?.productId
            ? { ...product, ...data }
            : { ...prod };
        }
      });

      setContextValue("products", updatedProducts);

      onClose();
    },
    [products]
  );

  const renderStock = useCallback(() => {
    if (stock.length === 0) {
      return <ListItem>Không có tồn kho</ListItem>;
    }

    return stock[0]?.stock?.map((stc: any, index: number) => (
      <ListItem>
        {stc.warehouseConfigCode}: {stc.quantityAvailabilityStock}
      </ListItem>
    ));
  }, [stock]);

  const isSelectedProduct = useCallback(() => {
    const index = products.findIndex((prod: any) => prod.id === productId);

    if (index !== -1) {
      toast.error(`SP ${products[index]?.productName} đã được nhập!`);

      return true;
    }

    return false;
  }, [products, productId]);

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

      <List component="fieldset">
        <legend>Thông tin tồn kho:</legend>
        {renderStock()}
      </List>

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
