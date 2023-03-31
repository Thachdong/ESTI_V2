import { Alert, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { preQuote, quoteRequest } from "src/api";
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
  QuoteDetailViewContact,
  QuoteDetailViewCustomer,
} from "~modules-dashboard/components";

export const QuoteDetailPage: React.FC = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const { id, cloneId, fromRequestId } = useRouter().query;

  const method = useForm<any>({
    defaultValues: {
      products: [],
      isQuoteRequest: true,
    },
  });

  const { preOrderId, isQuoteRequest } = method.watch();

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

  const { data: quoteRequestDetail } = useQuery(
    ["quoteRequestDetail", preOrderId, fromRequestId],
    () =>
      quoteRequest.getById(preOrderId || fromRequestId).then((res) => res.data),
    {
      enabled: !!preOrderId || !!fromRequestId,
    }
  );

  const {customerId} = quoteRequestDetail?.preOrderView || {}

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
      preOrderId,
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
      isQuoteRequest: !!preOrderId,
    });
  }, [quoteDetail, id, cloneId]);

  useEffect(() => {
    if (!!quoteRequestDetail) {
      const { preOrderView, preOrderDetailView } = quoteRequestDetail || {};

      const { salesId, curatorId, customerId, attachFile, requirements } =
        preOrderView || {};

      method.setValue("salesId", salesId);

      method.setValue("curatorId", curatorId);

      method.setValue("customerId", customerId);

      method.setValue("requirements", requirements);

      method.setValue("products", [...preOrderDetailView]);

      method.setValue("attachFile", !attachFile ? [] : attachFile.split(","));
    }
  }, [quoteRequestDetail]);

  useEffect(() => {
    if (!!fromRequestId) {
      method.setValue("isQuoteRequest", true);

      method.setValue("preOrderId", fromRequestId);
    }
  }, [fromRequestId]);

  useEffect(() => {
    if (!!cloneId) {
      method.setValue("preOrderId", null);

      method.setValue("isQuoteRequest", false);
    }
  }, [cloneId, quoteDetail]);

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
            {(!!preOrderId && !customerId && isQuoteRequest) && (
              <Alert severity="error" className="mb-4">
                <strong>Khách hàng chưa có sẳn trong hệ thống! </strong>
                Vui lòng cập nhật tài khoản trước khi tiến hành tạo báo giá!{" "}
                <Link
                  href={
                    "/dashboard/quotation/quote-request-detail/?id=" +
                    preOrderId
                  }
                >
                  Cập nhật
                </Link>
              </Alert>
            )}
            <Box className="mb-3">
              <FormCheckbox
                label="Tạo nhanh từ yêu cầu báo giá"
                controlProps={{
                  name: "isQuoteRequest",
                  control: method.control,
                }}
              />
            </Box>
            <QuoteDetailGeneral
              createdRequestDate={quoteRequestDetail?.created}
            />
          </>
        )}

        <Box className="grid lg:grid-cols-2 gap-4 my-4">
          {!customerId && !!preOrderId && isQuoteRequest ? (
            <QuoteDetailViewCustomer
              customerData={quoteRequestDetail?.preOrderView}
            />
          ) : (
            <QuoteDetailCustomer disabled={disabled} />
          )}

          {!customerId && !!preOrderId && isQuoteRequest ? (
            <QuoteDetailViewContact
              contactData={quoteRequestDetail?.preOrderView}
            />
          ) : (
            <QuoteDetailContact disabled={disabled} />
          )}

          <QuoteDetailAttach disabled={disabled} />

          <QuoteDetailAddition disabled={disabled} />

          <Box className="lg:col-span-2">
            <QuoteDetailProduct
              data={quoteDetail?.preQuoteView}
              disabled={disabled}
              refetch={refetch}
            />
          </Box>

          <Box className="lg:col-span-2">
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
              // quoteDetail?.preQuoteView?.curatorEmail, api yêu cầu chỉ truyền email của sale phụ trách
              quoteDetail?.preQuoteView?.salesEmail,
              // quoteDetail?.preQuoteView?.receiverEmail,
            ],
          }}
          quoteDetail={quoteDetail}
        />
      </FormProvider>
    </Box>
  );
};
