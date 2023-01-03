import { Box } from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { position, products } from "src/api";
import {
  BaseButton,
  Dialog,
  FormDatepicker,
  FormInput,
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { FormInputNumber } from "~modules-core/components/form-hooks/FormInputNumber";
import { VAT } from "~modules-core/constance";
import { TDialog } from "~types/dialog";

type TProps = {
  addProduct: (product: any) => void;
  updateProduct: (product: any) => void;
};

export const ImportDetailProductDialog: React.FC<TDialog & TProps> = ({
  open,
  onClose,
  type,
  addProduct,
  updateProduct,
  defaultValue,
}) => {
  // LOCAL STATE AND EXTRACT PROPS
  const [selectedProduct, setSelectedProduct] = useState<any>();  

  const [selectedPosition, setSelectedPosition] = useState<any>();

  const title = type === "Add" ? "Thêm SP" : "Cập nhật SP";

  const { control, handleSubmit, setError, reset } = useForm({
    mode: "onBlur",
  });

  useEffect(() => {
    if (type === "Add") {
      reset({});
    } else {
      !!defaultValue && reset(defaultValue);
    }
  }, [defaultValue, type]);

  // METHODS
  const cleanup = () => {
    reset();

    onClose();

    setSelectedProduct(undefined);

    setSelectedPosition(undefined);
  };

  const getSelectedProduct = useCallback((product: any) => {
    setSelectedProduct(product);
  }, []);

  const getSelectedPosition = useCallback((position: any) => {
    setSelectedPosition(position);
  }, []);

  const handleValidate = useCallback((data: any) => {
    let error = false;

    const dateExpiration = moment(data?.dateExpiration);
    const dateManufacture = moment(data?.dateManufacture);

    if (!dateExpiration.isValid) {
      setError("dateExpiration", {
        type: "dateExpiration",
        message: "Hạn SD không hợp lệ !",
      });

      error = true;
    }

    if (!dateManufacture.isValid) {
      setError("dateManufacture", {
        type: "dateManufacture",
        message: "Ngày SX không hợp lệ !",
      });

      error = true;
    }

    if (dateManufacture.isAfter(dateExpiration)) {
      setError("dateManufacture", {
        type: "dateManufacture",
        message: "Lỗi: hạn SD trước ngày SX !",
      });

      error = true;
    }

    return error;
  }, []);

  const handleAddProduct = useCallback((data: any) => {
    const isError = handleValidate(data);

    if (isError) return;

    const product = {
      positionId: selectedPosition?.id,
      positionName: selectedPosition?.positionName,
      totalPrice: data?.price * data?.quantity,
      productManufactor: selectedProduct?.manufactor,
      productSpecs: selectedProduct?.specs,
      ...selectedProduct,
      ...data,
    };

    addProduct(product);

    cleanup();
  }, [selectedProduct, selectedPosition]);

  const handleUpdateProduct = useCallback((data: any) => {
    if (!data) return;

    const isError = handleValidate(data);

    if (isError) return;

    const product = {
      ...data,
      totalPrice: data?.price * data?.quantity,
      positionId: selectedPosition?.id,
      positionName: selectedPosition?.positionName,
    };

    updateProduct(product);

    cleanup();
  }, [selectedPosition, updateProduct]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      headerClassName="text-center"
      title={title}
    >
      <Box className="grid grid-cols-2 gap-4">
        <FormSelectAsync
          fetcher={products.getList}
          callback={getSelectedProduct}
          controlProps={{
            control,
            name: "productId",
            rules: { required: "Phải chọn mã SP" },
          }}
          label="Mã SP"
          labelKey="productCode"
        />

        <FormSelectAsync
          fetcher={products.getList}
          callback={getSelectedProduct}
          controlProps={{
            control,
            name: "productId",
            rules: { required: "Phải chọn tên SP" },
          }}
          label="Tên SP"
          labelKey="productName"
        />

        <FormInputBase
          name="manufactor"
          disabled
          label="Hãng SX"
          value={selectedProduct?.manufactor}
          defaultValue={selectedProduct?.manufactor}
        />

        <FormInputBase
          name="specs"
          disabled
          label="Quy cách"
          value={selectedProduct?.specs}
        />

        <FormInputBase
          name="unitName"
          disabled
          label="Đơn vị"
          value={selectedProduct?.unitName}
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
            rules: { required: "Phải nhập giá" },
          }}
          label="Thành tiền"
        />

        <FormInput
          controlProps={{
            control,
            name: "lotNumber",
            rules: { required: "Phải nhập số LOT" },
          }}
          label="Số LOT"
        />

        <FormDatepicker
          controlProps={{
            control,
            name: "dateManufacture",
            rules: { required: "Phải nhập ngày SX" },
          }}
          label="Ngày SX"
        />

        <FormDatepicker
          controlProps={{
            control,
            name: "dateExpiration",
            rules: { required: "Phải nhập hạn SD" },
          }}
          label="Hạn SD"
        />

        <FormSelectAsync
          fetcher={position.getList}
          callback={getSelectedPosition}
          controlProps={{
            control,
            name: "positionId",
            rules: { required: "Phải chọn vị trí" },
          }}
          label="Vị trí"
          labelKey="positionName"
        />

        <FormSelect
          controlProps={{
            control,
            name: "vat",
            rules: { required: "Phải chọn vat" },
          }}
          options={VAT}
          label="Chọn vat"
        />
      </Box>

      <Box className="flex items-center justify-center my-4">
        {type === "Add" ? (
          <BaseButton onClick={handleSubmit(handleAddProduct)}>Tạo</BaseButton>
        ) : (
          <BaseButton onClick={handleSubmit(handleUpdateProduct)}>
            Cập nhật
          </BaseButton>
        )}

        <BaseButton onClick={onClose} className="!bg-main-1 ml-3">
          Đóng
        </BaseButton>
      </Box>
    </Dialog>
  );
};
