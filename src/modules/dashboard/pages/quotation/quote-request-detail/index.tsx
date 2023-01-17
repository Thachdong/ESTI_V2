import { Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FormCheckbox } from "~modules-core/components";
import {
  QuoteRequestDetailAddition,
  QuoteRequestDetailAttach,
  QuoteRequestDetailContact,
  QuoteRequestDetailCustomer,
  QuoteRequestDetailProduct,
} from "~modules-dashboard/components";

export const QuoteRequestDetailPage = () => {
  const method = useForm({
    defaultValues: {
      products: [],
    },
  });

  return (
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
    </FormProvider>
  );
};
