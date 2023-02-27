import { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { stamp, TCreateStamp, TUpdateStamp } from "src/api";
import { BaseButton } from "~modules-core/components";
import { toast } from "~modules-core/toast";

type TProps = {
  type?: string;
  isUpdate: boolean;
  onClose: () => void;
  refetch?: () => void;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  refetchDetail: () => void;
};
export const StampButtons: React.FC<TProps> = ({
  type,
  isUpdate,
  onClose,
  refetch,
  setIsUpdate,
  refetchDetail
}) => {
  const {
    formState: { isDirty },
    handleSubmit,
  } = useFormContext();

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

  const mutationUpdateStamp = useMutation(
    (payload: TUpdateStamp) => stamp.update(payload),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();

        setIsUpdate(false);

        onClose();
      },
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
    }
  );

  const handleUpdateStamp = async (data: any) => {
    const payload = {
      id: data?.id,
      chemicalName: data?.chemicalName,
      casCode: data?.casCode,
    };

    await mutationUpdateStamp.mutateAsync(payload);
  };

  switch (true) {
    case type === "Add" || type === "CreateLabel":
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
    case !isUpdate:
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
    case !!isUpdate:
      return (
        <>
          <BaseButton
            onClick={handleSubmit(handleUpdateStamp)}
            disabled={!isDirty}
          >
            Cập nhật
          </BaseButton>
          <BaseButton
            type="button"
            className="!bg-main-1 ml-3"
            onClick={() => {
              refetchDetail?.();
              setIsUpdate(false);
            }}
          >
            Quay lại
          </BaseButton>
        </>
      );
    default:
      return <></>;
  }
};
