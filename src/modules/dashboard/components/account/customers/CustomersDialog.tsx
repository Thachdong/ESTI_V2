import { TabContext, TabList } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { customer } from "src/api";
import {
  Dialog,
  FormAvatar,
  TabPanelContainForm,
} from "~modules-core/components";
import { TDialog } from "~types/dialog";
import { CustomersDialogButtons } from "./CustomersDialogButtons";
import { CustomersInfoForm } from "./CustomersInfoForm";
import { CustomersReceiveInfoForm } from "./CustomersReceiveInfoForm";

const curatorFields = [
  "curatorPosition",
  "curatorPhone",
  "curatorName",
  "curatorGender",
  "curatorAddress",
  "curatorEmail",
];

const supplierFields = [
  "supplierName",
  "address",
  "paymentLimit",
  "phone",
  "avatar",
  "taxCode",
  "paymentType",
  "cardOwner",
  "bankName",
  "cardNumber",
  "professionId",
  "salesAdminID",
  "deliveryID",
];

export const CustomersDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  refetch,
  defaultValue,
}) => {
  const [tab, setTab] = useState("1");

  const [isUpdate, setIsUpdate] = useState(false);

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  const methods = useForm({
    mode: "onBlur",
    shouldUnregister: false,
    reValidateMode: "onSubmit",
  });

  const {
    control,
    formState: { errors },
    reset,
  } = methods;

  // ERRORS CATCHING
  const errorKeys = Object.keys(errors);

  const isCuratorFieldError = !!errorKeys.find((err: string) =>
    curatorFields.join().includes(err)
  );

  const isSupplierFieldError = !!errorKeys.find((err: string) =>
    supplierFields.join().includes(err)
  );

  // SIDE EFFECTS
  useEffect(() => {
    isCuratorFieldError && setTab("2");

    isSupplierFieldError && setTab("1");
  }, [isCuratorFieldError, isSupplierFieldError]);

  useEffect(() => {
    if (type === "Add") {
      reset({});
    }

    if (type === "View" && defaultValue) {
      reset({ ...defaultValue });
    }
  }, [type, defaultValue]);

  // CREATE TITLE BASE ON DIALOG TYPE
  const title =
    type === "Add"
      ? "Tạo khách hàng"
      : type === "View" && isUpdate
      ? "Cập nhật khách hàng"
      : "Thông tin khách hàng";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      title={title}
      PaperProps={{ sx: { height: "100%" } }}
    >
      <FormProvider {...methods}>
        <Box component="form" className="grid grid-cols-5 gap-4">
          <Box className="">
            <Box className="flex justify-center mb-5">
              <FormAvatar
                loader={customer.uploadAvatar}
                controlProps={{ control, name: "avatar" }}
                label="Ảnh đại diện của nhà cung cấp"
              />
            </Box>
            <Box className="flex flex-col items-center justify-center">
              <CustomersDialogButtons
                type={type}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
                onClose={onClose}
                refetch={refetch}
              />
            </Box>
          </Box>
          <TabContext value={tab}>
            <Box className="relative col-span-4">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleTabChange}>
                  <Tab
                    label={
                      <Typography
                        sx={{ color: isSupplierFieldError ? "red" : "inherit" }}
                      >
                        Thông tin khách hàng
                      </Typography>
                    }
                    value="1"
                  />
                  <Tab
                    label={
                      <Typography
                        sx={{ color: isCuratorFieldError ? "red" : "ỉnherit" }}
                      >
                        Thông tin nhận hàng
                      </Typography>
                    }
                    value="2"
                  />
                </TabList>
              </Box>

              <Box className="tabpanel-container relative py-4">
                <TabPanelContainForm value="1" index={"1"}>
                  <CustomersInfoForm isDisable={type === "View" && !isUpdate} />
                </TabPanelContainForm>
                <TabPanelContainForm value="2" index={"2"}>
                  <CustomersReceiveInfoForm
                    isDisable={type === "View" && !isUpdate}
                  />
                </TabPanelContainForm>
              </Box>
            </Box>
          </TabContext>
        </Box>
      </FormProvider>
    </Dialog>
  );
};
