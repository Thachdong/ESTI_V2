import { Box, Paper, Typography } from "@mui/material";
import { truncate } from "fs";
import { useFormContext } from "react-hook-form";
import { branchs, orders } from "src/api";
import {
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { warehouseExportStatus } from "~modules-core/constance";

export const ExportDetailGeneralInfo = () => {
  const { control, watch } = useFormContext();

  const isForDelete = watch("isForDelete");

  return (
    <Paper className="rounded-sm p-3">
      <Typography className="text-sm font-medium mb-3">
        THÔNG TIN CHUNG
      </Typography>

      <Box className="grid grid-cols-2 gap-4">
        {isForDelete ? (
          <FormSelectAsync
            fetcher={branchs.getList}
            controlProps={{
              control,
              name: "branchId",
            }}
            label="Mã chi nhánh"
          />
        ) : (
          <FormSelectAsync
            fetcher={orders.getList}
            fetcherParams={{ status: 2 }} // Lấy order đang thực hiện
            selectShape={{ valueKey: "id", labelKey: "code" }}
            controlProps={{
              control,
              name: "productOrderId",
            }}
            label="Đơn mua hàng"
          />
        )}

        <FormSelect
          options={warehouseExportStatus}
          controlProps={{
            control,
            name: "statusId",
          }}
          label="Trạng thái xuất kho"
          selectShape={{ valueKey: "value", labelKey: "label" }}
        />

        <FormInputBase value="dfasdf " disabled={true} label="Ngày tạo" />

        <FormInputBase
          value="dfasdf "
          disabled={true}
          label="Nhân viên giao nhận"
        />

        {!isForDelete && (
          <FormInputBase value="dfasdf " disabled={true} label="Mã chi nhánh" />
        )}

        <FormInputBase value="dfasdf " disabled={true} label="Mã kho" />
      </Box>
    </Paper>
  );
};
