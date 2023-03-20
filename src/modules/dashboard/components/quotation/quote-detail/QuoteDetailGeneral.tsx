import { Alert, Box, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, quoteRequest as quoteRequestApi, staff } from "src/api";
import {
  FormDatepickerBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";

export const QuoteDetailGeneral: React.FC = () => {
  const router = useRouter();

  const { fromRequestId } = router.query;

  const { control, watch, setValue } = useFormContext();

  const { isQuoteRequest, preOrderId } = watch();

  // DATA FETCHING
  const { data: quoteRequestDetail } = useQuery(
    ["quoteRequestDetail", preOrderId, fromRequestId],
    () => quoteRequestApi.getById(preOrderId || fromRequestId).then((res) => res.data),
    {
      enabled: !!preOrderId || !!fromRequestId,
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
    if (!!fromRequestId) {
      setValue("isQuoteRequest", true);

      setValue("preOrderId", fromRequestId);
    }
  }, [fromRequestId]);

  return (
    <>
      {!!preOrderId && !quoteRequestDetail?.preOrderView?.customerId && (
        <Alert severity="error" className="mb-4">
          <strong>Khách hàng chưa có sẳn trong hệ thống! </strong>
          Vui lòng cập nhật tài khoản trước khi tiến hành tạo báo giá!{" "}
          <Link
            href={"/dashboard/quotation/quote-request-detail/?id=" + preOrderId}
          >
            Cập nhật
          </Link>
        </Alert>
      )}
      <Box className="flex flex-col">
        <Typography className="font-bold uppercase mb-3 text-sm">
          THÔNG TIN CHUNG
        </Typography>

        <Box className="grid grid-cols-2 gap-3 bg-white rounded p-3">
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
                value={quoteRequestDetail?.created}
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
            labelKey="code"
            getOptionLabel={(opt) => !!opt ? opt?.code + " - " + opt?.fullName : ""}
          />
        </Box>
      </Box>
    </>
  );
};
