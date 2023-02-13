import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import {
  mainOrder,
  preQuote,
  TCreateOrder,
  TUpdateOrder,
  TUpdatePreQuote,
} from "src/api";
import {
  AddButton,
  BaseButton,
  EditButton,
  PrintButton,
  SendButton,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDefaultDialogState } from "~types/dialog";

type TProps = {
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  refetch?: () => void;
};

export const OrderDetailButtons: React.FC<TProps> = ({
  isUpdate,
  setIsUpdate,
  refetch,
}) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  // EXTRACT PROPS
  const router = useRouter();

  const { id } = router.query;

  const { handleSubmit } = useFormContext();

  // METHODS
  const mutateCreate = useMutation(
    (payload: TCreateOrder) => mainOrder.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        router.push("/dashboard/orders/booking-order");
      },
    }
  );

  const handleCreate = useCallback(async (data: any) => {
    const {
      smgNote,
      salesNote,
      saleAdminNote,
      deliveryNote,
      attachFile,
      notFromQuote,
      defaultReceiver,
      products,
      ...rest
    } = data;

    if (!notFromQuote && !rest.preQuoteId) {
      toast.error("Bạn chưa chọn báo giá");

      return;
    }

    const productPayload = products.map((prod: any) => ({
      productId: prod?.productId,
      quantity: prod?.quantity,
      price: prod?.price,
      vat: prod?.vat,
      totalPrice: prod?.totalPrice,
      note: prod?.note,
    }));

    const payload = {
      ...rest,
      mainOrderDetail: productPayload,
    };

    await mutateCreate.mutateAsync(payload);
  }, []);

  const mutateUpdate = useMutation(
    (payload: TUpdateOrder) => mainOrder.update(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        setIsUpdate(false);

        refetch?.();
      },
    }
  );

  const handleUpdate = useCallback(async (data: any) => {
    const {
      id,
      salesAdminId,
      salesId,
      deliveryId,
      curatorPhone,
      curatorEmail,
      receiverFullName,
      receiverPhone,
      paymentType,
      paymentLimit,
      receiverAddress,
      requirements,
    } = data || {};

    await mutateUpdate.mutateAsync({
      id,
      salesAdminId,
      salesId,
      deliveryId,
      curatorPhone,
      curatorEmail,
      receiverFullName,
      receiverPhone,
      paymentType,
      paymentLimit,
      receiverAddress,
      requirements,
    });
  }, []);

  const renderButtons = useCallback(() => {
    switch (true) {
      case !id:
        return (
          <AddButton onClick={handleSubmit(handleCreate)}>
            Tạo báo giá
          </AddButton>
        );
      case !!id && isUpdate:
        return (
          <>
            <BaseButton onClick={handleSubmit(handleUpdate)}>
              Cập nhật
            </BaseButton>
            <BaseButton
              className="!bg-main-1 ml-3"
              onClick={() => setIsUpdate(false)}
            >
              Quay lại
            </BaseButton>
          </>
        );
      case !!id && !isUpdate:
        return (
          <Box className="flex items-center justify-end gap-3">
            <EditButton
              tooltipText="Cập nhật"
              onClick={() => setIsUpdate(true)}
            />

            <SendButton onClick={() => setDialog({ open: true })}>
              Gửi khách hàng
            </SendButton>

            <PrintButton className="!bg-error">In</PrintButton>
          </Box>
        );
    }
  }, [id, isUpdate]);

  return <Box className="flex justify-end mt-4">{renderButtons()}</Box>;
};
