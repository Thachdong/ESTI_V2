import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { quoteRequest, TCreateQuoteRequest } from "src/api";
import { AddButton } from "~modules-core/components";
import { toast } from "~modules-core/toast";

export const QuoteRequestDetailButtons: React.FC = () => {
  const router = useRouter();

  const { handleSubmit } = useFormContext();

  const mutateCreate = useMutation(
    (payload: TCreateQuoteRequest) => quoteRequest.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        router.push("/dashboard/quotation/quote-request");
      },
    }
  );

  const handleCreate = useCallback(async(data: any) => {
    const { products = [], attachFile = [], customerAvailable, ...rest } = data || {};

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

  return (
    <Box className="flex justify-end mt-4">
      <AddButton onClick={handleSubmit(handleCreate)}>Tạo yêu cầu</AddButton>
    </Box>
  );
};
