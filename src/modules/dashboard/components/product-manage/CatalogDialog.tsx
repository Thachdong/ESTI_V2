import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  category,
  products,
  productsWebsite,
  TCategory,
  TProductPayload,
} from "src/api";
import {
  BaseButton,
  Dialog,
  FormImageGallery,
  FormInput,
  FormSelect,
  FormSelectAsync,
  FormTextEditor,
} from "~modules-core/components";
import { productTemplates } from "~modules-core/constance";
import { toast } from "~modules-core/toast";

export const CatalogDialog: React.FC<any> = ({
  onClose,
  open,
  type,
  refetch,
  defaultValue,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
    control,
    watch,
  } = useForm<any>({
    mode: "onBlur",
  });

  const template = watch("template");

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    }

    if (type === "View" && defaultValue) {
      const defaultCategory = {
        id: defaultValue.id,
        name: defaultValue.name,
        description: defaultValue.description,
        thumbnail: defaultValue.thumbnail?.split(", "),
        template: defaultValue.template,
        templateBanner: [defaultValue.templateBanner],
        parentId: defaultValue.parentId,
        templateProductIds: [defaultValue.templateProductIds],
        productIds: defaultValue.productIds?.split(", "),
      };

      reset(defaultCategory);
    }
  }, [type, defaultValue]);

  // CREATE TITLE BASE ON DIALOG TYPE
  const title =
    type === "Add"
      ? "Thêm danh mục sản phẩm"
      : type === "View" && isUpdate
      ? "Cập nhật danh mục sản phẩm"
      : "Thông tin danh mục sản phẩm";

  // DIALOG MUTATION DECLARATIONS
  const mutationAddCategory = useMutation(
    (payload: Omit<TCategory, "id">) => category.create(payload),
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

  const handleValidation = (payload: any) => {
    const { productIds, templateBanner, thumbnail } = payload;

    payload.thumbnail = thumbnail?.join(", ");

    if (template === 3) {
      delete payload["templateBanner"];

      payload.productIds = productIds?.join(", ");
    } else {
      delete payload["productIds"];

      payload.templateBanner = templateBanner?.[0];
    }
  };

  const handleAddCategory = async (payload: any) => {
    handleValidation(payload);

    await mutationAddCategory.mutateAsync(payload);
  };

  const mutationUpdateCategory = useMutation(
    (payload: TCategory) => category.update(payload),
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

  const handleUpdateCategory = async (payload: any) => {
    handleValidation(payload);

    await mutationUpdateCategory.mutateAsync(payload);
  };

  // RENDER BUTTONS BASE ON DIALOG TYPE
  const renderButtons = () => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton
              onClick={handleSubmit(handleAddCategory)}
              disabled={!isDirty}
            >
              Tạo
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1 ml-3"
              onClick={onClose}
            >
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === false:
        return (
          <>
            <BaseButton type="button" onClick={() => setIsUpdate(true)}>
              Cập nhật
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1 ml-3"
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
              onClick={handleSubmit(handleUpdateCategory)}
              disabled={!isDirty}
            >
              Cập nhật
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1 ml-3"
              onClick={() => setIsUpdate(false)}
            >
              Quay lại
            </BaseButton>
          </>
        );
    }
  };

  const renderTemplate = () => {
    if (template === 1 || template === 2)
      return (
        <Box
          component="fieldset"
          className="col-span-2 !border-grey-2 !rounded-[4px]"
        >
          <legend>
            Ảnh banner *{" "}
            <a href={productTemplates[template - 1].url} target="_blank" rel="noopener noreferrer">
              Xem mẫu
            </a>
          </legend>
          <FormImageGallery
            loader={category.uploadImage}
            controlProps={{ control, name: "templateBanner" }}
            title="Tải ảnh"
            disabled={type === "View" && !isUpdate}
            className="mb-3"
          />
        </Box>
      );

    if (template === 3)
      return (
        <FormSelectAsync
          fetcher={products.getList}
          controlProps={{
            control,
            name: "templateProductIds",
            rules: { required: "Phải chọn sản phẩm đại diện" },
          }}
          label="Sản phẩm đại diện"
          selectShape={{ valueKey: "id", labelKey: "productName" }}
          disabled={type === "View" && !isUpdate}
        />
      );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      title={title}
      PaperProps={{ sx: { height: "90%" } }}
      titleClassName="text-center"
    >
      <Box component="form">
        <Box className="grid grid-cols-2 gap-4">
          <FormInput
            controlProps={{
              name: "name",
              control,
              rules: { required: "Phải nhập tên danh mục" },
            }}
            label="Tên danh mục"
            required
            disabled={type === "View" && !isUpdate}
          />

          <FormSelectAsync
            fetcher={category.getList}
            controlProps={{
              control,
              name: "parentId",
              rules: { required: "Phải chọn nhóm cha" },
            }}
            label="Nhóm cha"
            selectShape={{ valueKey: "id", labelKey: "name" }}
            disabled={type === "View" && !isUpdate}
          />

          <FormSelectAsync
            fetcher={productsWebsite.getList}
            controlProps={{
              control,
              name: "productIds",
            }}
            label="Sản phẩm nổi bật"
            selectShape={{ valueKey: "id", labelKey: "title" }}
            disabled={type === "View" && !isUpdate}
            multiple={true}
          />

          <FormSelect
            options={productTemplates}
            controlProps={{
              control,
              name: "template",
              rules: { required: "Phải chọn template" },
            }}
            label="Chọn template"
            disabled={type === "View" && !isUpdate}
          />

          {renderTemplate()}

          <Box
            component="fieldset"
            className="col-span-2 !border-grey-2 !rounded-[4px]"
          >
            <legend>Thumbnail *</legend>
            <FormImageGallery
              loader={category.uploadImage}
              controlProps={{ control, name: "thumbnail" }}
              title="Tải ảnh"
              disabled={type === "View" && !isUpdate}
              className="mb-3"
            />
          </Box>

          <FormTextEditor
            controlProps={{
              name: "description",
              control: control,
              rules: { required: "Phải nhập chú thích" },
            }}
            label={"Chú thích"}
            className="col-span-2"
            editorProps={undefined}
          />
        </Box>

        <Box className="flex justify-center items-center">
          {renderButtons()}
        </Box>
      </Box>
    </Dialog>
  );
};
