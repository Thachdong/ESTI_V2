import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, purchaseOrder, staff } from "src/api";
import {
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";

type TProps = {
  orderDetail: any;
  handleUpdateWarehouseId: (id: string) => void;
};

export const ImportDetailGeneralInfo: React.FC<TProps> = ({
  orderDetail,
  handleUpdateWarehouseId,
}) => {
  // LOCAL STATE AND EXTRACT PROPS
  const [selectedBranch, setSelectedBranch] = useState<any>();

  const { control, watch } = useFormContext();

  const withoutPurchaseInvoice = watch("withoutPurchaseInvoice");

  // DATA FETCHING
  const { data: deliveryList } = useQuery(["DeliveryList"], () =>
    staff.getListDeliveryStaff().then((res) => res.data)
  );

  const { data: purchaseList } = useQuery(["PurchaseList"], () =>
    staff.getListPurchaseStaff().then((res) => res.data)
  );

  const { data: stockerList } = useQuery(["StockerList"], () =>
    staff.getListStockerStaff().then((res) => res.data)
  );

  // METHODS
  const renderTagsBaseOnInvoiceFlag = useCallback(() => {
    if (!withoutPurchaseInvoice)
      return (
        <>
          <FormSelectAsync
            fetcher={purchaseOrder.getList}
            fetcherParams={{ status: 2 }} // Lấy order đang thực hiện
            controlProps={{
              control,
              name: "productOrderId",
              rules: { required: "Phải chọn đơn mua hàng" },
            }}
            label="Đơn mua hàng"
            labelKey="code"
          />

          <FormInputBase
            name="saleAdmin"
            label="Admin phụ trách"
            value={orderDetail?.salesAdminCode}
            disabled
          />

          <FormInputBase
            name="createdAt"
            label="Ngày tạo"
            value={
              orderDetail?.created &&
              moment(orderDetail?.created).format("DD/MM/YYYY")
            }
            disabled
          />
        </>
      );
  }, [withoutPurchaseInvoice, orderDetail]);

  // SIDE EFFECTS
  useEffect(() => {
    const { warehouseConfigId } = selectedBranch || {};

    !!warehouseConfigId && handleUpdateWarehouseId(warehouseConfigId);
  }, [selectedBranch]);

  return (
    <Box className="">
      <Typography className="text-sm font-semibold mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid lg:grid-cols-2 gap-4 rounded p-3 bg-white">
        {renderTagsBaseOnInvoiceFlag()}

        <FormSelectAsync
          fetcher={branchs.getList}
          callback={(option) => setSelectedBranch(option)}
          controlProps={{
            control,
            name: "branchId",
            rules: { required: "Phải chọn chi nhánh" },
          }}
          label="Mã chi nhánh"
          labelKey="code"
        />

        <FormSelect
          options={deliveryList}
          controlProps={{
            control,
            name: "deliveryId",
          }}
          labelKey="fullName"
          label="Giao nhận phụ trách"
        />

        <FormSelect
          options={purchaseList}
          controlProps={{
            control,
            name: "purchaseId",
            rules: { required: "Phải chọn nhân viên mua hàng" },
          }}
          labelKey="fullName"
          label="Nhân viên mua hàng"
        />

        <FormSelect
          options={stockerList}
          controlProps={{
            control,
            name: "stockerId",
            rules: { required: "Phải chọn thủ kho" },
          }}
          labelKey="fullName"
          label="Thủ kho"
        />

        <FormInputBase
          name="warehouseConfigCode"
          label="Mã kho"
          value={selectedBranch?.warehouseConfigCode}
          disabled
        />
      </Box>
    </Box>
  );
};
