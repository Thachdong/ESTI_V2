import { TabContext, TabList } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  products,
  productsWebsite,
  TProduct,
  TProductPayload,
  TProductWebsite,
  TProductWebsitePayload,
} from "src/api";
import {
  BaseButton,
  Dialog,
  TabPanelContainForm,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { ProductInfoForm } from "./ProductInfoForm";
import { WebsiteInfoForm } from "./WebsiteInfoForm";

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

  const methods = useForm<any>({ mode: "onBlur", reValidateMode: "onSubmit" });

  const {
    handleSubmit,
    formState: { isDirty, errors },
    reset,
  } = methods;

  const disabled = type === "View" && !isUpdate;

  // ERRORS CATCHING
  const errorKeys = Object.keys(errors);

  const infoFieldsError = !!errorKeys.find((err: string) =>
    infoFields.join().includes(err)
  );

  const websiteFieldsError = !!errorKeys.find((err: string) =>
    websiteFields.join().includes(err)
  );

  //  SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    }

    if (type === "View" && defaultValue) {
      const {
        suppliers = "[]",
        categorys = "[]",
        gallery = "",
        image = "",
        ...rest
      } = defaultValue;

      const parsedSuppliers = JSON.parse(suppliers).map(
        (supplier: any) => supplier.id
      );

      const parsedCategorys = JSON.parse(categorys).map(
        (category: any) => category.id
      );

      const cleanValue = {
        ...rest,
        image: image ? [image] : [],
        gallery: gallery?.split(",") || [],
        suppliers: parsedSuppliers,
        categorys: parsedCategorys,
      };
      reset(cleanValue);
    }
  }, [type, defaultValue]);

  useEffect(() => {
    websiteFieldsError && setTab("2");

    infoFieldsError && setTab("1");
  }, [websiteFieldsError, infoFieldsError]);

  // CREATE TITLE BASE ON DIALOG TYPE
  const title =
    type === "Add"
      ? "Th??m s???n ph???m"
      : type === "View" && isUpdate
      ? "C???p nh???t s???n ph???m"
      : "Th??ng tin s???n ph???m";

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

  const handleAddProduct = async (data: any) => {
    const {
      categorys = [],
      gallery = [],
      suppliers = [],
      image = [],
      description,
      summary,
      videoUrl,
      specifications,
      ...rest
    } = data || {};

    const payload: TProductPayload = {
      ...rest,
      categorys: categorys.join(","),
      suppliers: suppliers.join(","),
      image: image.join(","),
      productWebsiteCreate: {
        description,
        summary,
        videoUrl,
        gallery: gallery.join(","),
        specifications,
        categorys: categorys.join(","),
      },
    };

    await mutationAddProduct.mutateAsync(payload);
  };

  const mutationUpdateProduct = useMutation(
    (payload: TProduct) => products.update(payload),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();

        onClose();

        setIsUpdate(false);
      },
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
    }
  );

  const handleUpdateProduct = async (data: any) => {
    const {
      categorys = [],
      gallery = [],
      suppliers = [],
      image = [],
      description,
      summary,
      videoUrl,
      specifications,
      deletedProductWebsite,
      productWebSiteId,
      id,
      ...rest
    } = data || {};

    const payload: TProduct = {
      ...rest,
      categorys: categorys.join(","),
      suppliers: suppliers.join(","),
      image: image.join(","),
      id,
      productWebsiteUpdate: {
        description,
        summary,
        videoUrl,
        gallery: gallery.join(","),
        specifications,
        categorys: categorys.join(","),
        deletedProductWebsite,
        id: productWebSiteId,
        productId: id,
      },
    };

    await mutationUpdateProduct.mutateAsync(payload);
  };

  // RENDER BUTTONS BASE ON DIALOG TYPE
  const renderButtons = () => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton
              onClick={handleSubmit(handleAddProduct)}
              disabled={!isDirty}
            >
              T???o
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1 ml-3"
              onClick={onClose}
            >
              ????ng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === false:
        return (
          <>
            <BaseButton type="button" onClick={() => setIsUpdate(true)}>
              C???p nh???t
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1 ml-3"
              onClick={onClose}
            >
              ????ng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === true:
        return (
          <>
            <BaseButton
              onClick={handleSubmit(handleUpdateProduct)}
              disabled={!isDirty}
            >
              C???p nh???t
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1 ml-3"
              onClick={() => setIsUpdate(false)}
            >
              Quay l???i
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
      headerClassName="text-center"
    >
      <Box component="form">
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleTabChange}>
              <Tab
                label={
                  <Typography
                    sx={{ color: infoFieldsError ? "red" : "???nherit" }}
                  >
                    Th??ng tin s???n ph???m
                  </Typography>
                }
                value="1"
              />
              <Tab
                label={
                  <Typography
                    sx={{ color: websiteFieldsError ? "red" : "???nherit" }}
                  >
                    Th??ng tin hi???n th??? website
                  </Typography>
                }
                value="2"
              />
            </TabList>
          </Box>

          <FormProvider {...methods}>
            <TabPanelContainForm value="1" index={"1"}>
              <ProductInfoForm isDisable={disabled} />
            </TabPanelContainForm>

            <TabPanelContainForm value="2" index={"2"}>
              <WebsiteInfoForm isDisable={disabled} />
            </TabPanelContainForm>
          </FormProvider>
        </TabContext>
        <Box className="flex justify-center">{renderButtons()}</Box>
      </Box>
    </Dialog>
  );
};
