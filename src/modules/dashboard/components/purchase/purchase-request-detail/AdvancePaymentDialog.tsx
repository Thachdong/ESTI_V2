import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  advancePayment,
  TCreateAdvancePayment,
  TUpdateAdvancePayment,
} from "src/api";
import {
  BaseButton,
  Dialog,
  FormDatepicker,
  FormInput,
} from "~modules-core/components";
import { FormInputNumber } from "~modules-core/components/form-hooks/FormInputNumber";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";
import { AdvancePaymentDialogAttach } from "./AdvancePaymentDialogAttach";

export const AdvancePaymentDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  defaultValue,
  refetch,
}) => {
  // LOCAL STATE AND EXTRACT PROPS
  const { id } = useRouter().query;

  const methods = useForm();

  const { control, reset, handleSubmit } = methods;

  const title = type === "Add" ? "Tạo tạm ứng" : "Cập nhật tạm ứng";

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    } else {
      const { id, attachFile, advancePaymentDate, contentBilling, payments } =
        defaultValue || {};

      let files: string[] = [];

      if (!!attachFile && typeof attachFile === "string") {
        files = attachFile.split(",");
      }

      reset({
        id,
        attachFile: files,
        advancePaymentDate,
        contentBilling,
        payments,
      });
    }
  }, [defaultValue, type]);

  // METHODS
  const mutateAdd = useMutation(
    (payload: TCreateAdvancePayment) => advancePayment.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        refetch?.();

        reset({});

        onClose();
      },
    }
  );

  const handleCreate = useCallback(async (data: any) => {
    const { attachFile, ...rest } = data || {};

    await mutateAdd.mutateAsync({
      ...rest,
      attachFile: !attachFile ? null : attachFile.join(","),
      productOrderId: id,
    });
  }, []);

  const mutateUpdate = useMutation(
    (payload: TUpdateAdvancePayment) => advancePayment.update(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        refetch?.();

        reset({});

        onClose();
      },
    }
  );

  const handleUpdate = useCallback(async (data: any) => {
    const { attachFile, ...rest } = data || {};

    await mutateUpdate.mutateAsync({
      ...rest,
      attachFile: !attachFile ? null : attachFile.join(","),
      productOrderId: id,
    });
  }, []);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="sm"
      title={title}
      headerClassName="text-center"
    >
      <FormProvider {...methods}>
        <Box className="grid gap-4">
          <FormInputNumber
            controlProps={{
              control,
              name: "payments",
              rules: { required: "Phải nhập số tiền" },
            }}
            label="Giá trị tạm ứng"
            shrinkLabel
          />

          <FormDatepicker
            controlProps={{
              control,
              name: "advancePaymentDate",
              rules: { required: "Phải nhập ngày tạm ứng" },
            }}
            label="Ngày tạm ứng"
          />

          <FormInput
            controlProps={{
              control,
              name: "contentBilling",
              rules: { required: "Phải nhập nội dung tạm ứng" },
            }}
            label="Nội dung tạm ứng"
            multiline
            minRows={2}
            shrinkLabel
          />
        </Box>

        <AdvancePaymentDialogAttach />

        <Box className="flex items-center justify-center mt-4">
          {type === "Add" ? (
            <BaseButton className="mr-2" onClick={handleSubmit(handleCreate)}>
              Thêm
            </BaseButton>
          ) : (
            <BaseButton className="mr-2" onClick={handleSubmit(handleUpdate)}>
              Cập nhật
            </BaseButton>
          )}

          <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
            Đóng
          </BaseButton>
        </Box>
      </FormProvider>
    </Dialog>
  );
};
