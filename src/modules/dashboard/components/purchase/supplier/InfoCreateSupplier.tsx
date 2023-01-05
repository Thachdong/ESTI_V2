import { Paper } from "@mui/material";
import React from "react";
import { BaseButton, FormInput, FormSelect } from "~modules-core/components";
import AddIcon from "@mui/icons-material/Add";

type TProps = {
  control: any;
};

export const InfoCreateSupplier: React.FC<TProps> = ({ control }) => {
  return (
    <div>
      <Paper className="shadow grid grid-cols-2 gap-4 p-4">
        <div className="flex items-center">
          <div className="w-[25%] font-medium text-sm">
            <span>Chi nhánh:</span>
          </div>
          <div className="w-[75%]">
            <FormSelect
              controlProps={{
                name: "code",
                control,
              }}
              options={[]}
              label=""
              className="mb-4"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[25%] font-medium text-sm">
            <span>Ngày tạo:</span>
          </div>
          <div className="w-[75%]">
            <FormInput
              controlProps={{
                name: "code",
                control,
              }}
              label=""
              required
              className="mb-4"
            />
          </div>
        </div>
      </Paper>

      <div className="grid grid-cols-3 gap-4">
        <Paper className="col-span-2 shadow grid gap-4 mt-4 p-4">
          <div className="font-medium text-base">
            <span>THÔNG TIN NHÀ CUNG CẤP</span>
          </div>
          <div className="flex items-center">
            <div className="w-[20%] font-medium text-sm">
              <span>Nhà cung cấp:</span>
            </div>
            <div className="w-[80%] flex items-center gap-4">
              <div className="w-full">
                <FormSelect
                  controlProps={{
                    name: "code",
                    control,
                  }}
                  options={[]}
                  label=""
                  className="mb-4"
                />
              </div>
              <div>
                <BaseButton className="bg-main text-white min-w-[40px] w-[40px] h-[40px]">
                  <AddIcon />
                </BaseButton>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[20%] font-medium text-sm">
              <span>Địa chỉ:</span>
            </div>
            <div className="w-[80%]">
              <FormInput
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                required
                className="mb-4"
                disabled
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[20%] font-medium text-sm">
              <span>Mã số thuế:</span>
            </div>
            <div className="w-[80%]">
              <FormInput
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                required
                className="mb-4"
                disabled
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[20%] font-medium text-sm">
              <span>Nhóm sản phẩm cung cấp:</span>
            </div>
            <div className="w-[80%]">
              <FormSelect
                controlProps={{
                  name: "code",
                  control,
                }}
                options={[]}
                label=""
                disabled
                className="mb-4"
              />
            </div>
          </div>
        </Paper>

        <Paper className=" mt-4 p-4 grid gap-4 shadow">
          <div className="font-medium text-base">
            <span>THÔNG TIN LIÊN HỆ</span>
          </div>
          <div className="flex items-center">
            <div className="w-[25%] font-medium text-sm">
              <span>Người phụ trách:</span>
            </div>
            <div className="w-[75%]">
              <FormInput
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                required
                className="mb-4"
                disabled
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[25%] font-medium text-sm">
              <span>Chức vụ:</span>
            </div>
            <div className="w-[75%]">
              <FormInput
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                required
                className="mb-4"
                disabled
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[25%] font-medium text-sm">
              <span>Điện thoại:</span>
            </div>
            <div className="w-[75%]">
              <FormInput
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                required
                className="mb-4"
                disabled
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[25%] font-medium text-sm">
              <span>Email:</span>
            </div>
            <div className="w-[75%]">
              <FormInput
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                required
                className="mb-4"
                disabled
              />
            </div>
          </div>
        </Paper>
      </div>

      <Paper className="col-span-2 shadow grid grid-cols-2 gap-4 mt-4 p-4">
        <div className="font-medium text-base col-span-2">
          <span>PHÂN CÔNG VIỆC</span>
        </div>
        <div className="flex items-center">
          <div className="w-[25%] font-medium text-sm">
            <span>Admin phụ trách:</span>
          </div>
          <div className="w-[75%]">
            <FormSelect
              controlProps={{
                name: "code",
                control,
              }}
              options={[]}
              label=""
              className="mb-4"
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[25%] font-medium text-sm">
            <span>Giao nhận phụ trách:</span>
          </div>
          <div className="w-[75%]">
            <FormSelect
              controlProps={{
                name: "code",
                control,
              }}
              options={[]}
              label=""
              className="mb-4"
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};
