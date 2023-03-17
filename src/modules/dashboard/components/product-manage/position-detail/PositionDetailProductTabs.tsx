import { TabContext, TabList } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { TabPanelContainForm } from "~modules-core/components";
import { ExportProduct } from "./ExportProduct";
import { ImportProduct } from "./ImportProduct";
import { InventoryProduct } from "./InventoryProduct";

export const PositionDetailProductTabs: React.FC = () => {
  const [tab, setTab] = useState("inventory");

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: string) => {
      setTab(newValue);
    },
    []
  );
  return (
    <Box className="mb-4">
      <Typography className="font-bold uppercase text-sm mb-4">
        THÔNG TIN SẢN PHẨM
      </Typography>

      <TabContext value={tab}>
        <Box className="container-center relative col-span-4 bg-white">
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange}>
              <Tab label={<Typography>Tồn kho</Typography>} value="inventory" />

              <Tab label={<Typography>Nhập kho</Typography>} value="import" />

              <Tab label={<Box>Xuất kho</Box>} value="export" />
            </TabList>
          </Box>

          <Box className="tabpanel-container relative pb-4 pt-2">
            <TabPanelContainForm value="inventory" index={"inventory"}>
              <InventoryProduct />
            </TabPanelContainForm>

            <TabPanelContainForm value="import" index={"import"}>
              <ImportProduct />
            </TabPanelContainForm>

            <TabPanelContainForm value="export" index={"export"}>
              <ExportProduct />
            </TabPanelContainForm>
          </Box>
        </Box>
      </TabContext>
    </Box>
  );
};
