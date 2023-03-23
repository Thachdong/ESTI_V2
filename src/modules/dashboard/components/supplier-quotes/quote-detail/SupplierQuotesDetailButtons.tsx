import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useCallback, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { useReactToPrint } from "react-to-print";
import {
  askPriceOrder,
  TCreateAskPriceOrder,
  TUpdateAskPriceOrder,
} from "src/api";
import {
  AddButton,
  BaseButton,
  EditButton,
  PrintButton,
  SendMailDialog,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { PrintPurchaseDetail } from "~modules-dashboard/components";
import { TDefaultDialogState } from "~types/dialog";

type TProps = {
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  refetch?: () => void;
  purchaseRequestDetail?: any;
  status?: number;
  curatorEmail?: string;
};

export const SupplierQuotesDetailButtons: React.FC<TProps> = ({
  isUpdate,
  setIsUpdate,
  refetch,
  purchaseRequestDetail,
  status = 0,
  curatorEmail
}) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  // EXTRACT PROPS
  const router = useRouter();

  const { id } = router.query;

  const { handleSubmit } = useFormContext();

  // METHODS
  const mutateCreate = useMutation(
    (payload: TCreateAskPriceOrder) => askPriceOrder.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        router.push("/dashboard/supplier-quotes/quotes");
      },
    }
  );

  const handleCreate = useCallback(async (data: any) => {
    const { products = [], paymentDocument, supplierCode, ...rest } = data || {};

    const productPayload = products.map((prod: any) => ({
      needToPriceId: prod?.id,
      productId: prod?.productId,
      quantity: prod?.quantity,
      availabilityQuantity: prod?.availabilityQuantity,
      totalPrice: prod?.totalPrice,
      price: prod?.price,
      vat: prod?.vat,
      note: prod?.note,
      productStatusType: prod?.productStatusType,
      productStatus: prod?.productStatus,
    }));

    const payload = {
      ...rest,
      paymentDocument: paymentDocument.join(","),
      askPriceOrderDetailCreate: productPayload,
    };

    await mutateCreate.mutateAsync(payload);
  }, []);

  const mutateUpdate = useMutation(
    (payload: TUpdateAskPriceOrder) => askPriceOrder.update(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        setIsUpdate(false);

        refetch?.();

        setDialog({ open: false });
      },
    }
  );

  const handleUpdate = useCallback(async (data: any) => {
    const { products = [], paymentDocument, supplierId, ...rest } = data || {};

    const productsPayload = products.map((prod: any) => {
      const {
        specs,
        manufactor,
        unitName,
        productId,
        productCode,
        productName,
        supplierCode,
        ...rest
      } = prod;

      return { ...rest };
    });

    const payload = {
      ...rest,
      id,
      paymentDocument: paymentDocument.join(","),
      askPriceOrderDetailUpdate: productsPayload,
    };

    await mutateUpdate.mutateAsync(payload);
  }, []);

  const mutateSendMail = useMutation(
    (payload: TSendMailProps) => askPriceOrder.sendMail(payload),
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
            Tạo đơn hỏi giá
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
            {status <= 1 && (
              <>
                <EditButton
                  tooltipText="Cập nhật"
                  onClick={() => setIsUpdate(true)}
                />
                {/* <SendButton onClick={() => setDialog({ open: true })}>
                  Gửi khách hàng
                </SendButton> */}
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
        onClose={() => setDialog({ open: false })}
        open={dialog.open}
        sendMailHandler={handleSendMail}
        defaultValue={{ to: curatorEmail, cc: [] } as any}
      />
    </Box>
  );
};
