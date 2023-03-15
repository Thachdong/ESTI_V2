import { TabContext, TabList } from "@mui/lab";
import { Box, Tab, Typography } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import StarIcon from "@mui/icons-material/StarOutlineOutlined";
import { BaseButton, TabPanelContainForm } from "~modules-core/components";
import {
  ProductDetailFeedback,
  ProductDetailGeneral,
  ProductDetailWebsite,
} from "~modules-dashboard/components";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { products, TCreateProduct } from "src/api";
import { toast } from "~modules-core/toast";

export const ProductDetailPage: React.FC = () => {
  const router = useRouter();

  const { id } = router.query;

  const [tab, setTab] = useState("general");

  const methods = useForm<any>();

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newValue: string) => {
      setTab(newValue);
    },
    []
  );

  // DATA FETCHING
  const { data } = useQuery(["ProductDetail", id], () =>
    products.getById(id as string).then((res) => res.data)
  );

  // METHODS
  const mutateAdd = useMutation(
    (payload: TCreateProduct) => products.create(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        router.push("/dashboard/product-manage/products/");
      },
    }
  );
  const handleCreate = useCallback(async (data: any) => {
    const {
      categorys,
      gallery,
      productAttributes,
      suppliers,
      description,
      summary,
      videoUrl,
      specifications,
      metaTitle,
      metaDescriptions,
      metaKeyWords,
      image,
      hidePrice,
      salePrice,
      ...rest
    } = data || {};

    const updateGallery = image ? [...gallery, image] : gallery;

    const payload = {
      ...rest,
      image,
      salePrice: hidePrice ? "Giá liên hệ" : salePrice,
      productAttributes: productAttributes?.join?.(","),
      suppliers: suppliers?.join?.(","),
      productWebsiteCreate: {
        description,
        summary,
        videoUrl,
        gallery: updateGallery?.join?.(","),
        specifications,
        categorys: categorys?.join?.(","),
        metaTitle,
        metaDescriptions,
        metaKeyWords,
      },
    };

    await mutateAdd.mutateAsync(payload);
  }, []);

  return (
    <TabContext value={tab}>
      <Box className="container-center relative col-span-4">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange}>
            <Tab
              label={<Typography>Thông tin cơ bản</Typography>}
              value="general"
            />

            <Tab label={<Typography>Website</Typography>} value="website" />

            {!!id && (
              <Tab
                label={
                  <Box className="flex items-center">
                    <Typography>Đánh giá</Typography>
                    <StarIcon color="warning" />
                    <StarIcon color="warning" />
                    <StarIcon color="warning" />
                    <StarIcon color="warning" />
                    <StarIcon color="warning" />
                  </Box>
                }
                value="feedback"
              />
            )}
          </TabList>
        </Box>
        <FormProvider {...methods}>
          <Box className="tabpanel-container relative pb-4 pt-2">
            <TabPanelContainForm value="general" index={"general"}>
              <ProductDetailGeneral />
            </TabPanelContainForm>

            <TabPanelContainForm value="website" index={"website"}>
              <ProductDetailWebsite />
            </TabPanelContainForm>

            <TabPanelContainForm value="feedback" index={"feedback"}>
              <ProductDetailFeedback />
            </TabPanelContainForm>
          </Box>

          <Box className="flex justify-end">
            <BaseButton onClick={methods.handleSubmit(handleCreate)}>
              Tạo
            </BaseButton>
          </Box>
        </FormProvider>
      </Box>
    </TabContext>
  );
};
