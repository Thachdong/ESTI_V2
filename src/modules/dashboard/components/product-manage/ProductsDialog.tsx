import { TabContext, TabList } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  products,
  productsWebsite,
  suppliers,
  TProductPayload,
  TProductWebsitePayload,
  TSupplier,
} from "src/api";
import {
  BaseButton,
  Dialog,
  TabPanelContainForm,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { ProductInfoForm } from "./ProductInfoForm";
import { WebsiteInfoForm } from "./WebsiteInfoForm";

type THookForm = TProductPayload &
  TProductWebsitePayload & {
    gallery: string[];
    categorys: string[];
  };

const infoFields = [
  "productName",
  "productCode",
  "manufactor",
  "origin",
  "specs",
  "unitId",
  "image",
  "suppliers",
  "productGroup",
  "casCode",
  "chemicalName",
];

const websiteFields = [
  "description",
  "summary",
  "videoUrl",
  "gallery",
  "specifications",
  "documents",
  "categorys",
];

export const ProductsDialog: React.FC<any> = ({
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

  const methods = useForm<THookForm>({
    mode: "onBlur",
    shouldUnregister: false,
    reValidateMode: "onSubmit",
  });

  const {
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = methods;

  // ERRORS CATCHING
  const errorKeys = Object.keys(errors);

  const infoFieldsError = !!errorKeys.find((err: string) =>
    infoFields.join().includes(err)
  );

  const websiteFieldsError = !!errorKeys.find((err: string) =>
    websiteFields.join().includes(err)
  );

  //   SIDE EFFECTS
  useEffect(() => {
    websiteFieldsError && setTab("2");

    infoFieldsError && setTab("1");
  }, [websiteFieldsError, infoFieldsError]);

  // useEffect(() => {
  //   if (type === "Add") {
  //     reset({});
  //   }

  //   if (type === "View" && defaultValue) {
  //     const productSupply = defaultValue?.productSupply || "";

  //     reset({ ...defaultValue, productSupply: productSupply.split(", ") });
  //   }
  // }, [type, defaultValue]);

  // CREATE TITLE BASE ON DIALOG TYPE
  const title =
    type === "Add"
      ? "Thêm sản phẩm"
      : type === "View" && isUpdate
      ? "Cập nhật sản phẩm"
      : "Thông tin sản phẩm";

  // DIALOG MUTATION DECLARATIONS
  const mutationAddProduct = useMutation(
    (payload: TProductPayload) => products.create(payload),
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

  const mutationAddProductWebsite = useMutation(
    (payload: TProductWebsitePayload) => productsWebsite.create(payload),
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

  const handleAddProduct = async (payload: THookForm) => {
    // CREATE PRODUCT
    const productPayload: Partial<TProductPayload> = {};

    infoFields.map((field) => {
      productPayload[field as keyof TProductPayload] =
        payload[field as keyof THookForm];
    });

    const productId = await mutationAddProduct
      .mutateAsync(productPayload as TProductPayload)
      .then((res) => res.data);

    // CREATE PRODUCT WEBSITE
    const websitePayload: Partial<TProductWebsitePayload> = {
      productId,
    };

    websiteFields.map((field) => {
      websitePayload[field as keyof TProductWebsitePayload] =
        payload[field as keyof THookForm];
    });

    const gallery = payload.gallery?.join(", ");
    const categorys = payload.categorys?.join(", ");

    await mutationAddProductWebsite.mutateAsync({
      ...websitePayload,
      gallery,
      categorys,
    } as TProductWebsitePayload);
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

    await mutateUpdate.mutateAsync({
      ...data,
      productSupply: productSupply?.join(", "),
    });
  };

  // RENDER BUTTONS BASE ON DIALOG TYPE
  const renderButtons = () => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton
              onClick={handleSubmit(handleAddProduct)}
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
              // onClick={handleSubmit(handleUpdateSupplier)}
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
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      title={title}
      PaperProps={{ sx: { height: "90%" } }}
    >
      <FormProvider {...methods}>
        <Box component="form" className="grid grid-cols-5 gap-4">
          <Box className="flex flex-col items-center justify-center mt-4">
            {renderButtons()}
          </Box>

          <TabContext value={tab}>
            <Box className="relative col-span-4">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleTabChange}>
                  <Tab
                    label={
                      <Typography
                        sx={{ color: infoFieldsError ? "red" : "ỉnherit" }}
                      >
                        Thông tin sản phẩm
                      </Typography>
                    }
                    value="1"
                  />
                  <Tab
                    label={
                      <Typography
                        sx={{ color: websiteFieldsError ? "red" : "ỉnherit" }}
                      >
                        Thông tin hiển thị website
                      </Typography>
                    }
                    value="2"
                  />
                </TabList>
              </Box>

              <Box className="tabpanel-container relative py-4">
                <TabPanelContainForm value="1" index={"1"}>
                  <ProductInfoForm isDisable={type === "View" && !isUpdate} />
                </TabPanelContainForm>

                <TabPanelContainForm value="2" index={"2"}>
                  <WebsiteInfoForm isDisable={type === "View" && !isUpdate} />
                </TabPanelContainForm>
              </Box>
            </Box>
          </TabContext>
        </Box>
      </FormProvider>
    </Dialog>
  );
};
