import { Paper } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { BaseButton } from "~modules-core/components";
import {
  InfoCreateSupplier,
  InfoProductSupplier,
  RulesSupplier,
} from "~modules-dashboard/components";

export const CreateSupplierPage = () => {
  const { control, handleSubmit } = useForm<any>({
    mode: "onBlur",
  });
  return (
    <div className="h-[400px] mb-4 verflow-y-auto">
      <div>
        <InfoCreateSupplier control={control} />
      </div>
      <div>
        <InfoProductSupplier control={control} />
      </div>
      <div className="mb-4">
        <RulesSupplier control={control} />
      </div>
      <div className="flex justify-end pb-4">
        <BaseButton className="bg-success">Lưu</BaseButton>
      </div>
    </div>
  );
};
