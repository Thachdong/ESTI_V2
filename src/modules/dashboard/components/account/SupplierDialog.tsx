import { TabContext, TabList } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { suppliers, TSupplier } from "src/api";
import {
  BaseButton,
  Dialog,
  FormAvatar,
  TabPanelContainForm,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";
import { CuratorInfoForm } from "./CuratorInfoForm";
import { SupplierInfoForm } from "./SupplierInfoForm";

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
  "productSupply",
  "salesAdminID",
  "deliveryID",
];

export const SupplierDialog: React.FC<TDialog> = ({
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

  const methods = useForm<TSupplier>({
    mode: "onBlur",
    shouldUnregister: false,
    reValidateMode: "onSubmit",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
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
      const productSupply = defaultValue?.productSupply || "";

      reset({...defaultValue, productSupply: productSupply.split(", ")});
    }
  }, [type, defaultValue]);

  // CREATE TITLE BASE ON DIALOG TYPE
  const title =
    type === "Add"
      ? "Tạo nhà cung cấp"
      : type === "View" && isUpdate
      ? "Cập nhật nhà cung cấp"
      : "Thông tin nhà cung cấp";

  // DIALOG MUTATION DECLARATIONS
  const mutationAdd = useMutation(
    (payload: TSupplier) => suppliers.create(payload),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();

        onClose();
      },
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
    }
  );

  const handleAddSupplier = async (payload: TSupplier) => {
    const productSupply = payload.productSupply as number[];

    await mutationAdd.mutateAsync({...payload, productSupply: productSupply?.join(", ")});
  };

  const mutateUpdate = useMutation(
    (data: TSupplier) => suppliers.update(data),
    {
      onSuccess: (data) => {
        toast.success(data.resultMessage);

        refetch?.();

        onClose();
      },
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
    }
  );

  const handleUpdateSupplier = async (data: TSupplier) => {
    const productSupply = data.productSupply as number[];

    await mutateUpdate.mutateAsync({...data, productSupply: productSupply?.join(", ")});
  };

  // RENDER BUTTONS BASE ON DIALOG TYPE
  const renderButtons = () => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton
              onClick={handleSubmit(handleAddSupplier)}
              className="w-full mb-3"
              disabled={!isDirty}
            >
              Tạo
            </BaseButton>
            <BaseButton
              type="button"
              className="w-full !bg-main-1"
              onClick={onClose}
            >
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === false:
        return (
          <>
            <BaseButton
              type="button"
              className="w-full mb-3"
              onClick={() => setIsUpdate(true)}
            >
              Cập nhật
            </BaseButton>
            <BaseButton
              type="button"
              className="w-full !bg-main-1"
              onClick={onClose}
            >
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === true:
        return (
          <>
            <BaseButton
              onClick={handleSubmit(handleUpdateSupplier)}
              className="w-full mb-3"
              disabled={!isDirty}
            >
              Cập nhật
            </BaseButton>
            <BaseButton
              type="button"
              className="w-full !bg-main-1"
              onClick={() => setIsUpdate(false)}
            >
              Quay lại
            </BaseButton>
          </>
        );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" title={title}>
      <FormProvider {...methods}>
        <Box component="form" className="grid grid-cols-5 gap-4">
          <Box className="">
            <Box className="flex justify-center mb-5">
              <FormAvatar
                controlProps={{ control, name: "avatar" }}
                label="Ảnh đại diện của nhà cung cấp"
              />
            </Box>
            <Box className="flex flex-col items-center justify-center">
              {renderButtons()}
            </Box>
          </Box>
          <TabContext value={tab}>
            <Box className="relative col-span-4">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleTabChange}>
                  <Tab
                    label={
                      <Typography
                        sx={{ color: isSupplierFieldError ? "red" : "ỉnherit" }}
                      >
                        Thông tin nhà cung cấp
                      </Typography>
                    }
                    value="1"
                  />
                  <Tab
                    label={
                      <Typography
                        sx={{ color: isCuratorFieldError ? "red" : "ỉnherit" }}
                      >
                        Thông tin người liên hệ
                      </Typography>
                    }
                    value="2"
                  />
                </TabList>
              </Box>

              <Box className="tabpanel-container relative py-4">
                <TabPanelContainForm value="1" index={"1"}>
                  <SupplierInfoForm isDisable={type === "View" && !isUpdate} />
                </TabPanelContainForm>
                <TabPanelContainForm value="2" index={"2"}>
                  <CuratorInfoForm isDisable={type === "View" && !isUpdate} />
                </TabPanelContainForm>
              </Box>
            </Box>
          </TabContext>
        </Box>
      </FormProvider>
    </Dialog>
  );
};
