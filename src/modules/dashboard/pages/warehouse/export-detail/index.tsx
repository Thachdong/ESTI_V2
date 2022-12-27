import { Box } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { FormCheckbox } from "~modules-core/components";
import {
  ExportDetailContact,
  ExportDetailCustomer,
  ExportDetailGeneralInfo,
  ExportDetailProducts,
  ExportDetailRecipient,
  ExportDetailShipping,
} from "~modules-dashboard/components";

export const ExportDetailPage = () => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Box className="mb-2">
        <FormCheckbox
          controlProps={{
            name: "isForDelete",
            control: methods.control,
          }}
          label="Xuất bỏ sản phẩm"
        />
      </Box>

      <ExportDetailGeneralInfo />

      <Box className="grid grid-cols-2 gap-4 my-4">
        <ExportDetailCustomer />

        <ExportDetailContact />

        <ExportDetailRecipient />

        <ExportDetailShipping />
      </Box>

      <ExportDetailProducts />
    </FormProvider>
  );
};
