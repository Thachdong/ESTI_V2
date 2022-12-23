import { Box, Paper, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, orders, staff } from "src/api";
import {
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";

type TProps = {
  orderDetail: any;
};

export const WarehouseImportGeneralInfo: React.FC<TProps> = ({
  orderDetail,
}) => {
  const [selectedBranch, setSelectedBranch] = useState<any>();
  
  const { control, watch } = useFormContext();

  const withoutPurchaseInvoice = watch("withoutPurchaseInvoice");

  const { data: deliveryList } = useQuery(["DeliveryList"], () =>
    staff.getListDeliveryStaff().then((res) => res.data)
  );

  const { data: purchaseList } = useQuery(["PurchaseList"], () =>
    staff.getListPurchaseStaff().then((res) => res.data)
  );

  const { data: stockerList } = useQuery(["StockerList"], () =>
    staff.getListStockerStaff().then((res) => res.data)
  );

  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4">
        {!withoutPurchaseInvoice && (
          <FormSelectAsync
            fetcher={orders.getList}
            fetcherParams={{ status: 2 }} // Lấy order đang thực hiện
            selectShape={{ valueKey: "id", labelKey: "code" }}
            controlProps={{
              control,
              name: "productOrderId",
              rules: { required: true },
            }}
            label="Đơn mua hàng"
          />
        )}

        <FormSelectAsync
          fetcher={branchs.getList}
          callback={(option) => setSelectedBranch(option)}
          controlProps={{
            control,
            name: "branchId",
            rules: { required: true },
          }}
          label="Mã chi nhánh"
        />

        <FormSelect
          options={deliveryList}
          controlProps={{
            control,
            name: "deliveryId",
            rules: { required: false },
          }}
          label="Giao nhận phụ trách"
          selectShape={{ valueKey: "id", labelKey: "fullName" }}
        />

        <FormSelect
          options={purchaseList}
          controlProps={{
            control,
            name: "purchaseId",
            rules: { required: "Phải chọn nhân viên mua hàng" },
          }}
          label="Nhân viên mua hàng"
          selectShape={{ valueKey: "id", labelKey: "fullName" }}
        />

        <FormSelect
          options={stockerList}
          controlProps={{
            control,
            name: "stockerId",
            rules: { required: "Phải chọn thủ kho" },
          }}
          label="Thủ kho"
          selectShape={{ valueKey: "id", labelKey: "fullName" }}
        />

        {!withoutPurchaseInvoice && (
          <FormInputBase
            name="saleAdmin"
            label="Admin phụ trách"
            value={orderDetail?.salesAdminCode}
            disabled
          />
        )}

        {!withoutPurchaseInvoice && (
          <FormInputBase
            name="createdAt"
            label="Ngày tạo"
            value={moment(orderDetail?.created).format("DD/MM/YYYY")}
            disabled
          />
        )}
        <FormInputBase
          name="warehouseConfigCode"
          label="Mã kho"
          value={selectedBranch?.warehouseConfigCode}
          disabled
        />
      </Box>
    </Paper>
  );
};
