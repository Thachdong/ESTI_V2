import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import {
  purchaseOrderBill,
  TCreatePurchaseOrderBill,
} from "src/api/purchase-order-bill";
import { AddButton } from "~modules-core/components";
import { toast } from "~modules-core/toast";

export const PurchaseBillDetailButtons: React.FC = () => {
  // EXTRACT PROPS
  const router = useRouter();

  const { id } = router.query;

  const { handleSubmit } = useFormContext();

  // METHODS
  const mutateCreate = useMutation(
    (payload: TCreatePurchaseOrderBill) => purchaseOrderBill.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        router.push("/dashboard/purchase/purchase-bill");
      },
    }
  );

  const handleCreate = useCallback(async (data: any) => {
    const { products, attachFile, ...rest } = data;

    const productPayload = products.map((prod: any) => ({
      productId: prod?.productId,
      quantity: prod?.quantity,
      price: prod?.price,
      vat: prod?.vat,
      totalPrice: prod?.totalPrice,
    }));

    const payload = {
      ...rest,
      attachFile: attachFile?.join(","),
      billDetailCreate: productPayload,
    };

    await mutateCreate.mutateAsync(payload);
  }, []);

  return (
    <Box className="flex justify-end mt-4">
      {!id && (
        <AddButton onClick={handleSubmit(handleCreate)}>Tạo hóa đơn</AddButton>
      )}
    </Box>
  );
};
