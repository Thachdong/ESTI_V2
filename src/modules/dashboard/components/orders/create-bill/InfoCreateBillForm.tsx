import { Paper } from "@mui/material";
import React from "react";
import { FormInput, FormSelect } from "~modules-core/components";

type TProps = {
  control: any;
};

export const InfoCreateBillForm: React.FC<TProps> = ({ control }) => {
  return (
    <div>
      <Paper className="shadow p-4 mt-4 grid grid-cols-2 gap-y-4 gap-x-8">
        <div className="font-semibold text-sm col-span-2">
          <span>THÔNG TIN CHUNG</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[20%] font-medium text-sm">
            <span>Mã đơn hàng:</span>
          </div>
          <div className="w-[80%]">
            <FormSelect
              controlProps={{
                name: "code",
                control,
              }}
              label=""
              options={[]}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[20%] font-medium text-sm">
            <span>Số hoá đơn :</span>
          </div>
          <div className="w-[80%]">
            <FormInput
              controlProps={{
                name: "code",
                control,
              }}
              label=""
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-[20%] font-medium text-sm">
            <span>Nhân viên Admin phụ trách :</span>
          </div>
          <div className="w-[80%]">
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
          <div className="w-[20%] font-medium text-sm">
            <span>Mã chi nhánh :</span>
          </div>
          <div className="w-[80%]">
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
      <div className="grid grid-cols-3 gap-4">
        <Paper className="shadow p-4 mt-4 col-span-2 grid gap-2">
          <div className="font-semibold text-sm">
            <span>THÔNG TIN CHUNG</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[15%] font-medium text-sm">
              <span>Khách hàng:</span>
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
              <span>Tên khách hàng :</span>
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
          <div className="flex items-center gap-2">
            <div className="w-[15%] font-medium text-sm">
              <span>Mã số thuế:</span>
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
        <Paper className="shadow p-4 mt-4 grid gap-2">
          <div className="font-semibold text-sm ">
            <span>THÔNG TIN LIÊN HỆ</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[20%] font-medium text-sm">
              <span>Người phụ trách:</span>
            </div>
            <div className="w-[80%]">
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
            <div className="w-[20%] font-medium text-sm">
              <span>Phòng ban :</span>
            </div>
            <div className="w-[80%]">
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
            <div className="w-[20%] font-medium text-sm">
              <span>Điện thoại :</span>
            </div>
            <div className="w-[80%]">
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
            <div className="w-[20%] font-medium text-sm">
              <span>Email:</span>
            </div>
            <div className="w-[80%]">
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
      </div>
    </div>
  );
};
