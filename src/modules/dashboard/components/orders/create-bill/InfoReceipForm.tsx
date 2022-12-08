import { InputLabel, Paper } from "@mui/material";
import React from "react";
import { AddButton, FormInput, FormInputBase } from "~modules-core/components";

type TProps = {
  control: any;
};

export const InfoReceipForm: React.FC<TProps> = ({ control }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Paper className="shadow p-4 mt-4">
        <div className="font-medium mb-2 text-sm">
          <span>THÔNG TIN NHẬN HOÁ ĐƠN</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[15%] font-medium text-sm">
            <span>Người nhận:</span>
          </div>
          <div className="w-[85%]">
            <FormInput
              controlProps={{
                name: "code",
                control,
              }}
              label=""
              required
              disabled
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[15%] font-medium text-sm">
            <span>Số điện thoại:</span>
          </div>
          <div className="w-[85%]">
            <FormInput
              controlProps={{
                name: "code",
                control,
              }}
              label=""
              required
              disabled
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[15%] font-medium text-sm">
            <span>Email:</span>
          </div>
          <div className="w-[85%]">
            <FormInput
              controlProps={{
                name: "code",
                control,
              }}
              label=""
              required
              disabled
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[15%] font-medium text-sm">
            <span>Địa chỉ:</span>
          </div>
          <div className="w-[85%]">
            <FormInput
              controlProps={{
                name: "code",
                control,
              }}
              label=""
              required
              disabled
            />
          </div>
        </div>
      </Paper>
      <Paper className="shadow p-4 mt-4">
        <div className="font-medium text-sm mb-4">
          <span>FILE ĐÍNH KÈM</span>
        </div>
        <div>
          <AddButton variant="contained" className="mr-3">
            <InputLabel htmlFor="product-file" className="text-white">
              Đính kèm file
              <FormInputBase
                id="product-file"
                className="hidden"
                type="file"
                onChange={() => undefined}
              />
            </InputLabel>
          </AddButton>
        </div>
      </Paper>
    </div>
  );
};
