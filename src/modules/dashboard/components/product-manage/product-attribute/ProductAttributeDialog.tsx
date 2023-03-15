import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  productAtribute,
  TCreateAttribute,
  TUpdateAttribute,
} from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const ProductAttributeDialog: React.FC<TDialog> = (props) => {
  // EXTRACT PROPS
  const { onClose, open, type, refetch, defaultValue } = props;

  const [isUpdate, setIsUpdate] = useState(false);

  const disable = type === "View" && !isUpdate;

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
    control,
    watch,
  } = useForm<any>({
    mode: "onBlur",
  });

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    }

    if (type === "View" && defaultValue) {
      const defaultRecord = {
        productAttributesName: defaultValue.productAttributesName,
        productAttributesCode: defaultValue.productAttributesCode,
        id: defaultValue?.id,
      };

      reset(defaultRecord);
    }
  }, [defaultValue, type]);

  // CREATE TITLE BASE ON DIALOG TYPE
  const title =
    type === "Add"
      ? "Thêm thuộc tính"
      : type === "View" && isUpdate
      ? "Cập nhật thuộc tính"
      : "Thông tin thuộc tính";

  // MUTATIONS DECLARATIONS
  const mutateAdd = useMutation(
    (payload: TCreateAttribute) => productAtribute.create(payload),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        onClose?.();

        setIsUpdate(false);
      },
    }
  );

  const handleAdd = useCallback(async (data: any) => {
    await mutateAdd.mutateAsync(data);
  }, []);

  const mutateUpdate = useMutation(
    (payload: TUpdateAttribute) => productAtribute.update(payload),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        onClose?.();

        setIsUpdate(false);
      },
    }
  );

  const handleUpdate = useCallback(async (data: any) => {
    await mutateUpdate.mutateAsync(data);
  }, []);

  // RENDER BUTTONS BASE ON DIALOG TYPE
  const renderButtons = () => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton onClick={handleSubmit(handleAdd)} disabled={!isDirty}>
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
              onClick={handleSubmit(handleUpdate)}
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
      maxWidth="sm"
      title={title}
      headerClassName="text-center"
    >
      <Box component="form">
        <Box className="grid gap-4">
          <FormInput
            controlProps={{
              name: "productAttributesName",
              control,
              rules: { required: "Phải nhập tên thuộc tính" },
            }}
            label="Tên"
            disabled={disable}
          />

          <FormInput
            controlProps={{
              name: "productAttributesCode",
              control,
              rules: { required: "Phải nhập đơn vị" },
            }}
            label="Đơn vị"
            disabled={disable}
          />
        </Box>
      </Box>

      <Box className="flex justify-center items-center mt-4">
        {renderButtons()}
      </Box>
    </Dialog>
  );
};
