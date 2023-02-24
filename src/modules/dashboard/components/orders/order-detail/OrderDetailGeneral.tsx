import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, preQuote } from "src/api";
import { FormSelectAsync } from "~modules-core/components";

export const OrderDetailGeneral: React.FC = () => {
  const { control, watch, setValue } = useFormContext();

  const { preQuoteId, notFromQuote } = watch();

  const { data: quoteDetail } = useQuery(
    ["quoteDetail", preQuoteId],
    () => preQuote.getById(preQuoteId).then((res) => res.data),
    {
      enabled: !!preQuoteId,
    }
  );

  useEffect(() => {
    const { preQuoteDetailView = [], preQuoteView = {} } = quoteDetail || {};

    const {
      customerId,
      curatorId,
      salesId,
      smgNote,
      salesNote,
      attachFile,
      requirements,
      performBranchId,
    } = preQuoteView;

    setValue("products", [...preQuoteDetailView]);

    setValue("customerId", customerId);

    setValue("curatorId", curatorId);

    setValue("salesId", salesId);

    setValue("smgNote", smgNote);

    setValue("salesNote", salesNote);

    setValue("branchId", performBranchId);

    setValue("requirements", requirements);

    setValue("attachFile", !attachFile ? [] : attachFile.split?.(","));
  }, [quoteDetail]);

  return (
    <Box>
      <Typography className="font-bold uppercase mb-3 text-sm">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4 bg-white rounded p-3">
        {!notFromQuote && (
          <FormSelectAsync
            controlProps={{
              name: "preQuoteId",
              control,
              rules: { required: "Phải chọn đơn báo giá" },
            }}
            fetcherParams={{ status: 1 }}
            label="Đơn báo giá:"
            fetcher={preQuote.getList}
            labelKey="preQuoteCode"
          />
        )}

        <FormSelectAsync
          controlProps={{
            name: "branchId",
            control,
            rules: { required: "Phải chọn chi nhánh" },
          }}
          label="CN thực hiện:"
          labelKey="code"
          fetcher={branchs.getList}
        />
      </Box>
    </Box>
  );
};
