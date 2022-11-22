import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { TUnit, units } from "src/api";
import { BaseButton, Dialog, FormInput } from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const UnitDialog: React.FC<TDialog> = ({
  onClose,
  refetch,
  open,
  defaultValue,
  type,
}) => {
  const { control, handleSubmit, reset } = useForm<TUnit>({
    mode: "onBlur",
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const title = type === "Add" ? "Tạo đơn vị" : (type === "View" && isUpdate) ? "Cập nhật đơn vị" : "Thông tin đơn vị";

  useEffect(() => {
    if (type === "Add") {
      reset({});
    }

    if (type === "View" && defaultValue) {
      reset(defaultValue);
    }
  }, [defaultValue, reset]);

  const mutationAdd = useMutation(
    (payload: Omit<TUnit, "id">) => units.create(payload),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        onClose();

        reset();

        refetch?.();
      },
    }
  );

  const mutateUpdate = useMutation(
    (payload: Pick<TUnit, "id" | "unitName">) => units.update({unitName: payload.unitName, id: payload.id}),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();

        setIsUpdate(false);
      },
    }
  );

  const renderButtons = () => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton
              onClick={handleSubmit((data: Pick<TUnit, "unitName">) =>
                mutationAdd.mutateAsync(data)
              )}
              className="mr-2"
            >
              Tạo
            </BaseButton>
            <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === false:
        return (
          <>
            <BaseButton
              type="button"
              className="mr-2"
              onClick={() => setIsUpdate(true)}
            >
              Cập nhật
            </BaseButton>
            <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === true:
        return (
          <>
            <BaseButton
              onClick={handleSubmit((data) => mutateUpdate.mutateAsync(data))}
              className="mr-2"
            >
              Cập nhật
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1"
              onClick={() => setIsUpdate(false)}
            >
              Quay lại
            </BaseButton>
          </>
        );
    }
  };

  return (
    <Dialog onClose={onClose} open={open} title={title}>
      <Box component="form" onSubmit={(e) => e.preventDefault()}>
        <FormInput
          controlProps={{
            name: "unitName",
            control,
            rules: { required: "Phải nhập mã chi nhánh" },
          }}
          baseProps={{
            label: "Tên đơn vị",
            required: true,
            className: "mb-4",
            disabled: type === "View" && !isUpdate,
          }}
        />

        <Box className="flex items-center justify-end mt-4">
          {renderButtons()}
        </Box>
      </Box>
    </Dialog>
  );
};
