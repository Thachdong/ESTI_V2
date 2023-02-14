import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, quoteRequest as quoteRequestApi, staff } from "src/api";
import {
  FormDatepickerBase,
  FormInputCreatableBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";

export const QuoteDetailGeneral: React.FC = () => {
  const { requestId } = useRouter().query;

  const { control, watch, setValue } = useFormContext();

  const { isQuoteRequest, preOrderId } = watch();

  // DATA FETCHING
  const { data: quoteRequestDetail } = useQuery(
    ["quoteRequestDetail", preOrderId],
    () => quoteRequestApi.getById(preOrderId).then((res) => res.data),
    {
      enabled: !!preOrderId,
    }
  );

  const { data: saleStaff } = useQuery(["saleStaffList"], () =>
    staff.getListSale().then((res) => res.data)
  );

  // SIDE EFFECTS
  useEffect(() => {
    if (!!quoteRequestDetail) {
      const { preOrderView, preOrderDetailView } = quoteRequestDetail || {};

      const { salesId, curatorId, customerId, attachFile, requirements } =
        preOrderView || {};

      setValue("salesId", salesId);

      setValue("curatorId", curatorId);

      setValue("customerId", customerId);

      setValue("requirements", requirements);

      setValue("products", [...preOrderDetailView]);

      setValue("attachFile", !attachFile ? [] : attachFile.split(","));
    }
  }, [quoteRequestDetail]);

  useEffect(() => {
    if (!!requestId) {
      setValue("isQuoteRequest", true);

      setValue("preOrderId", requestId);
    }
  }, [requestId]);

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded-sm p-3">
        {isQuoteRequest && (
          <>
            <FormSelectAsync
              controlProps={{
                name: "preOrderId",
                control: control,
                rules: { required: "Phải mã yêu  cầu báo giá" },
              }}
              fetcher={quoteRequestApi.getList}
              label="Mã yêu cầu báo giá"
              labelKey="preOrderCode"
            />

            <FormDatepickerBase
              label="Ngày YC"
              renderInputProps={{ disabled: true }}
              value={quoteRequestDetail?.created}
            />
          </>
        )}

        <FormSelectAsync
          controlProps={{
            name: "branchId",
            control: control,
            rules: { required: "Phải chọn chi nhánh" },
          }}
          fetcher={branchs.getList}
          label="CN thực hiện"
          labelKey="code"
        />

        <FormSelect
          options={saleStaff || []}
          label="Sales phụ trách"
          controlProps={{
            name: "salesId",
            control,
            rules: { required: "Phải chọn sale phụ trách" },
          }}
          labelKey="code"
        />
      </Box>
    </Box>
  );
};
