import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { documentType, TDocumentType } from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormSelectMultiple,
} from "~modules-core/components";
import { searchParams } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const DocumentTypeDialog: React.FC<TDialog> = (props) => {
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
      const { paramSearch } = defaultValue || "";

      const defaultRecord = {
        name: defaultValue.name,
        paramSearch: paramSearch?.split(", "),
        id: defaultValue?.id
      };

      reset(defaultRecord);
    }
  }, [defaultValue, type]);

  // CREATE TITLE BASE ON DIALOG TYPE
  const title =
    type === "Add"
      ? "Thêm loại tài liệu"
      : type === "View" && isUpdate
      ? "Cập nhật loại tài liệu"
      : "Thông tin loại tài liệu";

  // MUTATIONS DECLARATIONS
  const mutateAdd = useMutation(
    (payload: Omit<TDocumentType, "id">) => documentType.create(payload),
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
    const paramSearch = data?.paramSearch || [];

    const payload = {
      name: data?.name,
      paramSearch: paramSearch.join(", "),
    };

    await mutateAdd.mutateAsync(payload);
  }, []);

  const mutateUpdate = useMutation(
    (payload: TDocumentType) => documentType.update(payload),
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
    const paramSearch = data?.paramSearch || [];

    const payload = {
      name: data?.name,
      paramSearch: paramSearch.join(", "),
      id: data?.id
    };

    await mutateUpdate.mutateAsync(payload);
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
      titleClassName="text-center"
    >
      <Box component="form">
        <Box className="grid gap-4">
          <FormInput
            controlProps={{
              name: "name",
              control,
              rules: { required: "Phải nhập tên loại tài liệu" },
            }}
            label="Tên"
            disabled={disable}
          />

          <FormSelectMultiple
            options={searchParams}
            controlProps={{
              control,
              name: "paramSearch",
              rules: { required: "Phải chọn tiêu chí tìm kiếm" },
            }}
            label="Tiêu chí tìm kiếm"
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
