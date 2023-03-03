import { TabContext, TabList } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import _ from "lodash";
import { useState, useEffect, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
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

type TProps = TDialog & {
  onAddCallback?: (opt: any) => void;
};

export const CustomersDialog: React.FC<TProps> = ({
  onClose,
  open,
  type,
  refetch,
  defaultValue,
  onAddCallback,
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

  const { data: customerDetail } = useQuery(
    ["CustomerDetail_" + defaultValue?.id],
    () => customer.getById(defaultValue?.id).then((res) => res.data),
    {
      enabled: !!defaultValue?.id,
    }
  );

  const convertCustomerDetail = useCallback((data: any) => {
    const { companyInfo = {}, customer = {}, curatorInfo = [] } = data || {};

    return {
      companyInfoId: companyInfo.id,
      customerId: customer.id,
      branchId: customer.branchId,
      salesId: customer.salesId,
      salesAdminId: customer.salesAdminId,
      deliveryId: customer.deliveryId,
      avatar: customer.avatar,
      companyName: companyInfo.name,
      professionId: companyInfo.professionId,
      taxCode: companyInfo.taxCode,
      address: companyInfo.address,
      hotline: companyInfo.hotline,
      email: companyInfo.email,
      website: companyInfo.website,
      paymentLimit: companyInfo.paymentLimit,
      paymentType: companyInfo.paymentType,
      identityCard: companyInfo.identityCard,
      identityCardImage: !!companyInfo.identityCardImage
        ? companyInfo.identityCardImage?.split?.(",")
        : [],
      curatorCreate: curatorInfo.map((curator: any) => ({
        id: curator?.id,
        userName: curator?.userName,
        typeAccount: curator?.typeAccount,
        typeDiscount: curator?.typeDiscount,
        status: curator?.status,

        curatorName: curator?.curatorName,
        curatorDepartment: curator?.curatorDepartment,
        curatorGender: curator?.curatorGender,
        curatorAddress: curator?.curatorAddress,
        curatorPhone: curator?.curatorPhone,
        curatorEmail: curator?.curatorEmail,
        birthDay: curator?.birthDay,
        zaloNumber: curator?.zaloNumber,

        receiverId: curator?.receiverById?.id,
        receiverAddress: curator?.receiverById?.address,
        receiverEmail: curator?.receiverById?.email,
        receiverName: curator?.receiverById?.fullName,
        receiverPhone1: curator?.receiverById?.phone1,
        receiverPhone2: curator?.receiverById?.phone2,
        receiverNote: curator?.receiverById?.note,

        billId: curator?.recipientById?.id,
        billAddress: curator?.recipientById?.address,
        billEmail: curator?.recipientById?.email,
        billFullName: curator?.recipientById?.fullName,
        billPhone: curator?.recipientById?.phone,
      })),
    };
  }, []);

  // SIDE EFFECTS
  useEffect(() => {
    switch (true) {
      case type === "Add":
        reset({});
        break;
      case type === "QuickCreate" && !!defaultValue:
        reset({ ...defaultValue });
        break;
      case type === "View" && !!defaultValue:
        reset(convertCustomerDetail(customerDetail));
        break;
      default:
        break;
    }
  }, [type, defaultValue, customerDetail]);

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
        <Box component="form" className="grid grid-cols-5 gap-3">
          <Box className="">
            <Box className="flex justify-center mb-5">
              <FormAvatar
                loader={customer.uploadImage}
                controlProps={{ control, name: "avatar" }}
                label="Ảnh đại diện"
              />
            </Box>
            <Box className="flex flex-col items-center justify-center">
              <CustomersDialogButtons
                type={type}
                isUpdate={isUpdate}
                setIsUpdate={setIsUpdate}
                onClose={onClose}
                refetch={refetch}
                onAddCallback={onAddCallback}
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

              <Box className="tabpanel-container relative pb-4 pt-2">
                <TabPanelContainForm value="1" index={"1"}>
                  <CustomersInfoForm isDisable={type === "View" && !isUpdate} />
                </TabPanelContainForm>

                <TabPanelContainForm value="2" index={"2"}>
                  <CustomersReceiveInfoForm
                    isDisable={type === "View" && !isUpdate}
                    type={type || ""}
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
