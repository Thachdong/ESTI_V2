import { Dispatch, SetStateAction, useCallback } from "react";
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
  refetch,
}) => {
  const {
    formState: { isDirty },
    handleSubmit,
  } = useFormContext();

  // ADD CUSTOMER
  const convertPayload = useCallback(
    (data: any) => ({
      salesId: data?.salesId,
      salesAdminId: data?.salesAdminId,
      deliveryId: data?.deliveryId,
      avatar: data?.avatar,
      companyInfo: {
        name: data?.companyName,
        professionId: data?.professionId,
        taxCode: data?.taxCode,
        address: data?.address,
        hotline: data?.hotline,
        email: data?.email,
        website: data?.website,
        paymentLimit: data?.paymentLimit,
        paymentType: data?.paymentType,
        identityCard: data?.identityCard,
        identityCardImage: data?.identityCardImage?.join?.(","),
      },
      curatorCreate: data?.curatorCreate?.map?.((curator: any) => {
        const {
          billAddress,
          billEmail,
          billFullName,
          billPhone,
          receiverAddress,
          receiverEmail,
          receiverName,
          receiverPhone1,
          receiverPhone2,
          ...rest
        } = curator || {};

        return {
          ...rest,
          receiver: {
            address: receiverAddress,
            email: receiverEmail,
            fullName: receiverName,
            phone1: receiverPhone1,
            phone2: receiverPhone2,
          },
          billRecipientCreate: {
            address: billAddress,
            email: billEmail,
            fullName: billFullName,
            phone: billPhone,
          },
        };
      }),
    }),
    []
  );

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

  const handleAddCustomer = async (data: any) => {
    await mutationAdd.mutateAsync(convertPayload(data));
  };

  // UPDATE CUSTOMER
  const mutateUpdate = useMutation(
    (payload: TUpdateCustomer) => customer.update(payload),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();

        onClose();
      },
    }
  );

  const handleUpdateCustomer = async (data: any) => {
    const payload = convertPayload(data);

    await mutateUpdate.mutateAsync({
      ...payload,
      id: data.id,
      curatorCreate: payload.curatorCreate?.map?.((curator: any) => ({
        ...curator,
        receiver: {
          ...curator?.receiver,
          id: curator?.receiverId,
        },
        billRecipientCreate: {
          ...curator?.billRecipientCreate,
          id: curator?.billId,
        },
      })),
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
