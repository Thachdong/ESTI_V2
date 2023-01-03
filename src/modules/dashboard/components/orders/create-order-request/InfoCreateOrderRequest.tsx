import { InputLabel, Paper } from "@mui/material";
import React from "react";
import {
  AddButton,
  BaseButton,
  FormInput,
  FormInputBase,
  FormSelect,
} from "~modules-core/components";
import AddIcon from "@mui/icons-material/Add";
import { FormCheckbox } from "~modules-core/components/form-hooks/FormCheckbox";

type TProps = {
  control: any;
  checkConfirm: boolean;
};

export const InfoCreateOrderRequest: React.FC<TProps> = ({
  control,
  checkConfirm,
}) => {
  return (
    <div>
      <Paper className="shadow p-4 mt-4 grid grid-cols-2 gap-4">
        <div className="font-semibold text-sm col-span-2">
          <span>THÔNG TIN CHUNG</span>
        </div>
        {!checkConfirm && (
          <div className="flex items-center">
            <div className="w-[20%] font-medium text-sm">
              <span>Đơn báo giá:</span>
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
        )}

        <div className="flex items-center">
          <div className="w-[20%] font-medium text-sm">
            <span>CN thực hiện:</span>
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
      </Paper>

      <div className="grid grid-cols-3 gap-4">
        <Paper className="col-span-2 shadow p-4 mt-4 grid gap-4">
          <div className="font-semibold text-sm">
            <span>THÔNG TIN DOANH NGHIỆP</span>
          </div>
          <div className="flex items-center">
            <div className="w-[15%] font-medium text-sm">
              <span>Khách hàng:</span>
            </div>
            <div className="w-[85%] flex items-center gap-4">
              <div className="w-full">
                <FormSelect
                  controlProps={{
                    name: "code",
                    control,
                  }}
                  label=""
                  options={[]}
                  disabled
                />
              </div>
              <div>
                <BaseButton className="h-[40px] bg-main min-w-[40px] w-[40px]">
                  <AddIcon />
                </BaseButton>
              </div>
            </div>
          </div>
          <div className="flex items-center">
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
          <div className="flex items-center">
            <div className="w-[15%] font-medium text-sm">
              <span>Mã số thuế:</span>
            </div>
            <div className="w-[85%] flex items-center gap-8">
              <div className="w-[25%]">
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
              <div className="flex items-center gap-4 w-[75%]">
                <div className="font-medium text-sm whitespace-nowrap">
                  <span>Lĩnh vực KD:</span>
                </div>
                <div className="w-full">
                  <FormSelect
                    controlProps={{
                      name: "code",
                      control,
                    }}
                    label=""
                    options={[]}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[15%] font-medium text-sm">
              <span>Chi nhánh:</span>
            </div>
            <div className="w-[85%]">
              <div className="w-[25%] pr-2">
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
          </div>
        </Paper>
        <Paper className="shadow p-4 mt-4 grid gap-4">
          <div className="font-semibold text-sm">
            <span>THÔNG TIN LIÊN HỆ</span>
          </div>
          <div className="flex items-center gap-2">
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
                disabled
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[25%] font-medium text-sm">
              <span>Phòng ban:</span>
            </div>
            <div className="w-[75%]">
              <FormSelect
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                options={[]}
                disabled
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
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
                disabled
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
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
                disabled
              />
            </div>
          </div>
        </Paper>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Paper className="col-span-2 shadow p-4 mt-4 grid gap-4 grid-cols-2">
          <div className="font-semibold text-sm col-span-2 flex justify-between items-center">
            <span>THÔNG TIN NHẬN HÀNG</span>
            <span className="text-xs bg-[#f3f5f6] px-3 py-1 rounded">
              Điền thông tin bị thiếu
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-medium text-sm w-[30%]">
              <span>Họ, tên người nhận:</span>
            </div>
            <div className="w-[70%]">
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
            <div className="w-[30%] font-medium text-sm">
              <span>Số điện thoại:</span>
            </div>
            <div className="w-[70%]">
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
            <div className="w-[30%] font-medium text-sm">
              <span>Hình thức TT:</span>
            </div>
            <div className="w-[70%]">
              <FormSelect
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                disabled
                options={[]}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[30%] font-medium text-sm">
              <span>Thời hạn công nợ:</span>
            </div>
            <div className="w-[70%]">
              <FormSelect
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                disabled
                options={[]}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <div className="font-medium text-sm w-[15%]">
              <span>Đ/c nhận hàng:</span>
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
          <div className="flex items-center gap-2 col-span-2">
            <div className="text-sm">
              <span>
                Thông tin nhận hàng giống thông tin tài khoản khách hàng đăng kí
              </span>
            </div>
            <FormCheckbox
              label={""}
              controlProps={{
                name: "checkInfo",
                control: control,
                rules: undefined,
              }}
            />
          </div>
        </Paper>
        <Paper className="shadow p-4 mt-4 grid gap-4">
          <div className="font-semibold text-sm">
            <span>PHÂN CÔNG VIỆC</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[25%] font-medium text-sm">
              <span>Sales admin:</span>
            </div>
            <div className="w-[75%]">
              <FormSelect
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                options={[]}
                disabled
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[25%] font-medium text-sm">
              <span>Sales:</span>
            </div>
            <div className="w-[75%]">
              <FormSelect
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                options={[]}
                disabled
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[25%] font-medium text-sm">
              <span>Giao nhận:</span>
            </div>
            <div className="w-[75%]">
              <FormSelect
                controlProps={{
                  name: "code",
                  control,
                }}
                label=""
                options={[]}
                disabled
              />
            </div>
          </div>
        </Paper>
      </div>
      <Paper className="shadow p-4 mt-4 grid gap-4 grid-cols-2">
        <div className="">
          <div className="font-semibold text-sm mb-2">
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
        </div>
        <div className="">
          <div className="font-semibold text-sm mb-1">
            <span>YÊU CẦU BỔ SUNG</span>
          </div>
          <div>
            <FormInput
              controlProps={{
                name: "code",
                control,
              }}
              label=""
              required
              multiline
              minRows={3}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};
