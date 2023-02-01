import { TabContext, TabList } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import _ from "lodash";
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

  // SIDE EFFECTS
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
                loader={customer.uploadImage}
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
                        sx={{ color: _.isEmpty(errors) ? "inherit" : "red" }}
                      >
                        Thông tin khách hàng
                      </Typography>
                    }
                    value="1"
                  />
                  <Tab
                    label={
                      <Typography
                        sx={{ color: _.isEmpty(errors) ? "inherit" : "red" }}
                      >
                        Thông tin liên hệ
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
