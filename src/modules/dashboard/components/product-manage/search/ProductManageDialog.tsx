import { TabContext, TabList } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { products } from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  TabPanelContainForm,
} from "~modules-core/components";
import { ProductManageForm } from "./ProductManageForm";
import { ProductManageHistoryTable } from "./ProductManageHistoryTable";

export const ProductManageDialog: React.FC<any> = ({
  onClose,
  open,
  defaultValue,
}) => {
  const [tab, setTab] = useState("1");

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const methods = useForm<any>({ mode: "onBlur", reValidateMode: "onSubmit" });

  const { reset, control, watch } = methods;

  useQuery(
    ["productDetail"],
    () =>
      products.getById(defaultValue?.productId as string).then((res) => {
        const product = res.data;
        // PARSE SUPLIERS
        const suppliers = JSON.parse(product?.suppliers || "[]").map(
          (supplier: any) => supplier?.id
        );

        // SPLIT IMAGE INTO AN ARRAY
        const image = product.image;

        const imageArr = image ? image.split(",") : [];

        reset({
          ...product,
          warehouseConfigCode: defaultValue?.warehouseConfigCode,
          image: imageArr,
          suppliers,
        });
      }),
    {
      enabled: Boolean(open && defaultValue?.id),
    }
  );

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
          <FormInput
            controlProps={{
              control,
              name: "warehouseConfigCode",
              rules: { required: "Phải nhập tên SP" },
            }}
            label="Mã kho lưu trữ"
            disabled={true}
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
                value="1"
              />
              <Tab
                label={<Typography>Lịch sử nhập xuất</Typography>}
                value="2"
              />
            </TabList>
          </Box>

          <FormProvider {...methods}>
            <TabPanelContainForm value="1" index={"1"}>
              <ProductManageForm />
            </TabPanelContainForm>

            <TabPanelContainForm value="2" index={"2"}>
              <ProductManageHistoryTable
                warehouseId={defaultValue?.warehouseConfigId}
                productId={defaultValue?.productId}
              />
            </TabPanelContainForm>
          </FormProvider>
        </TabContext>
        <Box className="flex justify-center">
          <BaseButton
            type="button"
            className="!bg-main-1 ml-3"
            onClick={onClose}
          >
            Đóng
          </BaseButton>
        </Box>
      </Box>
    </Dialog>
  );
};
