import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { purchaseOrder } from "src/api";
import { purchaseOrderBill } from "src/api/purchase-order-bill";
import { _format } from "~modules-core/utility/fomat";
import {
  PurchaseBillDetailAttach,
  PurchaseBillDetailButtons,
  PurchaseBillDetailGeneral,
  PurchaseBillDetailProducts,
  PurchaseBillDetailSupplier,
} from "~modules-dashboard/components";

export const PurchaseBillDetailPage: React.FC = () => {
  const { id, fromPurchaseOrderId } = useRouter().query;

  const method = useForm<any>({
    mode: "onBlur",
    defaultValues: {
      products: [],
    },
  });

  const { productOrderId } = method.watch();

  // DATA FETCHING
  const { data: purchaseDetail } = useQuery(
    ["PurchaseDetail", productOrderId],
    () => purchaseOrder.getById(productOrderId).then((res) => res.data),
    {
      enabled: !!productOrderId,
    }
  );

  const purchaseData = purchaseDetail?.productOrder?.productOrder || {};

  const { data: billDetail, refetch } = useQuery(
    ["PurchaseOrderBillDetail", id],
    () => purchaseOrderBill.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    const supplierId = purchaseData?.supplierId;

    method.setValue("supplierId", supplierId);

    method.setValue("products", purchaseDetail?.productOrderDetail || []);
  }, [purchaseDetail]);

  useEffect(() => {
    const { productOrderId, billNumber, supplierId, attachFile } =
      billDetail?.productOrderBillById || {};

    const files = !attachFile ? [] : attachFile.split?.(",");

    const products = billDetail?.productOrderBillDetailList || [];

    method.reset({
      productOrderId,
      billNumber,
      supplierId,
      attachFile: files,
      products,
    });
  }, [billDetail]);

  useEffect(() => {
    !!fromPurchaseOrderId &&
      method.setValue("productOrderId", fromPurchaseOrderId);
  }, [fromPurchaseOrderId]);

  return (
    <FormProvider {...method}>
      <Box className="container-center grid grid-cols-2 gap-4">
        <Box className="col-span-2">
          <PurchaseBillDetailGeneral purchaseData={purchaseData} />
        </Box>

        <Box className="col-span-2">
          <PurchaseBillDetailSupplier />
        </Box>

        <PurchaseBillDetailAttach />

        <Box className="col-span-2">
          <PurchaseBillDetailProducts
            productList={purchaseDetail?.productOrderDetail || []}
          />
        </Box>
      </Box>

      <PurchaseBillDetailButtons
        refetch={refetch}
        sendMailData={{
          to: billDetail?.productOrderBillById?.curatorEmail,
          status: billDetail?.productOrderBillById?.status,
          cc: [billDetail?.productOrderBillById?.salesAdminEmail],
        }}
      />
    </FormProvider>
  );
};