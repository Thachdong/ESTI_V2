import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { useReactToPrint } from "react-to-print";
import { purchaseOrder, TCreatePurchase, TUpdatePurchase } from "src/api";
import {
  AddButton,
  BaseButton,
  EditButton,
  PrintButton,
  SendButton,
  SendMailDialog,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { PrintPurchaseDetail } from "~modules-dashboard/components";
import { TDefaultDialogState } from "~types/dialog";

type TProps = {
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
  purchaseRequestDetail: any;
};

export const PurchaseDetailButtons: React.FC<TProps> = ({
  isUpdate,
  setIsUpdate,
  refetch,
  purchaseRequestDetail,
}) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  // EXTRACT PROPS
  const router = useRouter();

  const { id } = router.query;

  const { handleSubmit, watch } = useFormContext();

  const { curatorEmail, status = 1 } = watch();

  // METHODS
  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  const mutateCreate = useMutation(
    (payload: TCreatePurchase) => purchaseOrder.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        router.push("/dashboard/purchase/purchase-request");
      },
    }
  );

  const handleCreate = useCallback(async (data: any) => {
    const { products = [], paymentDocument, ...rest } = data || {};

    const productPayload = products.map((prod: any) => ({
      needToBuyId: prod?.id,
      productId: prod?.productId,
      quantity: prod?.quantity,
      price: prod?.price,
      vat: prod?.vat,
      note: prod?.note,
    }));

    const payload = {
      ...rest,
      paymentDocument: paymentDocument.join(","),
      productOrderDetailCreate: productPayload,
    };

    await mutateCreate.mutateAsync(payload);
  }, []);

  const mutateUpdate = useMutation(
    (payload: TUpdatePurchase) => purchaseOrder.update(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        setIsUpdate(false);

        refetch?.();
      },
    }
  );

  const handleUpdate = useCallback(
    async (data: any) => {
      const { products, paymentDocument, ...rest } = data || {};

      const payload = {
        ...rest,
        id,
        paymentDocument: paymentDocument.join(","),
      };

      await mutateUpdate.mutateAsync(payload);
    },
    [id]
  );

  const mutateSendMail = useMutation(
    (payload: TSendMailProps) => purchaseOrder.sendMail(payload),
    {
      onSuccess: (response: any) => {
        toast.success(response?.resultMessage);

        refetch?.();

        onClose();
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

  const mutateSendAdvancePaymentMail = useMutation(
    (payload: TSendMailProps) => purchaseOrder.sendAdvancePaymentMail(payload),
    {
      onSuccess: (response: any) => {
        toast.success(response?.resultMessage);

        refetch?.();

        onClose();
      },
    }
  );

  const handleSendAdvancePaymentMail = useCallback(
    async (data: any) => {
      const { cc, bcc, content, title, to } = data || {};

      const payload = {
        // id: id as string,
        id: to, // as api docs
        cc: cc as string[],
        bcc: bcc as string[],
        title: title as string,
        content,
        to,
      };

      await mutateSendAdvancePaymentMail.mutateAsync(payload);
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
            Tạo đơn mua hàng
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
                <SendButton onClick={() => onOpen("accountant")}>
                  Gửi kế toán
                </SendButton>
                <SendButton onClick={() => onOpen("normal")}>
                  Gửi khách hàng
                </SendButton>
              </>
            )}

            <PrintButton className="!bg-error" onClick={handlePrint}>
              In
            </PrintButton>
            <Box className="hidden">
              <PrintPurchaseDetail
                printAreaRef={printAreaRef}
                defaultValue={purchaseRequestDetail}
              />
            </Box>
          </Box>
        );
    }
  }, [id, isUpdate, status]);

  return (
    <Box className="flex justify-end mt-4">
      {renderButtons()}

      <SendMailDialog
        onClose={onClose}
        open={dialog.open && dialog.type === "normal"}
        sendMailHandler={handleSendMail}
        defaultValue={{ to: curatorEmail, cc: [] } as any}
      />

      <SendMailDialog
        onClose={onClose}
        open={dialog.open && dialog.type === "accountant"}
        sendMailHandler={handleSendAdvancePaymentMail}
        defaultValue={{ cc: [] } as any}
        isToAccountant={true}
      />
    </Box>
  );
};
