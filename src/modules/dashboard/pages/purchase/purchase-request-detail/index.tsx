import { Box, List, ListItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQueries } from "react-query";
import { branchs, staff, suppliers } from "src/api";
import {
  FormDatepicker,
  FormDatepickerBase,
  FormInput,
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { PurchaseDetailTable, PurchaseDetailTerms } from "~modules-dashboard/components";

export const PurchaseRequestDetailPage = () => {
  const [supplier, setSupplier] = useState<any>();

  const method = useForm();

  const { control, setValue, watch } = method;

  useEffect(() => {
    if (!!supplier) {
      const { deliveryID, salesAdminID } = supplier || {};

      setValue("deliveryId", deliveryID);

      setValue("salesAdminId", salesAdminID);
    }
  }, [supplier]);

  const selectOptions = useQueries([
    {
      queryKey: "SaleAdminList",
      queryFn: () => staff.getListSaleAdmin().then((res) => res.data),
    },
    {
      queryKey: "DeliveryStaffList",
      queryFn: () => staff.getListDeliveryStaff().then((res) => res.data),
    },
  ]);

  return (
    <FormProvider {...method}>
      <Box className="bg-white p-4 my-4">
        <Typography className="font-semibold text-sm mb-2">
          THÔNG TIN CHUNG
        </Typography>
        <Box className="grid grid-cols-2 gap-4">
          <FormSelectAsync
            fetcher={branchs.getList}
            controlProps={{
              name: "branchId",
              control,
            }}
            label="Chọn chi nhánh"
            labelKey="code"
          />
        </Box>
      </Box>

      <Box className="grid grid-cols-2 gap-4 mb-4">
        <Box className="bg-white p-4">
          <Typography className="font-semibold text-sm mb-2">
            THÔNG TIN NHÀ CUNG CẤP
          </Typography>

          <Box className="grid gap-4">
            <FormSelectAsync
              fetcher={suppliers.getList}
              controlProps={{
                name: "supplierId",
                control,
              }}
              callback={(opt) => setSupplier(opt)}
              label="Chọn nhà cung cấp"
              labelKey="supplierCode"
            />

            <FormInputBase label="Địa chỉ" value={supplier?.address} disabled />

            <FormInputBase
              label="Mã số thuế"
              value={supplier?.taxCode}
              disabled
            />

            <FormInputBase
              label="Nhóm sản phẩm cung cấp"
              value={supplier?.address}
              disabled
            />
          </Box>
        </Box>

        <Box className="bg-white p-4">
          <Typography className="font-semibold text-sm mb-2">
            THÔNG TIN LIÊN HỆ
          </Typography>

          <Box className="grid gap-4">
            <FormInputBase
              label="Người phụ trách"
              value={supplier?.curatorName}
              disabled
            />

            <FormInputBase
              label="Chức vụ"
              value={supplier?.curatorPositionName}
              disabled
            />

            <FormInputBase
              label="Điện thoại"
              value={supplier?.curatorPhone}
              disabled
            />

            <FormInputBase
              label="Email"
              value={supplier?.curatorEmail}
              disabled
            />
          </Box>
        </Box>
      </Box>

      <Box className="bg-white p-4 mb-4">
        <Typography className="font-semibold text-sm mb-2">
          PHÂN CÔNG VIỆC
        </Typography>
        <Box className="grid grid-cols-2 gap-4">
          <FormSelect
            options={selectOptions[0].data || []}
            controlProps={{
              name: "salesAdminId",
              control,
              rules: { required: "Phải chọn admin phụ trách" },
            }}
            label="Admin phụ trách"
            labelKey="fullName"
          />

          <FormSelect
            options={selectOptions[1].data || []}
            controlProps={{
              name: "deliveryId",
              control,
              rules: { required: "Phải chọn giao nhận phụ trách" },
            }}
            label="Giao nhận phụ trách"
            labelKey="fullName"
          />
        </Box>
      </Box>

      <PurchaseDetailTable />

      <PurchaseDetailTerms />
    </FormProvider>
  );
};
