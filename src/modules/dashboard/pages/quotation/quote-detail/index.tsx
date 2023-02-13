import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { preQuote } from "src/api";
import { FormCheckbox } from "~modules-core/components";
import {
  QuoteDetailAddition,
  QuoteDetailAttach,
  QuoteDetailButtons,
  QuoteDetailContact,
  QuoteDetailCustomer,
  QuoteDetailGeneral,
  QuoteDetailGeneralView,
  QuoteDetailProduct,
  QuoteDetailSaleNote,
  QuoteDetailShopManagerNote,
  QuoteDetailTerms,
} from "~modules-dashboard/components";

export const QuoteDetailPage: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const { id } = useRouter().query;

  const method = useForm<any>({
    defaultValues: {
      products: [],
    },
  });

  const disabled = Boolean(!!id && !isUpdate);

  // DATA FETCHING
  const { data: quoteDetail, refetch } = useQuery(
    ["QuoteDetail", id],
    () => preQuote.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    const { preQuoteView = {}, preQuoteDetailView = [] } = quoteDetail || {};
    const {
      salesId,
      salesNote,
      smgNote,
      paymentDocument,
      deliverDate,
      paymentType,
      requirements,
      attachFile,
      customerId,
      curatorId,
      receiverAdress,
      expireDate,
      id,
      status
    } = preQuoteView;

    const documents = JSON.parse(paymentDocument || "[]").map(
      (doc: any) => doc?.id
    );

    method.reset({
      id,
      status,
      salesId,
      customerId,
      curatorId,
      requirements,
      smgNote,
      salesNote,
      receiverAdress,
      deliverDate,
      expireDate,
      paymentType,
      products: [...preQuoteDetailView],
      attachFile: !attachFile ? [] : attachFile.split(","),
      paymentDocument: documents,
    });
  }, [quoteDetail]);

  return (
    <Box className="container-center">
      <FormProvider {...method}>
        {!!id ? (
          <QuoteDetailGeneralView data={quoteDetail?.preQuoteView} disabled={disabled} />
        ) : (
          <>
            <Box className="mb-3">
              <FormCheckbox
                label="Tạo nhanh từ yêu cầu báo giá"
                controlProps={{
                  name: "isQuoteRequest",
                  control: method.control,
                }}
              />
            </Box>
            <QuoteDetailGeneral />
          </>
        )}

        <Box className="grid grid-cols-2 gap-4 my-4">
          <QuoteDetailCustomer disabled={disabled} />

          <QuoteDetailContact disabled={disabled} />

          <QuoteDetailAttach disabled={disabled} />

          <QuoteDetailAddition disabled={disabled} />

          <Box className="col-span-2">
            <QuoteDetailProduct data={quoteDetail?.preQuoteView} />
          </Box>

          <Box className="col-span-2">
            <QuoteDetailTerms disabled={disabled} />
          </Box>

          <QuoteDetailShopManagerNote disabled={disabled} />

          <QuoteDetailSaleNote disabled={disabled} />
        </Box>

        <QuoteDetailButtons
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          refetch={refetch}
        />
      </FormProvider>
    </Box>
  );
};
