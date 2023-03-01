import { Alert, Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { quoteRequest } from "src/api";
import { FormCheckbox } from "~modules-core/components";
import { useSession } from "~modules-core/customHooks/useSession";
import {
  QuoteRequestDetailAddition,
  QuoteRequestDetailAttach,
  QuoteRequestDetailButtons,
  QuoteRequestDetailContact,
  QuoteRequestDetailCustomer,
  QuoteRequestDetailGeneral,
  QuoteRequestDetailProduct,
} from "~modules-dashboard/components";

export const QuoteRequestDetailPage = () => {
  const [isUpdate, setIsUpdate] = useState(false);

  const router = useRouter();

  const { id } = router.query;

  const disabled = Boolean(!!id && !isUpdate);

  const method = useForm<any>({
    defaultValues: {
      products: [],
    },
  });

  // DATA FETCHING
  const { data: requestDetail, refetch } = useQuery(
    ["RequestDetail_" + id],
    () => quoteRequest.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  // SIDE EFFECT
  useEffect(() => {
    const { preOrderDetailView = [], preOrderView = {} } = requestDetail || {};

    const products = preOrderDetailView.map((detail: any, index: number) => ({
      ...detail,
      no: index + 1,
    }));

    const {
      customerId,
      companyName,
      companyTaxCode,
      curatorName,
      companyAddress,
      curatorDepartmentId,
      receiverAddress,
      curatorPhone,
      curatorEmail,
      attachFile,
      requirements,
      curatorId,
      salesId,
      preOrderStatus,
    } = preOrderView;

    const arrayFiles = attachFile ? attachFile?.split?.(",") : [];

    method.reset({
      products,
      customerId,
      companyName,
      companyTaxCode,
      curatorName,
      companyAddress,
      curatorDepartmentId,
      receiverAddress,
      curatorPhone,
      curatorEmail,
      attachFile: arrayFiles,
      requirements,
      curatorId,
      salesId,
      status: preOrderStatus,
    });
  }, [requestDetail]);

  return (
    <Box className="container-center">
      {!!id && !requestDetail?.preOrderView?.customerId && (
        <Alert severity="error" className="mb-4">
          <strong>Khách hàng chưa có sẳn trong hệ thống! </strong>
          Vui lòng tạo mới tài khoản trước khi tiến hành tạo báo giá!
        </Alert>
      )}
      <FormProvider {...method}>
        {!!id ? (
          <QuoteRequestDetailGeneral
            code={requestDetail?.preOrderView?.preOrderCode}
            createdAt={requestDetail?.preOrderView?.created}
          />
        ) : (
          <Box className="mb-3">
            <FormCheckbox
              label="Khách hàng có trong hệ thống"
              controlProps={{
                name: "customerAvailable",
                control: method.control,
              }}
            />
          </Box>
        )}

        <Box className="grid grid-cols-2 gap-4">
          <QuoteRequestDetailCustomer disabled={disabled} />

          <QuoteRequestDetailContact disabled={disabled} />

          <QuoteRequestDetailAttach />

          <QuoteRequestDetailAddition />

          <QuoteRequestDetailProduct />
        </Box>

        <QuoteRequestDetailButtons
          isUpdate={isUpdate}
          setIsUpdate={setIsUpdate}
          refetch={refetch}
          requestDetail={requestDetail}
        />
      </FormProvider>
    </Box>
  );
};
