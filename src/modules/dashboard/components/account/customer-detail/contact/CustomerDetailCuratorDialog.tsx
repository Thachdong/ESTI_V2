import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { curator, TCreateCurator } from "src/api";
import { BaseButton, Dialog } from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";
import { ContactAccount } from "./dialog/ContactAccount";
import { ContactBill } from "./dialog/ContactBill";
import { ContactReceiver } from "./dialog/ContactReceiver";

export const CustomerDetailCuratorDialog: React.FC<TDialog> = ({
  onClose,
  open,
  title,
  refetch,
}) => {
  const {id} = useRouter().query;

  const methods = useForm();

  const mutateAdd = useMutation(
    (payload: TCreateCurator) => curator.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        refetch?.();

        methods.reset({});

        onClose();
      },
    }
  );

  const handleAdd = useCallback(async (data: any) => {
    const {
      receiverAddress,
      receiverEmail,
      receiverName,
      receiverNote,
      receiverPhone1,
      receiverPhone2,
      billEmail,
      billFullName,
      billNote,
      billPhone,
      ...rest
    } = data || {};

    const payload = {
      ...rest,
      uid: id,
      receiver: {
        fullName: receiverName,
        phone1: receiverPhone1,
        phone2: receiverPhone2,
        address: receiverAddress,
        email: receiverEmail,
        note: receiverNote,
      },
      billRecipientCreate: {
        fullName: billFullName,
        phone: billPhone,
        email: billEmail,
        note: billNote,
      },
    };

    await mutateAdd.mutateAsync(payload);
  }, [id]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="md" title={title}>
      <FormProvider {...methods}>
        <ContactAccount />

        <ContactReceiver />

        <ContactBill />

        <Box className="flex items-center justify-end">
          <BaseButton onClick={methods.handleSubmit(handleAdd)}>Tạo</BaseButton>
          <BaseButton onClick={onClose} className="bg-main-1 ml-3">
            Đóng
          </BaseButton>
        </Box>
      </FormProvider>
    </Dialog>
  );
};
