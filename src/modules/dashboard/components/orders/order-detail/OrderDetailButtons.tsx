import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import {
  preQuote,
  TCreatePreQuote,
  TUpdatePreQuote,
} from "src/api";
import { AddButton, BaseButton } from "~modules-core/components";
import { toast } from "~modules-core/toast";

type TProps = {
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
};

export const OrderDetailButtons: React.FC<TProps> = ({
  isUpdate,
  setIsUpdate,
  refetch
}) => {
  // EXTRACT PROPS
  const router = useRouter();

  const { id } = router.query;

  const { handleSubmit } = useFormContext();

  // METHODS
  const mutateCreate = useMutation(
    (payload: TCreatePreQuote) => preQuote.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        router.push("/dashboard/quotation/quote-list");
      },
    }
  );

  const handleCreate = useCallback(async (data: any) => {
    const {
      attachFile,
      products,
      isQuoteRequest,
      paymentType,
      paymentTypeDescript,
      paymentDocument,
      ...rest
    } = data || {};

    if (products.length === 0) {
      toast.error("Phải chọn sản phẩm để báo giá");

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
      attachFile: attachFile.join(","),
      paymentType: paymentType === "Khác" ? paymentTypeDescript : paymentType,
      paymentDocument: paymentDocument.join(","),
      preQuoteDetail: productPayload,
    };

    await mutateCreate.mutateAsync(payload);
  }, []);

  const mutateUpdate = useMutation(
    (payload: TUpdatePreQuote) => preQuote.update(payload),
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
      attachFile,
      products,
      isQuoteRequest,
      paymentType,
      paymentTypeDescript,
      paymentDocument,
      ...rest
    } = data || {};

    if (products.length === 0) {
      toast.error("Phải chọn sản phẩm để báo giá");

      return;
    }

    const productPayload = products.map((prod: any) => ({
      id: prod?.id,
      productId: prod?.productId,
      quantity: prod?.quantity,
      price: prod?.price,
      vat: prod?.vat,
      note: prod?.note,
    }));

    const payload = {
      ...rest,
      attachFile: attachFile.join(","),
      paymentType: paymentType === "Khác" ? paymentTypeDescript : paymentType,
      paymentDocument: paymentDocument.join(","),
      preQuoteDetailUpdate: productPayload,
    };

    await mutateUpdate.mutateAsync(payload);
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
          <BaseButton onClick={() => setIsUpdate(true)}>Cập nhật</BaseButton>
        );
    }
  }, [id, isUpdate]);

  return <Box className="flex justify-end mt-4">{renderButtons()}</Box>;
};
