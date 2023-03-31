// NGHIỆP VỤ:
// Nếu user đang đăng nhập là sale thì mặc định sale phụ trách là user đang đăng nhập
// Ngược lại cho chọn sale

import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  customerCare,
  TCreateCustomerCare,
  TUpdateCustomerCare,
} from "src/api";
import { BaseButton, Dialog } from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";
import { CustomerCareContent } from "./CustomerCareContent";
import { CustomerCareInfo } from "./CustomerCareInfo";

export const CustomerCareDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  refetch,
  defaultValue,
}) => {
  const [isUpdate, setIsUpdate] = useState(false); 

  const { id } = useRouter().query;

  const methods = useForm();

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;

  const disabled = type === "View" && !isUpdate;

  const title =
    type === "Add"
      ? "Thêm phiên CSKH"
      : type === "View" && isUpdate
      ? "Cập nhật phiên CSKH"
      : "Chi tiết phiên CSKH";

  // DATA FETCHING
  const { data: customerCareDetail } = useQuery(
    ["CustomerCareDetail", defaultValue?.id],
    () =>
      customerCare.getById(defaultValue?.id as string).then((res) => res.data),
    {
      enabled: !!defaultValue?.id && type === "View",
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    if (!!customerCareDetail && type !== "Add") {
      const {
        id,
        salesId,
        customerId,
        curatorId,
        action,
        performDate,
        plan,
        result,
        status,
      } = customerCareDetail || {};

      reset({
        id,
        salesId,
        customerId,
        curatorId,
        action,
        performDate,
        plan,
        result,
        status,
      });
    } else {
      reset({});
    }
  }, [type, customerCareDetail]);

  // METHODS
  const mutateAdd = useMutation(
    (payload: TCreateCustomerCare) => customerCare.create(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        onClose();
      },
    }
  );

  const handleCreate = useCallback(
    async (data: any) => {
      await mutateAdd.mutateAsync({ ...data });
    },
    [id]
  );

  const mutateUpdate = useMutation(
    (payload: TUpdateCustomerCare) => customerCare.update(payload),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        setIsUpdate(false);
      },
    }
  );

  const handleUpdate = useCallback(
    async (data: any) => {
      const payload = {
        ...data,
        uid: id,
      };

      await mutateUpdate.mutateAsync(payload);
    },
    [id]
  );

  const renderButtons = useCallback(() => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton onClick={handleSubmit(handleCreate)} className="mr-2">
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
              disabled={!isDirty}
              onClick={handleSubmit(handleUpdate)}
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
      default:
        return <></>;
    }
  }, [type, isUpdate, isDirty]);

  const handleClose = useCallback(() => {
    setIsUpdate(false);
    onClose();
  }, [])

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="lg" title={title}>
      <FormProvider {...methods}>
        <Box className="grid grid-cols-1 gap-4">
          <CustomerCareContent disabled={disabled} />

          <CustomerCareInfo type={type as string} disabled={disabled} />
        </Box>
        <Box className="flex items-center justify-end">{renderButtons()}</Box>
      </FormProvider>
    </Dialog>
  );
};
