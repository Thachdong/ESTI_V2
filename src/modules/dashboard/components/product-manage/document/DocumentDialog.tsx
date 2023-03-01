import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  category,
  documentCareer,
  documentType,
  productDocument,
  products,
  TDocument,
} from "src/api";
import {
  BaseButton,
  Dialog,
  FormImageGallery,
  FormInput,
  FormSelect,
  FormSelectAsync,
  FormUploadfiles,
} from "~modules-core/components";
import { parentCategoryId } from "~modules-core/constance";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const DocumentDialog: React.FC<TDialog> = (props) => {
  // EXTRACT PROPS
  const { onClose, open, type, refetch, defaultValue } = props;

  const [isUpdate, setIsUpdate] = useState(false);

  const {
    handleSubmit,
    formState: { isDirty },
    reset,
    control,
  } = useForm<any>({
    mode: "onBlur",
  });

  const disabled = type === "View" && !isUpdate;

  // DATA FETCHING
  const { data: documentTypes } = useQuery(["DocumentType"], () =>
    documentType.getList().then((res) => res.data)
  );

  const { data: documentCareers } = useQuery(["DocumentCareer"], () =>
    documentCareer.getList().then((res) => res.data)
  );

  // SIDE EFFECTS
  useEffect(() => {
    if (type === "Add") {
      reset({});
    } else if (!!defaultValue) {
      reset({ ...defaultValue });
    }
  }, [type, defaultValue]);

  // CREATE TITLE BASE ON DIALOG TYPE
  const title =
    type === "Add" || type === "AddFromAnotherRoute"
      ? "Thêm tài liệu sản phẩm"
      : type === "View" && isUpdate
      ? "Cập nhật tài liệu sản phẩm"
      : "Thông tin tài liệu sản phẩm";

  // MUTATIONS DECLARATIONS
  const mutationAdd = useMutation(
    (payload: TDocument) => productDocument.create(payload),
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

  const handleAddDocument = async (data: any) => {
    await mutationAdd.mutateAsync(data);
  };

  const mutationUpdate = useMutation(
    (payload: TDocument) => productDocument.update(payload),
    {
      onError: (error: any) => {
        toast.error(error?.resultMessage);
      },
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch?.();
        onClose();
        setIsUpdate(false);
      },
    }
  );

  const handleUpdateCategory = async (data: any) => {
    await mutationUpdate.mutateAsync(data);
  };

  // RENDER BUTTONS BASE ON DIALOG TYPE
  const renderButtons = () => {
    switch (true) {
      case type === "Add" || type === "AddFromAnotherRoute":
        return (
          <>
            <BaseButton
              onClick={handleSubmit(handleAddDocument)}
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
      case (type === "View" || type === "ViewDocument") && isUpdate === false:
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
      case (type === "View" || type === "ViewDocument") && isUpdate === true:
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

  // DOM RENDER
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      title={title}
      headerClassName="text-center"
    >
      <Box component="form">
        <Box className="grid grid-cols-2 gap-4">
          <FormSelectAsync
            fetcher={products.getList}
            controlProps={{
              control,
              name: "productId",
              rules: { required: "Phải chọn mã SP" },
            }}
            label="Mã sản phẩm"
            disabled={disabled}
            labelKey="productCode"
          />

          <FormSelectAsync
            fetcher={products.getList}
            controlProps={{
              control,
              name: "productId",
              rules: { required: "Phải chọn tên SP" },
            }}
            label="Tên sản phẩm"
            disabled={disabled}
            labelKey="productName"
          />

          <FormSelectAsync
            fetcher={category.getList}
            fetcherParams={{ parentId: parentCategoryId }}
            controlProps={{
              control,
              name: "categoryId",
              rules: { required: "Phải chọn nhóm SP" },
            }}
            label="Nhóm SP"
            disabled={disabled}
          />

          <FormInput
            controlProps={{
              name: "lotNumber",
              control,
              rules: { required: "Phải nhập LOT#" },
            }}
            label="LOT#"
            disabled={disabled}
          />

          <FormSelect
            options={documentCareers || []}
            controlProps={{
              control,
              name: "documentCareer",
              rules: { required: "Phải chọn tài liệu chuyên ngành" },
            }}
            label="Tài liệu chuyên ngành"
            disabled={disabled}
          />

          <FormSelect
            options={documentTypes || []}
            controlProps={{
              control,
              name: "documentType",
              rules: { required: "Phải chọn kiểu tài liệu" },
            }}
            label="Kiểu tài liệu"
            disabled={disabled}
          />

          <Box
            component="fieldset"
            className="col-span-2 !border-grey-2 !rounded-[4px]"
          >
            <legend>File đính kèm *</legend>
            <FormUploadfiles
              loader={productDocument.uploadFile}
              controlProps={{ control, name: "attachFiles" }}
              title="Tải file"
              disabled={disabled}
              className="mb-3"
            />
          </Box>

          <Box
            component="fieldset"
            className="col-span-2 !border-grey-2 !rounded-[4px]"
          >
            <legend>Thumbnail *</legend>
            <FormImageGallery
              loader={productDocument.uploadFile}
              controlProps={{ control, name: "thumbnails" }}
              title="Tải ảnh"
              disabled={disabled}
              className="mb-3"
            />
          </Box>
        </Box>

        <Box className="flex justify-center items-center mt-4">
          {renderButtons()}
        </Box>
      </Box>
    </Dialog>
  );
};
