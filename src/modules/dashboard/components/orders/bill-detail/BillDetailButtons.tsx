import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { bill, mainOrder, TCreateBill } from "src/api";
import {
  AddButton,
  PrintButton,
  SendButton,
  SendMailDialog,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDefaultDialogState } from "~types/dialog";

type TProps = {
  refetch?: () => void;
};

export const BillDetailButtons: React.FC<TProps> = ({
  refetch,
}) => {
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  // EXTRACT PROPS
  const router = useRouter();

  const { id } = router.query;

  const { handleSubmit, watch } = useFormContext();

  const { curatorEmail } = watch();

  // METHODS
  const mutateCreate = useMutation(
    (payload: TCreateBill) => bill.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        router.push("/dashboard/orders/bill-list");
      },
    }
  );

  const handleCreate = useCallback(async (data: any) => {
    const { defaultReceiver, products, attachFile, ...rest } = data;

    const productPayload = products.map((prod: any) => ({
      productId: prod?.productId,
      quantity: prod?.quantity,
      price: prod?.price,
      vat: prod?.vat,
      totalPrice: prod?.totalPrice,
    }));

    const payload = {
      ...rest,
      billDetailCreate: productPayload,
      attachFile: attachFile.join(","),
    };

    await mutateCreate.mutateAsync(payload);
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

  const renderButtons = useCallback(() => {
    if (!!id) {
      return (
        <Box className="flex items-center justify-end gap-3">
          <SendButton onClick={() => setDialog({ open: true })}>
            Gửi khách hàng
          </SendButton>
          <PrintButton className="!bg-error">In</PrintButton>
        </Box>
      );
    } else {
      return (
        <AddButton onClick={handleSubmit(handleCreate)}>Tạo báo giá</AddButton>
      );
    }
  }, [id]);

  return (
    <Box className="flex justify-end mt-4">
      {renderButtons()}
      <SendMailDialog
        onClose={() => setDialog({ open: false })}
        open={dialog.open}
        sendMailHandler={handleSendMail}
        defaultValue={{ to: curatorEmail } as any}
      />
    </Box>
  );
};
