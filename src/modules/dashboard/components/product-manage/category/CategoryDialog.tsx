// NOTE:
// SP NỔI BẬT VÀ SP ĐẠI DIỆN LẤY TỪ API PRODUCTWEBSITE
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { category, productsWebsite, TCategory } from "src/api";
import {
  BaseButton,
  Dialog,
  FormImageGallery,
  FormInput,
  FormSelect,
  FormSelectAsync,
  FormTextEditor,
} from "~modules-core/components";
import { parentCategoryId, productTemplates } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

// @ts-ignore
import TreeSelect from "rc-tree-select";

function groupItemsByParentId(items: any[], parentId: string | null) {
  const result: any[] = [];

  items.forEach((item) => {
    if (item.parentId === parentId) {
      const children = groupItemsByParentId(items, item.value);

      if (children.length) {
        item.children = children;
      }

      result.push(item);
    }
  });

  return result;
}

export const CategoryDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  refetch,
  defaultValue,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const [parentId, setParentId] = useState("");

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

  const disabled = type === "View" && !isUpdate;

  // DATA FETCHING
  const { data: categoryList } = useQuery(["CategoryList", type], () =>
    category
      .getList({
        pageIndex: 1,
        pageSize: 9999,
      })
      .then((res) =>
        res.data.items?.map?.((item: any) => ({
          label: item?.name,
          value: item?.id,
          parentId: item?.parentId,
        }))
      )
  );

  const categoryTree = groupItemsByParentId(
    categoryList || [],
    parentCategoryId
  );

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    }

    if (type === "View" && defaultValue) {
      const productIds = defaultValue?.productIds || "[]";

      const defaultCategory = {
        id: defaultValue.id,
        name: defaultValue.name,
        description: defaultValue.description,
        thumbnail: defaultValue.thumbnail?.split(","),
        template: defaultValue.template,
        templateBanner: [defaultValue.templateBanner],
        templateProductId: defaultValue.templateProductId,
        productIds: JSON.parse(productIds)?.map((product: any) => product?.id),
      };

      setParentId(defaultValue.parentId);

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

    payload.thumbnail = thumbnail?.join(",");

    if (template === 3) {
      delete payload["templateBanner"];

      payload.productIds = productIds?.join(",");
    } else {
      delete payload["productIds"];

      payload.templateBanner = templateBanner?.[0];
    }
  };

  const handleAddCategory = async (payload: any) => {
    handleValidation(payload);

    await mutationAddCategory.mutateAsync({ ...payload, parentId });
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

    await mutationUpdateCategory.mutateAsync({ ...payload, parentId });
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
            <a
              href={productTemplates[template - 1].url}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline text-main font-semibold text-sm bg-[#f2f7fb] px-3 py-2 rounded-full"
            >
              Xem mẫu
            </a>
          </legend>
          <FormImageGallery
            loader={category.uploadImage}
            controlProps={{ control, name: "templateBanner" }}
            title="Tải ảnh"
            disabled={disabled}
            className="mb-3"
            inputProps={{ multiple: false }}
          />
        </Box>
      );

    if (template === 3 && type !== "Add")
      return (
        <FormSelectAsync
          fetcher={productsWebsite.getList}
          fetcherParams={{ categoryId: defaultValue?.id }}
          controlProps={{
            control,
            name: "templateProductId",
            rules: { required: "Phải chọn sản phẩm đại diện" },
          }}
          label="Sản phẩm đại diện"
          disabled={disabled}
          valueKey="productId"
          labelKey="title"
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
      headerClassName="text-center"
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
            disabled={disabled}
          />

          <Box className="relative">
            <Typography className="absolute z-[99999] top-[9px] left-[12px] font-semibold text-[#504e4e]">Nhóm cha</Typography>
            <TreeSelect
              dropdownStyle={{ maxHeight: 400, overflow: "auto", zIndex: 9999 }}
              treeData={categoryTree}
              onChange={(id: string) => setParentId(id)}
            />
          </Box>

          {type !== "Add" && (
            <FormSelectAsync
              fetcher={productsWebsite.getList}
              fetcherParams={{ categoryId: defaultValue?.id }}
              controlProps={{
                control,
                name: "productIds",
              }}
              label="Sản phẩm nổi bật"
              disabled={disabled}
              multiple={true}
              labelKey="title"
              valueKey="productId"
            />
          )}

          <FormSelect
            options={productTemplates}
            controlProps={{
              control,
              name: "template",
              rules: { required: "Phải chọn template" },
            }}
            label="Chọn template"
            disabled={disabled}
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
              disabled={disabled}
              className="mb-3"
              inputProps={{ multiple: false }}
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
            editorProps={{ disabled }}
          />
        </Box>

        <Box className="flex justify-center items-center">
          {renderButtons()}
        </Box>
      </Box>
    </Dialog>
  );
};
