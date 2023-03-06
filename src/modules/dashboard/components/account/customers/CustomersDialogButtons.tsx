import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { customer, TCreateCustomer } from "src/api";
import { BaseButton } from "~modules-core/components";
import { toast } from "~modules-core/toast";

type TProps = {
  onClose: () => void;
  refetch?: Function;
  onAddCallback?: (opt: any) => void;
};

export const CustomersDialogButtons: React.FC<TProps> = ({
  onClose,
  refetch,
  onAddCallback,
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
        name: data?.name,
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
      curatorCreate: data?.contacts?.map?.((curator: any) => {
        const {
          billNote,
          billEmail,
          billFullName,
          billPhone,
          receiverAddress,
          receiverEmail,
          receiverName,
          receiverPhone1,
          receiverPhone2,
          receiverNote,
          isNotCompany,
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
            note: receiverNote,
          },
          billRecipientCreate: {
            note: billNote,
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

        onAddCallback?.(data.data);

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

  return (
    <>
      <BaseButton
        onClick={handleSubmit(handleAddCustomer)}
        className="w-full mb-3"
        disabled={!isDirty}
      >
        Tạo
      </BaseButton>
      <BaseButton type="button" className="w-full !bg-main-1" onClick={onClose}>
        Đóng
      </BaseButton>
    </>
  );
};
