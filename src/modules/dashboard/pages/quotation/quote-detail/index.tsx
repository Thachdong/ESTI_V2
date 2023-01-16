import { Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FormCheckbox } from "~modules-core/components";
import {
  QuoteDetailAddition,
  QuoteDetailAttach,
  QuoteDetailContact,
  QuoteDetailCustomer,
  QuoteDetailGeneral,
  QuoteDetailProduct,
  QuoteDetailSaleNote,
  QuoteDetailShopManagerNote,
  QuoteDetailTerms,
} from "~modules-dashboard/components";

export const QuoteDetailPage: React.FC = () => {
  const method = useForm({
    defaultValues: {
      products: [],
    },
  });

  return (
    <FormProvider {...method}>
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

      <Box className="grid grid-cols-2 gap-4 my-4">
        <QuoteDetailCustomer />

        <QuoteDetailContact />

        <QuoteDetailAttach />

        <QuoteDetailAddition />

        <Box className="col-span-2">
          <QuoteDetailProduct />
        </Box>

        <Box className="col-span-2">
          <QuoteDetailTerms />
        </Box>

        <QuoteDetailShopManagerNote />

        <QuoteDetailSaleNote />
      </Box>
    </FormProvider>
  );
};
