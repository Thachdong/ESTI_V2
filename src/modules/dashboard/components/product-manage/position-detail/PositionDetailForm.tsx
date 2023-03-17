import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import {
  position,
  TCreatePosition,
  TUpdatePosition,
  warehouseConfig,
} from "src/api";
import {
  BaseButton,
  FormInput,
  FormInputNumber,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import {
  materialTypes,
  storageCondition,
  storageProductType,
} from "~modules-core/constance";
import { toast } from "~modules-core/toast";

export const PositionDetailForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<any>({
    mode: "onBlur",
  });

  const [isUpdate, setIsUpdate] = useState(false);

  const router = useRouter();

  const { id } = router.query;

  const disabled = !!id && !isUpdate;

  //DATA FETCHING
  const { data: positionDetail, refetch } = useQuery(
    ["PositionDetail", id],
    () => position.getById(id as string).then((res) => res.data),
    {
      enabled: !!id,
    }
  );

  // METHODS
  const mutateAdd = useMutation(
    (data: TCreatePosition) => position.create(data),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        router.push("/dashboard/product-manage/storage/");
      },
    }
  );

  const handleAddPosition = useCallback(async (data: TCreatePosition) => {
    await mutateAdd.mutateAsync(data);
  }, []);

  const mutateUpdate = useMutation(
    (data: TUpdatePosition) => position.update(data),
    {
      onSuccess: (data) => {
        toast.success(data?.resultMessage);

        refetch();

        setIsUpdate(false);
      },
    }
  );

  const handleUpdatePosition = useCallback(async (data: any) => {
    await mutateUpdate.mutateAsync(data);
  }, []);

  const triggerUpdate = useCallback(() => {
    setIsUpdate(true);
  }, []);

  const reverseUpdate = useCallback(() => {
    setIsUpdate(false);
    // refetch();
  }, []);

  const renderButtons = useCallback(() => {
    switch (true) {
      case !id:
        return (
          <BaseButton onClick={handleSubmit(handleAddPosition)}>Tạo</BaseButton>
        );
      case !!id && !isUpdate:
        return <BaseButton onClick={triggerUpdate}>Cập nhật</BaseButton>;
      case !!id && isUpdate:
        return (
          <>
            <BaseButton
              disabled={!isDirty}
              onClick={handleSubmit(handleUpdatePosition)}
            >
              Cập nhật
            </BaseButton>

            <BaseButton onClick={reverseUpdate} className="bg-main-1 ml-4">
              Hủy
            </BaseButton>
          </>
        );
    }
  }, [id, isUpdate, isDirty]);

  // SIDE EFFECTS
  useEffect(() => {
    if (!!positionDetail) {
      console.log(positionDetail);
      const {
        id,
        warehouseConfigID,
        positionName,
        positionSize,
        volume,
        positionMaxSlot,
        mass,
        productMaterial,
        storageConditions,
        note,
        productType,
      } = positionDetail || {};

      reset({
        id,
        warehouseConfigID,
        positionName,
        positionSize,
        volume,
        positionMaxSlot,
        mass,
        productMaterial,
        storageConditions,
        note,
        productType,
      });
    }
  }, [positionDetail]);

  return (
    <Box className="mb-4">
      <Typography className="font-bold uppercase mb-3 text-sm">
        Thông tin vị trí
      </Typography>

      <Box component="form" className="grid grid-cols-2 gap-4 bg-white p-4">
        <FormSelectAsync
          fetcher={warehouseConfig.getList}
          controlProps={{
            control,
            name: "warehouseConfigID",
            rules: { required: "Phải chọn kho" },
          }}
          label="Kho"
          labelKey="code"
          disabled={disabled}
        />

        <FormInput
          controlProps={{
            name: "positionName",
            control,
            rules: { required: "Phải nhập tên vị trí" },
          }}
          label="Tên vị trí"
          disabled={disabled}
        />

        <FormInput
          controlProps={{
            name: "positionSize",
            control,
            rules: { required: "Phải nhập kích thước D x R x C" },
          }}
          label="Kích thước D x R x C"
          disabled={disabled}
        />

        <FormInput
          controlProps={{
            name: "volume",
            control,
          }}
          label="Thế tích"
          disabled={disabled}
        />

        <FormInputNumber
          controlProps={{
            name: "positionMaxSlot",
            control,
          }}
          label="Số lượng có thể chứa"
          disabled={disabled}
        />

        <FormInput
          controlProps={{
            name: "mass",
            control,
          }}
          label="Khối lượng"
          disabled={disabled}
        />

        <FormSelect
          controlProps={{
            name: "productMaterial",
            control,
          }}
          options={materialTypes}
          label="Chất liệu sản phẩm"
          valueKey="value"
          labelKey="label"
          disabled={disabled}
        />

        <FormSelect
          controlProps={{
            name: "productType",
            control,
          }}
          options={storageProductType}
          label="Loại sản phẩm"
          valueKey="value"
          labelKey="label"
          disabled={disabled}
        />

        <FormSelect
          controlProps={{
            name: "storageConditions",
            control,
          }}
          options={storageCondition}
          label="Điều kiện lưu trữ"
          valueKey="value"
          labelKey="label"
          disabled={disabled}
        />

        <FormInput
          controlProps={{
            name: "note",
            control,
          }}
          label="Mô tả vị trí kho"
          multiline
          minRows={3}
          disabled={disabled}
        />

        <Box className="flex justify-end col-span-2">{renderButtons()}</Box>
      </Box>
    </Box>
  );
};
