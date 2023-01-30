import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { customer, TCreateCustomer, TUpdateCustomer } from "src/api";
import { BaseButton } from "~modules-core/components";
import { toast } from "~modules-core/toast";

type TProps = {
  type?: string;
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  refetch?: Function;
};

export const CustomersDialogButtons: React.FC<TProps> = ({
  type,
  isUpdate,
  setIsUpdate,
  onClose,
  refetch
}) => {
  const {
    formState: { isDirty },
    handleSubmit,
  } = useFormContext();

  // ADD CUSTOMER
  const mutationAdd = useMutation(
    (payload: TCreateCustomer) => customer.create(payload),
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

  const handleAddCustomer = async (payload: any) => {
    await mutationAdd.mutateAsync(payload);
  };

  // UPDATE CUSTOMER
  const mutateUpdate = useMutation(
    (data: TUpdateCustomer) => customer.update(data),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        onClose();
      },
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
    }
  );

  const handleUpdateCustomer = async (data: any) => {
    await mutateUpdate.mutateAsync({
      ...data,
    });
  };

  // DOM RENDERING
  switch (true) {
    case type === "Add":
      return (
        <>
          <BaseButton
            onClick={handleSubmit(handleAddCustomer)}
            className="w-full mb-3"
            disabled={!isDirty}
          >
            Tạo
          </BaseButton>
          <BaseButton
            type="button"
            className="w-full !bg-main-1"
            onClick={onClose}
          >
            Đóng
          </BaseButton>
        </>
      );
    case type === "View" && isUpdate === false:
      return (
        <>
          <BaseButton
            type="button"
            className="w-full mb-3"
            onClick={() => setIsUpdate(true)}
          >
            Cập nhật
          </BaseButton>
          <BaseButton
            type="button"
            className="w-full !bg-main-1"
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
            onClick={handleSubmit(handleUpdateCustomer)}
            className="w-full mb-3"
            disabled={!isDirty}
          >
            Cập nhật
          </BaseButton>
          <BaseButton
            type="button"
            className="w-full !bg-main-1"
            onClick={() => setIsUpdate(false)}
          >
            Quay lại
          </BaseButton>
        </>
      );
    default:
      return <></>;
  }
};
