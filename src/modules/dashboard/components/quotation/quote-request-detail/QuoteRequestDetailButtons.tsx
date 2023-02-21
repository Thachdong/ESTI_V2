import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import {
  quoteRequest,
  TCreateQuoteRequest,
  TUpdateQuoteRequest,
} from "src/api";
import { AddButton, BaseButton } from "~modules-core/components";
import { toast } from "~modules-core/toast";

type TProps = {
  isUpdate: boolean;
  setIsUpdate: Dispatch<SetStateAction<boolean>>;
  refetch: () => void;
};

export const QuoteRequestDetailButtons: React.FC<TProps> = ({
  isUpdate,
  setIsUpdate,
  refetch
}) => {
  // EXTRACT PROPS
  const router = useRouter();

  const { id } = router.query;

  const {
    handleSubmit,
    formState: { isDirty },
  } = useFormContext();

  // METHODS
  const mutateCreate = useMutation(
    (payload: TCreateQuoteRequest) => quoteRequest.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        router.push("/dashboard/quotation/quote-request");
      },
    }
  );

  const handleCreate = useCallback(async (data: any) => {
    const {
      products = [],
      attachFile = [],
      customerAvailable,
      ...rest
    } = data || {};

    const payload = {
      ...rest,
      attachFile: attachFile.join(","),
      preOrderDetailCreate: products.map((prod: any) => ({
        productId: prod?.id,
        quantity: prod?.quantity,
        note: prod?.note,
      })),
    };

    await mutateCreate.mutateAsync(payload);
  }, []);

  const mutateUpdate = useMutation(
    (payload: TUpdateQuoteRequest) => quoteRequest.update(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        setIsUpdate(false);

        refetch();
      },
    }
  );

  const handleUpdate = useCallback(async (data: any) => {
    const { id, salesId, curatorId, customerId } = data || {};

    await mutateUpdate.mutateAsync({ id, salesId, curatorId, customerId });
  }, []);

  const renderButtons = useCallback(() => {
    switch (true) {
      case !id:
        return (
          <AddButton onClick={handleSubmit(handleCreate)}>
            Tạo yêu cầu
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
