import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { purchaseOrder } from "src/api";
import { FormInput } from "~modules-core/components";
import {
  PurchaseDetailButtons,
  PurchaseDetailGeneral,
  PurchaseDetailGeneralView,
  PurchaseDetailImplement,
  PurchaseDetailImportHistory,
  PurchaseDetailNote,
  PurchaseDetailStatus,
  PurchaseDetailSupplier,
  PurchaseDetailTable,
  PurchaseDetailTerms,
} from "~modules-dashboard/components";

export const PurchaseRequestDetailPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const { id } = useRouter().query;

  const disabled = !!id && !isUpdate;

  const method = useForm<any>({
    defaultValues: {
      paymentDocument: [],
    },
  });

  // DATA FETCHING
  const { data: purchaseRequestDetail, refetch } = useQuery(
    ["QuoteDetail", id],
    () => purchaseOrder.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    console.log(purchaseRequestDetail);
    const {
      status,
      supplierId,
      salesAdminId,
      deliveryId,
      stockerId,
      purchaseId,
      paymentType,
      deliverDate,
      receiverAddress,
      paymentDocument,
    } = purchaseRequestDetail?.productOrder?.productOrder || {};

    const productOrderDetail = purchaseRequestDetail?.productOrderDetail || [];

    const documents = JSON.parse(paymentDocument || "[]")?.map(
      (docs: any) => docs?.id
    );

    method.reset({
      status,
      supplierId,
      salesAdminId,
      deliveryId,
      stockerId,
      purchaseId,
      paymentType,
      deliverDate,
      receiverAddress,
      paymentDocument: documents,
      products: productOrderDetail?.map((prod: any) => {
        const { productManufactor, productSpecs, ...rest } = prod || {};
        return { ...rest, manufactor: productManufactor, specs: productSpecs };
      }),
    });
  }, [purchaseRequestDetail]);

  return (
    <Box className="container-center">
      {!!id && (
        <>
          <PurchaseDetailStatus currentStatus={1} refetch={refetch} />

          <PurchaseDetailGeneralView
            data={purchaseRequestDetail?.productOrder?.productOrder || {}}
          />
        </>
      )}
      <FormProvider {...method}>
        {!id && <PurchaseDetailGeneral disabled={disabled} />}

        <PurchaseDetailSupplier />

        <PurchaseDetailImplement disabled={disabled} />

        <PurchaseDetailTable />

        <PurchaseDetailTerms disabled={disabled} />

        {!!id && (
          <>
            <Box className="grid grid-cols-2 gap-4 mb-4">
              <Box className="flex flex-col">
                <Typography className="font-bold uppercase mb-3">
                  Ghi chú
                </Typography>
                <Box className="bg-white grid gap-4 rounded-sm flex-grow p-3">
                  <FormInput
                    controlProps={{
                      name: "note",
                      control: method.control,
                    }}
                    label=""
                    multiline
                    minRows={3}
                    disabled={disabled}
                    shrinkLabel
                  />
                </Box>
              </Box>

              <PurchaseDetailNote title={"Ghi chú của sale admin"} value={""} />

              <PurchaseDetailNote title={"Ghi chú của giao nhận"} value={""} />

              <PurchaseDetailNote title={"Ghi chú của cập nhật"} value={""} />
            </Box>

            <PurchaseDetailImportHistory status={2} />
          </>
        )}

        <PurchaseDetailButtons
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          refetch={refetch}
        />
      </FormProvider>
    </Box>
  );
};
