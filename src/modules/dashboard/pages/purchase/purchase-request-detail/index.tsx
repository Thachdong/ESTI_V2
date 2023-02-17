import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { purchaseOrder } from "src/api";
import {
  PurchaseDetailGeneral,
  PurchaseDetailImplement,
  PurchaseDetailSupplier,
  PurchaseDetailTable,
  PurchaseDetailTerms,
} from "~modules-dashboard/components";
import { PurchaseDetailButtons } from "~modules-dashboard/components/purchase/purchase-request-detail/PurchaseDetailButtons";

export const PurchaseRequestDetailPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const [supplier, setSupplier] = useState<any>();

  const {id} = useRouter().query;

  const method = useForm<any>({
    defaultValues: {
      paymentDocument: []
    }
  });

  const { setValue } = method;

   // DATA FETCHING
   const { data: PurchaseRequestDetail, refetch } = useQuery(
    ["QuoteDetail", id],
    () => purchaseOrder.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  useEffect(() => {
    if (!!supplier) {
      const { deliveryID, salesAdminID } = supplier || {};

      setValue("deliveryId", deliveryID);

      setValue("salesAdminId", salesAdminID);
    }
  }, [supplier]);

  return (
    <Box className="container-center">
      <FormProvider {...method}>
        <PurchaseDetailGeneral disabled={false} />

        <PurchaseDetailSupplier disabled={false} />

        <PurchaseDetailImplement disabled={false} />

        <PurchaseDetailTable />

        <PurchaseDetailTerms />

        <PurchaseDetailButtons isUpdate={isUpdate} setIsUpdate={setIsUpdate} refetch={refetch} />
      </FormProvider>
    </Box>
  );
};
