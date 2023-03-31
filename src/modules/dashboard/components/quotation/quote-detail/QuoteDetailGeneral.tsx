import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, quoteRequest as quoteRequestApi, staff } from "src/api";
import {
  FormDatepickerBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";

type TProps = {
  createdRequestDate?: number;
};

export const QuoteDetailGeneral: React.FC<TProps> = ({
  createdRequestDate,
}) => {
  const { control, watch } = useFormContext();

  const { isQuoteRequest } = watch();

  // DATA FETCHING
  const { data: saleStaff } = useQuery(["saleStaffList"], () =>
    staff.getListSale().then((res) => res.data)
  );

  return (
    <Box className="flex flex-col">
      <Typography className="font-bold uppercase mb-3 text-sm">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid lg:grid-cols-2 gap-3 bg-white rounded p-3">
        {isQuoteRequest && (
          <>
            <FormSelectAsync
              controlProps={{
                name: "preOrderId",
                control: control,
                rules: { required: "Phải chọn mã yêu  cầu báo giá" },
              }}
              fetcher={quoteRequestApi.getList}
              fetcherParams={{ statusPreOrder: 0 }}
              label="Mã yêu cầu báo giá"
              labelKey="preOrderCode"
            />

            <FormDatepickerBase
              label="Ngày YC"
              value={createdRequestDate}
              disabled={true}
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
          getOptionLabel={(opt: any) =>
            !!opt ? `${opt?.code} - ${opt?.fullName}` : ""
          }
        />
      </Box>
    </Box>
  );
};
