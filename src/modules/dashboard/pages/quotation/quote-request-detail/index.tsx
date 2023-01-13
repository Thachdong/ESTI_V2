import { Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import {
    QuoteRequestDetailAddition,
  QuoteRequestDetailAttatch,
  QuoteRequestDetailContact,
  QuoteRequestDetailCustomer,
  QuoteRequestDetailProduct,
} from "~modules-dashboard/components";

export const QuoteRequestDetailPage = () => {
  const method = useForm({defaultValues: {
    products: []
  }});

  return (
    <FormProvider {...method}>
      <Box className="grid grid-cols-2 gap-4">
        <QuoteRequestDetailCustomer />

        <QuoteRequestDetailContact />

        <QuoteRequestDetailAttatch />

        <QuoteRequestDetailAddition />

        <QuoteRequestDetailProduct />
      </Box>
      
    </FormProvider>
  );
};
