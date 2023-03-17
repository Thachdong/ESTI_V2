import { TabContext, TabList } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useState } from "react";
import {
  Dialog,
  FormInputBase,
  TabPanelContainForm,
} from "~modules-core/components";
import { ProductManageForm } from "./ProductManageForm";
import { ProductManageHistoryTable } from "./ProductManageHistoryTable";
import { ProductManagePositionTable } from "./ProductManagePositionTable";
import { ProductManageStockPlan } from "./ProductManageStockPlan";

export const ProductManageDialog: React.FC<any> = ({
  onClose,
  open,
  defaultValue,
}) => {
  const [tab, setTab] = useState("info");

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      title="Chi tiết sản phẩm"
      headerClassName="text-center"
    >
      <Box component="form">
        <Box className="grid grid-cols-3">
          <FormInputBase
            label="Mã kho lưu trữ:"
            disabled={true}
            value={defaultValue?.warehouseConfigCode}
          />
        </Box>

        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange}>
              <Tab
                label={
                  <Typography sx={{ color: false ? "red" : "ỉnherit" }}>
                    Thông tin sản phẩm
                  </Typography>
                }
                value="info"
              />
              <Tab
                label={<Typography>Lịch sử nhập xuất</Typography>}
                value="history"
              />
              <Tab
                label={<Typography>Thông tin vị trí</Typography>}
                value="storage"
              />
              <Tab
                label={<Typography>Kế hoạch stock hàng</Typography>}
                value="stockPlan"
              />
            </TabList>
          </Box>

          <TabPanelContainForm value="info" index={"info"}>
            <ProductManageForm productId={defaultValue?.productId as string} />
          </TabPanelContainForm>

          <TabPanelContainForm value="history" index={"history"}>
            <ProductManageHistoryTable
              warehouseId={defaultValue?.warehouseConfigId}
              productId={defaultValue?.productId}
            />
          </TabPanelContainForm>

          <TabPanelContainForm value="storage" index={"storage"}>
            <ProductManagePositionTable
              warehouseConfigCode={defaultValue?.warehouseConfigCode}
              productCode={defaultValue?.productCode}
            />
          </TabPanelContainForm>

          <TabPanelContainForm value="stockPlan" index={"stockPlan"}>
            <ProductManageStockPlan
              productId={defaultValue?.productId}
              productCode={defaultValue?.productCode as string}
              productName={defaultValue?.productName as string}
            />
          </TabPanelContainForm>
        </TabContext>
      </Box>
    </Dialog>
  );
};
