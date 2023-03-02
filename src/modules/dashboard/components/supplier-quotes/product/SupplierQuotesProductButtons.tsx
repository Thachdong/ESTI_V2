import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { askPrice, purchasePlan, TCreateAskPrice, TUpdateAskPrice, TUpdatePurchasePlan } from "src/api";
import { BaseButton } from "~modules-core/components";
import { toast } from "~modules-core/toast";

type TProps = {
  type: string;
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  refetch?: () => void;
  status: number;
};
export const SupplierQuotesProductButtons: React.FC<TProps> = ({
  type,
  isUpdate,
  setIsUpdate,
  onClose,
  refetch,
  status
}) => {
  const { handleSubmit } = useFormContext();

  // METHODS
  const muatateCreate = useMutation(
    (payload: TCreateAskPrice[]) => askPrice.create(payload),
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
    // const {id, ...rest} = data || {};
    // console.log(data);
    
    await muatateCreate.mutateAsync([{ ...data }]);
  }, []);

  const muatateUpdate = useMutation(
    (payload: TUpdateAskPrice) => askPrice.update(payload),
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
    case type === "Add":
      return (
        <>
          <BaseButton className="mr-2" onClick={handleSubmit(handleCreate)}>
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
            disabled={status > 1}
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
