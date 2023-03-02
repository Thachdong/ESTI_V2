import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { askPriceOrder } from "src/api";
import {
  SupplierQuotesDetailButtons,
  SupplierQuotesDetailProduct,
  SupplierQuotesDetailStatus,
  SupplierQuotesDetailSupplier,
  SupplierQuotesDetailTerms,
} from "~modules-dashboard/components";

export const SupplierQuoteDetailPage: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const methods = useForm();

  const { id } = useRouter().query;

  const { data: detailData, refetch } = useQuery(
    ["SupplierQuoteDetail", id],
    () => askPriceOrder.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  const { status, curatorEmail } = detailData?.askPriceOrder || {};

  const disabled = (!!id && !isUpdate) || status > 1;

  useEffect(() => {
    if (!!id && !!detailData) {
      const {
        supplierId,
        paymentType,
        expireDate,
        receiverAddress,
        paymentDocument,
      } = detailData?.askPriceOrder || {};

      const { data1 = [] } = detailData || {};

      const products = data1.map((prod: any) => ({
        id: prod?.id,
        quantity: prod?.quantity,
        availabilityQuantity: prod?.availabilityQuantity,
        price: prod?.price,
        vat: prod?.vat,
        totalPrice: prod?.totalPrice,
        productStatus: prod?.productStatus,
        note: prod?.note,
        productStatusType: prod?.productStatusType,
        productCode: prod?.productCode,
        productId: prod?.productId,
        productName: prod?.productName,
        manufactor: prod?.manufactor,
        specs: prod?.specs,
        unitName: prod?.unitName,
      }));

      methods.reset({
        supplierId,
        paymentType,
        expireDate,
        receiverAddress,
        paymentDocument: !paymentDocument
          ? []
          : JSON.parse(paymentDocument)?.map((doc: any) => doc.id),
        products,
      });
    }
  }, [detailData, id]);

  return (
    <FormProvider {...methods}>
      <Box className="container-center">
        {!!id && (
          <SupplierQuotesDetailStatus
            currentStatus={status}
            refetch={refetch}
          />
        )}

        <SupplierQuotesDetailSupplier />

        <SupplierQuotesDetailProduct disabled={disabled} />

        <SupplierQuotesDetailTerms disabled={disabled} />

        <SupplierQuotesDetailButtons
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          refetch={refetch}
          status={status}
          curatorEmail={curatorEmail}
        />
      </Box>
    </FormProvider>
  );
};
