import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { quoteRequest } from "src/api";
import { FormCheckbox } from "~modules-core/components";
import {
  QuoteRequestDetailAddition,
  QuoteRequestDetailAttach,
  QuoteRequestDetailButtons,
  QuoteRequestDetailContact,
  QuoteRequestDetailCustomer,
  QuoteRequestDetailProduct,
} from "~modules-dashboard/components";

export const QuoteRequestDetailPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const method = useForm({
    defaultValues: {
      products: [],
    },
  });

  const { data: requestDetail } = useQuery(
    ["RequestDetail_" + id],
    () => quoteRequest.getById(id as string).then(res => res.data),
    {
      enabled: !!id,
    }
  );

  useEffect(() => {
    
  }, [])

  console.log(requestDetail);
  

  return (
    <Box className="container-center">
      <FormProvider {...method}>
        <Box className="mb-3">
          <FormCheckbox
            label="Khách hàng có trong hệ thống"
            controlProps={{
              name: "customerAvailable",
              control: method.control,
            }}
          />
        </Box>

        <Box className="grid grid-cols-2 gap-4">
          <QuoteRequestDetailCustomer />

          <QuoteRequestDetailContact />

          <QuoteRequestDetailAttach />

          <QuoteRequestDetailAddition />

          <QuoteRequestDetailProduct />
        </Box>

        <QuoteRequestDetailButtons />
      </FormProvider>
    </Box>
  );
};
