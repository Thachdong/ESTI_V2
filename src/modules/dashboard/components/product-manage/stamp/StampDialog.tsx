import { Box } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  category,
  products,
  stamp,
  TCategory,
  TCreateStamp,
  TProduct,
} from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { productTypesStamp } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const StampDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  refetch,
  defaultValue,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<TProduct>();

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
    control,
    watch,
    setValue,
  } = useForm<any>({
    mode: "onBlur",
  });

  const disabled = type === "View" && !isUpdate;

  const labelType = watch("labelType");

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    }

    if (type === "View" && defaultValue) {
    }
  }, [type, defaultValue]);

  useEffect(() => {
    setValue("productId", "");

    setSelectedProduct(undefined);
  }, [labelType]);

  useEffect(() => {
    if (selectedProduct) {
      const { manufactor, specs, origin, chemicalName, casCode } =
        selectedProduct;

      setValue("manufactor", manufactor);
      setValue("specs", specs);
      setValue("origin", origin);
      setValue("chemicalName", chemicalName);
      setValue("casCode", casCode);
      setValue("labelType", labelType);
    }
  }, [selectedProduct]);

  // CREATE TITLE BASE ON DIALOG TYPE
  const title =
    type === "Add"
      ? "Thêm nhãn sản phẩm"
      : type === "View" && isUpdate
      ? "Cập nhật nhãn sản phẩm"
      : "Thông tin nhãn sản phẩm";

  // MUTATION DECLARATIONS
  const mutationAddStamp = useMutation(
    (payload: TCreateStamp) => stamp.create(payload),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();

        onClose();
      },
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
    }
  );

  const handleAddStamp = async (data: any) => {
    const payload: TCreateStamp = {
      labelType: data?.labelType,
      productId: data?.productId,
      chemicalName: data?.chemicalName,
      casCode: data?.casCode,
    };

    await mutationAddStamp.mutateAsync(payload);
  };

  const mutationUpdateCategory = useMutation(
    (payload: TCategory) => category.update(payload),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();

        onClose();
      },
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
    }
  );

  const handleUpdateCategory = async (payload: any) => {
    await mutationUpdateCategory.mutateAsync(payload);
  };

  const handleSelectProductCallback = useCallback((option: any) => {
    setSelectedProduct(option);
  }, []);

  // RENDER BUTTONS BASE ON DIALOG TYPE
  const renderButtons = () => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton
              onClick={handleSubmit(handleAddStamp)}
              disabled={!isDirty}
            >
              Tạo
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1 ml-3"
              onClick={onClose}
            >
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === false:
        return (
          <>
            <BaseButton type="button" onClick={() => setIsUpdate(true)}>
              Cập nhật
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1 ml-3"
              onClick={onClose}
            >
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === true:
        return (
          <>
            <BaseButton
              onClick={handleSubmit(handleUpdateCategory)}
              disabled={!isDirty}
            >
              Cập nhật
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1 ml-3"
              onClick={() => setIsUpdate(false)}
            >
              Quay lại
            </BaseButton>
          </>
        );
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      title={title}
      headerClassName="text-center"
    >
      <Box component="form">
        <Box className="grid gap-4">
          <FormSelect
            options={productTypesStamp}
            controlProps={{
              control,
              name: "labelType",
              rules: { required: "Phải chọn nhóm sản phẩm" },
            }}
            label="Nhóm sản phẩm"
            disabled={disabled}
          />

          {labelType && (
            <>
              <FormSelectAsync
                fetcher={products.getList}
                fetcherParams={{ labelType }}
                queryKey="productOptions_productCode"
                controlProps={{
                  control,
                  name: "productId",
                  rules: { required: "Phải chọn mã sản phẩm" },
                }}
                label="Mã sản phẩm"
                selectShape={{ valueKey: "id", labelKey: "productCode" }}
                callback={handleSelectProductCallback}
                disabled={disabled || !labelType}
              />

              <FormSelectAsync
                fetcher={products.getList}
                fetcherParams={{ labelType }}
                queryKey="productOptions_productName"
                controlProps={{
                  control,
                  name: "productId",
                  rules: { required: "Phải chọn tên sản phẩm" },
                }}
                label="Tên sản phẩm"
                selectShape={{ valueKey: "id", labelKey: "productName" }}
                callback={handleSelectProductCallback}
                disabled={disabled || !labelType}
              />

              <FormInput
                controlProps={{
                  control,
                  name: "manufactor",
                }}
                label="Hãng sản xuất"
                disabled={true}
              />

              <FormInput
                controlProps={{
                  control,
                  name: "origin",
                }}
                label="Xuất xứ"
                disabled={true}
              />

              <FormInput
                controlProps={{
                  control,
                  name: "specs",
                }}
                label="Quy cách"
                disabled={true}
              />
            </>
          )}
          
          <FormInput
            controlProps={{
              name: "chemicalName",
              control,
              rules: { required: "Phải nhập công thức hóa học" },
            }}
            label="Công thức hóa học"
            disabled={disabled}
          />

          <FormInput
            controlProps={{
              name: "casCode",
              control,
            }}
            label="Mã CAS"
            disabled={disabled}
          />
        </Box>

        <Box className="flex justify-center items-center mt-4">
          {renderButtons()}
        </Box>
      </Box>
    </Dialog>
  );
};
