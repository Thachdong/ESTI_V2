import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { customer, TUpdateCustomer } from "src/api";
import { BaseButton } from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { CustomerDetailContactList } from "./contact";
import { CustomerDetailAccount, CustomerDetailCompany } from "./generals";

export const CustomerDetailBasic: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const { id } = useRouter().query;

  const methods = useForm<any>({
    defaultValues: {
      contacts: [],
    },
  });

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
  } = methods;

  // DATA FETCHING
  const { data: customerDetail, refetch } = useQuery(
    ["CustomerDetail", id],
    () => customer.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    const { salesId, salesAdminId, deliveryId, avatar, id } =
      customerDetail?.customer || {};

    const {
      name,
      professionId,
      taxCode,
      hotline,
      email,
      paymentType,
      paymentLimit,
      website,
      identityCard,
      identityCardImage,
      address,
      id: companyId,
    } = customerDetail?.companyInfo || {};

    const contacts =
      customerDetail?.curatorInfo?.map?.((cur: any) => {
        const {
          userName,
          typeAccount,
          accountType,
          typeDiscount,
          curatorName,
          curatorDepartment,
          birthDay,
          curatorGender,
          curatorPhone,
          curatorEmail,
          zaloNumber,
          curatorAddress,
          status,
          id,
        } = cur || {};

        const {
          fullName: receiverName,
          address: receiverAddress,
          email: receiverEmail,
          phone1,
          phone2,
          note: receiverNote,
          id: receiverId,
        } = cur?.receiverById || {};

        const {
          fullName,
          // address,
          email,
          phone,
          note,
          id: recipientId,
        } = cur?.recipientById || {};

        return {
          userName,
          typeAccount,
          accountType,
          typeDiscount,
          curatorName,
          curatorDepartment,
          birthDay,
          curatorGender,
          curatorPhone,
          curatorEmail,
          zaloNumber,
          curatorAddress,
          fullName,
          // address,
          email,
          phone,
          note,
          receiverName,
          receiverAddress,
          receiverEmail,
          phone1,
          phone2,
          receiverNote,
          status,
          id,
          recipientId,
          receiverId,
          companyId,
        };
      }) || [];

    reset({
      id,
      companyId,
      salesId,
      salesAdminId,
      deliveryId,
      avatar,
      name,
      professionId,
      taxCode,
      hotline,
      email,
      paymentType,
      paymentLimit,
      website,
      identityCard,
      identityCardImage,
      address,
      contacts,
    });
  }, [customerDetail]);

  // UPDATE CUSTOMER
  const mutateUpdate = useMutation(
    (payload: TUpdateCustomer) => customer.update(payload),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();

        setIsUpdate(false);
      },
    }
  );

  const handleUpdateCustomer = async (data: any) => {
    const {
      contacts = [],
      companyId,
      salesId,
      salesAdminId,
      deliveryId,
      avatar,
      id,
      ...rest
    } = data || {};

    const companyInfo = {
      ...rest,
      id: companyId,
    };

    const contactsPayload = contacts.map((contact: any) => {
      const {
        fullName,
        address,
        email,
        phone,
        note,
        phone1,
        phone2,
        receiverName,
        receiverAddress,
        receiverEmail,
        receiverNote,
        receiverId,
        recipientId,
        ...rest
      } = contact || {};

      return {
        ...rest,
        receiver: {
          id: receiverId,
          phone1,
          phone2,
          email: receiverEmail,
          address: receiverAddress,
          note: receiverNote,
        },
        billRecipientUpdate: {
          id: recipientId,
          fullName: fullName,
          phone,
          email,
          note,
          address: address,
        },
      };
    });

    const payload = {
      salesId,
      salesAdminId,
      deliveryId,
      avatar,
      id,
      companyInfo,
      curatorUpdate: contactsPayload,
    };

    await mutateUpdate.mutateAsync(payload);
  };

  return (
    <Box className="container-center mb-4">
      <FormProvider {...methods}>
        <CustomerDetailAccount isUpdate={isUpdate} />

        <CustomerDetailCompany isUpdate={isUpdate} />

        <CustomerDetailContactList isUpdate={isUpdate} />

        <Box className="flex justify-end">
          {!isUpdate ? (
            <BaseButton type="button" onClick={() => setIsUpdate(true)}>
              Cập nhật
            </BaseButton>
          ) : (
            <>
              <BaseButton
                onClick={methods.handleSubmit(handleUpdateCustomer)}
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
          )}
        </Box>
      </FormProvider>
    </Box>
  );
};
