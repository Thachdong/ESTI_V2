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
  QuoteDetailFeedback,
  QuoteDetailGeneral,
  QuoteDetailGeneralView,
  QuoteDetailProduct,
  QuoteDetailSaleNote,
  QuoteDetailShopManagerNote,
  QuoteDetailTerms,
} from "~modules-dashboard/components";

export const QuoteDetailPage: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const { id, cloneId } = useRouter().query;

  const method = useForm<any>({
    defaultValues: {
      products: [],
      isQuoteRequest: true,
    },
  });

  const disabled = Boolean(!!id && !isUpdate);

  // DATA FETCHING
  const { data: quoteDetail, refetch } = useQuery(
    ["QuoteDetail", id, cloneId],
    () => {
      const quoteId = id || cloneId;

      return preQuote.getById(quoteId as string).then((res) => res.data);
    },
    {
      enabled: !!id || !!cloneId,
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
      receiverAddress,
      expireDate,
      id,
      status,
      curatorPhone,
      curatorEmail,
      curatorDepartmentId,
      performBranchId,
      preOrderId
    } = preQuoteView;

    let documents = [];

    try {
      documents = JSON.parse(paymentDocument || "[]").map(
        (doc: any) => doc?.id
      );
    } catch (error) {
      console.log(error);
    }

    method.reset({
      id: !!cloneId ? null : id,
      status,
      salesId,
      customerId,
      curatorId,
      requirements,
      smgNote,
      salesNote,
      receiverAddress,
      deliverDate,
      expireDate,
      paymentType,
      curatorPhone,
      curatorEmail,
      curatorDepartmentId,
      branchId: performBranchId,
      products: [...preQuoteDetailView],
      attachFile: !attachFile ? [] : attachFile.split(","),
      paymentDocument: documents,
      preOrderId,
      isQuoteRequest: !!preOrderId
    });
  }, [quoteDetail, id, cloneId]);

  return (
    <Box className="container-center">
      <FormProvider {...method}>
        {!!id ? (
          <QuoteDetailGeneralView
            data={quoteDetail?.preQuoteView}
            disabled={disabled}
          />
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
            <QuoteDetailProduct
              data={quoteDetail?.preQuoteView}
              disabled={disabled}
              refetch={refetch}
            />
          </Box>

          <Box className="col-span-2">
            <QuoteDetailTerms disabled={disabled} />
          </Box>

          {!!id && (
            <>
              <QuoteDetailShopManagerNote disabled={true} />

              <QuoteDetailSaleNote disabled={true} />

              <QuoteDetailFeedback />
            </>
          )}
        </Box>

        <QuoteDetailButtons
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          refetch={refetch}
          sendMailData={{
            to: quoteDetail?.preQuoteView?.curatorEmail,
            cc: [
              quoteDetail?.preQuoteView?.curatorEmail,
              quoteDetail?.preQuoteView?.salesEmail,
              quoteDetail?.preQuoteView?.receiverEmail,
            ],
          }}
          quoteDetail={quoteDetail}
        />
      </FormProvider>
    </Box>
  );
};
