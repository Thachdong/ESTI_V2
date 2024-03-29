import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { useReactToPrint } from "react-to-print";
import { mainOrder, TCreateOrder, TUpdateOrder } from "src/api";
import {
  AddButton,
  BaseButton,
  EditButton,
  PrintButton,
  SendButton,
  SendMailDialog,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { PrintOrderDetail } from "~modules-dashboard/components";
import { TDefaultDialogState } from "~types/dialog";

type TProps = {
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  refetch?: () => void;
  sendMailData: any;
  orderDetail: any;
};

export const OrderDetailButtons: React.FC<TProps> = ({
  isUpdate,
  setIsUpdate,
  refetch,
  sendMailData,
  orderDetail,
}) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  // EXTRACT PROPS
  const router = useRouter();

  const { id } = router.query;

  const { handleSubmit, watch } = useFormContext();

  const { status } = watch();

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

  const mutateSendMail = useMutation(
    (payload: TSendMailProps) => mainOrder.sendMail(payload),
    {
      onSuccess: (response: any) => {
        toast.success(response?.resultMessage);

        refetch?.();

        setDialog({ open: false });
      },
    }
  );

  const handleSendMail = useCallback(
    async (data: any) => {
      const { cc, bcc, content, title } = data || {};

      const payload = {
        id: id as string,
        cc: cc as string[],
        bcc: bcc as string[],
        title: title as string,
        content,
      };

      await mutateSendMail.mutateAsync(payload);
    },
    [id]
  );

  const printAreaRef = useRef<HTMLTableElement>(null);
  const handlePrint = useReactToPrint({
    content: () => printAreaRef.current,
    pageStyle: `
      @page {
        size: 210mm 297mm;
      }
    `,
  });

  const renderButtons = useCallback(() => {
    switch (true) {
      case !id:
        return (
          <AddButton onClick={handleSubmit(handleCreate)}>
            Tạo đơn đặt hàng
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
            {status <= 2 && (
              <>
                <EditButton
                  tooltipText="Cập nhật"
                  onClick={() => setIsUpdate(true)}
                />

                <SendButton onClick={() => setDialog({ open: true })}>
                  Gửi khách hàng
                </SendButton>
              </>
            )}

            <PrintButton className="!bg-error" onClick={handlePrint}>
              In
            </PrintButton>
            <Box className="hidden">
              <PrintOrderDetail
                printAreaRef={printAreaRef}
                defaultValue={orderDetail}
              />
            </Box>
          </Box>
        );
    }
  }, [id, isUpdate, status]);

  return (
    <Box className="flex justify-end">
      {renderButtons()}
      <SendMailDialog
        onClose={() => setDialog({ open: false })}
        open={dialog.open}
        sendMailHandler={handleSendMail}
        defaultValue={{ to: sendMailData.to, cc: [...sendMailData.cc] } as any}
      />
    </Box>
  );
};
