import { Dispatch, SetStateAction, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { purchasePlan, TCreatePurchasePlan, TUpdatePurchasePlan } from "src/api";
import { BaseButton } from "~modules-core/components";

type TProps = {
  type: string;
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  refetch?: () => void;
};
export const PurchasePlanButtons: React.FC<TProps> = ({
  type,
  isUpdate,
  setIsUpdate,
  onClose,
  refetch,
}) => {
  const { handleSubmit } = useFormContext();

  // METHODS
  const muatateCreate = useMutation(
    (payload: TCreatePurchasePlan[]) => purchasePlan.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        refetch?.();

        onClose();
      },
    }
  );

  const handleCreate = useCallback(async (data: any) => {
    // case type === clone => remove id
    const {id, ...rest} = data || {};
    await muatateCreate.mutateAsync([{ ...rest }]);
  }, []);

  const muatateUpdate = useMutation(
    (payload: TUpdatePurchasePlan) => purchasePlan.update(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        refetch?.();

        setIsUpdate(false),

        onClose();
      },
    }
  );

  const handleUpdate = useCallback(async (data: any) => {
    await muatateUpdate.mutateAsync({...data});
  }, []);

  switch (true) {
    case type === "Add" || type === "Clone":
      return (
        <>
          <BaseButton className="mr-2" onClick={handleSubmit(handleCreate)}>
            Lưu
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
};
