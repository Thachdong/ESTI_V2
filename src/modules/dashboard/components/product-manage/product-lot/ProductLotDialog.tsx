import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  category,
  documentCareer,
  documentType,
  productDocument,
  productLot,
  products,
  TCreateLot,
  TDocument,
  TUpdateLot,
} from "src/api";
import {
  BaseButton,
  Dialog,
  FormDatepicker,
  FormImageGallery,
  FormInput,
  FormInputNumber,
  FormSelect,
  FormSelectAsync,
  FormUploadfiles,
} from "~modules-core/components";
import { parentCategoryId } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const ProductLotDialog: React.FC<TDialog> = (props) => {
  // EXTRACT PROPS
  const { onClose, open, type, refetch, defaultValue } = props;

  const [isUpdate, setIsUpdate] = useState(false);

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
    control,
  } = useForm<any>({
    mode: "onBlur",
  });

  const disabled = type === "View" && !isUpdate;

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    } else if (!!defaultValue) {
      reset({ ...defaultValue });
    }
  }, [type, defaultValue]);

  // CREATE TITLE BASE ON DIALOG TYPE
  const title =
    type === "Add"
      ? "Tạo LOT"
      : type === "View" && isUpdate
      ? "Cập nhật LOT"
      : "Thông tin LOT";

  // MUTATIONS DECLARATIONS
  const mutationAdd = useMutation(
    (payload: TCreateLot) => productLot.create(payload),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();

        onClose();
      },
    }
  );

  const handleAddLot = async (data: any) => {
    await mutationAdd.mutateAsync(data);
  };

  const mutationUpdate = useMutation(
    (payload: TUpdateLot) => productLot.update(payload),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();

        onClose();

        setIsUpdate(false);
      },
    }
  );

  const handleUpdateLot = async (data: any) => {
    const payload = {
      id: data?.id,
      importPrice: data?.importPrice,
    };
    await mutationUpdate.mutateAsync(payload);
  };

  // RENDER BUTTONS BASE ON DIALOG TYPE
  const renderButtons = () => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton
              onClick={handleSubmit(handleAddLot)}
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
              onClick={handleSubmit(handleUpdateLot)}
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

  // DOM RENDER
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      title={title}
      headerClassName="text-center"
    >
      <Box component="form">
        <Box className="grid grid-cols-2 gap-4">
          <FormSelectAsync
            fetcher={products.getList}
            controlProps={{
              control,
              name: "productId",
              rules: { required: "Phải chọn mã SP" },
            }}
            label="Mã sản phẩm"
            disabled={type !== "Add"}
            labelKey="productCode"
            getOptionLabel={(opt: any) =>
              !!opt ? `${opt?.productCode} - ${opt?.productName}` : ""
            }
            shrinkLabel
          />

          <FormInput
            controlProps={{
              name: "lotNumber",
              control,
              rules: { required: "Phải nhập LOT#" },
            }}
            label="LOT#"
            disabled={type !== "Add"}
            shrinkLabel
          />

          <FormInputNumber
            controlProps={{
              name: "importPrice",
              control,
              rules: { required: "Phải giá nhập kho" },
            }}
            label="Giá nhập kho"
            disabled={disabled}
            shrinkLabel
          />

          <FormDatepicker
            controlProps={{
              name: "dateManufacture",
              control,
              rules: { required: "Phải chọn ngày sản xuất" },
            }}
            label="Ngày sản xuất"
            disabled={type !== "Add"}
            shrinkLabel
          />

          <FormDatepicker
            controlProps={{
              name: "dateExpiration",
              control,
              rules: { required: "Phải chọn hạn sử dụng" },
            }}
            label="Hạn sử dụng"
            disabled={type !== "Add"}
            shrinkLabel
          />
        </Box>

        <Box className="flex justify-center items-center mt-4">
          {renderButtons()}
        </Box>
      </Box>
    </Dialog>
  );
};
