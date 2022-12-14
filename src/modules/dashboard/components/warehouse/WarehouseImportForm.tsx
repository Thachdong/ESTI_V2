import React from "react";
import { useForm } from "react-hook-form";
import { TWarehouseExport } from "src/api";
import {
  BaseButton,
  FormDatepicker,
  FormInput,
  FormSelect,
} from "~modules-core/components";
import { FormCheckbox } from "~modules-core/components/form-hooks/FormCheckbox";
import AddIcon from "@mui/icons-material/Add";

export const WarehouseImportForm: React.FC<{
  control: any;
  checkExport: boolean;
}> = ({ control, checkExport }) => {
  return (
    <div>
      <div className="bg-white w-full rounded-sm grid grid-cols-2 p-3 gap-y-2 gap-x-4 mb-4">
        <div className="col-span-2">
          <p className="m-0 text-sm font-medium">THÔNG TIN CHUNG</p>
        </div>
        {!checkExport && (
          <>
            <div className="flex items-center">
              <div className="w-[25%] text-sm font-semibold">
                <span>Đơn mua hàng: </span>
              </div>
              <div className="w-[75%]">
                <FormSelect
                  options={[]}
                  controlProps={{
                    control,
                    name: "saleAdminId",
                    rules: { required: true },
                  }}
                  label=""
                  // disabled={fa}
                />
              </div>
            </div>
          </>
        )}

        <div className="flex items-center">
          <div className="w-[25%] text-sm font-semibold">
            <span>Mã chi nhánh: </span>
          </div>
          <div className="w-[75%]">
            <FormSelect
              options={[]}
              controlProps={{
                control,
                name: "saleAdminId",
                rules: { required: true },
              }}
              label=""
              // disabled={fa}
            />
          </div>
        </div>
        {!checkExport && (
          <>
            <div className="flex items-center">
              <div className="w-[25%] text-sm font-semibold">
                <span>Admin phụ trách: </span>
              </div>
              <div className="w-[75%]">
                <FormSelect
                  options={[]}
                  controlProps={{
                    control,
                    name: "saleAdminId",
                    rules: { required: false },
                  }}
                  label=""
                  disabled={true}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[25%] text-sm font-semibold">
                <span>Ngày tạo: </span>
              </div>
              <div className="w-[75%]">
                <FormInput
                  controlProps={{
                    control,
                    name: "created",
                    rules: { required: false },
                  }}
                  label=""
                  value={"dd/mm/yyyy"}
                  disabled={true}
                />
              </div>
            </div>
          </>
        )}

        <div className="flex items-center">
          <div className="w-[25%] text-sm font-semibold">
            <span>Giao nhận phụ trách: </span>
          </div>
          <div className="w-[75%]">
            <FormSelect
              options={[]}
              controlProps={{
                control,
                name: "saleAdminId",
                rules: { required: false },
              }}
              label=""
              disabled={true}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[25%] text-sm font-semibold">
            <span>Mã kho</span>
          </div>
          <div className="w-[75%]">
            <FormInput
              controlProps={{
                control,
                name: "created",
                rules: { required: true },
              }}
              label=""
              disabled={true}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[25%] text-sm font-semibold">
            <span>Trạng thái hoá đơn: </span>
          </div>
          <div className="w-[75%]">
            <FormSelect
              options={[]}
              controlProps={{
                control,
                name: "saleAdminId",
                rules: { required: false },
              }}
              label=""
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="grid grid-cols-1 gap-2 bg-white col-span-2 p-3 rounded-sm">
          <div className="text-sm font-medium mb-3">
            <span>THÔNG TIN NHÀ CUNG CẤP</span>
          </div>
          <div className="flex items-center">
            <div className="w-[25%] text-sm font-semibold">
              <span>Nhà cung cấp: </span>
            </div>
            {(checkExport && (
              <div className="flex items-center w-[75%] gap-2">
                <div className="w-full">
                  <FormSelect
                    options={[]}
                    controlProps={{
                      control,
                      name: "saleAdminId",
                      rules: { required: false },
                    }}
                    label=""
                    placeholder="Select..."
                  />
                </div>
                <div className="">
                  <BaseButton className="bg-main text-white rounded-md !w-[40px] !min-w-[35px] !h-[40px]">
                    <AddIcon />
                  </BaseButton>
                </div>
              </div>
            )) || (
              <>
                <div className="w-[25%] text-sm font-semibold pr-4">
                  <FormInput
                    controlProps={{
                      control,
                      name: "customerCode",
                      rules: { required: false },
                    }}
                    label=""
                    disabled={true}
                  />
                </div>
                <div className="w-[50%]">
                  <FormInput
                    controlProps={{
                      control,
                      name: "customerName",
                      rules: { required: false },
                    }}
                    label=""
                    disabled={true}
                  />
                </div>
              </>
            )}
          </div>
          <div className="flex items-center">
            <div className="w-[25%] text-sm font-semibold">
              <span>Địa chỉ: </span>
            </div>
            <div className="w-[75%]">
              <FormInput
                controlProps={{
                  control,
                  name: "created",
                  rules: { required: false },
                }}
                label=""
                disabled={true}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[25%] text-sm font-semibold">
              <span>Mã số thuế:</span>
            </div>
            <div className="w-[75%]">
              <FormInput
                controlProps={{
                  control,
                  name: "created",
                  rules: { required: false },
                }}
                label=""
                disabled={true}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 bg-white col-span-1 p-3 rounded-sm">
          <div className="text-sm font-medium">
            <span>THÔNG TIN LIÊN HỆ</span>
          </div>
          <div className="flex items-center">
            <div className="w-[25%] text-sm font-semibold">
              <span>Người phụ trách:</span>
            </div>
            <div className="w-[75%]">
              <FormInput
                controlProps={{
                  control,
                  name: "created",
                  rules: { required: true },
                }}
                label=""
                disabled={true}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[25%] text-sm font-semibold">
              <span>Điện thoại:</span>
            </div>
            <div className="w-[75%]">
              <FormInput
                controlProps={{
                  control,
                  name: "created",
                  rules: { required: true },
                }}
                label=""
                disabled={true}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[25%] text-sm font-semibold">
              <span>Email:</span>
            </div>
            <div className="w-[75%]">
              <FormInput
                controlProps={{
                  control,
                  name: "created",
                  rules: { required: false },
                }}
                label=""
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
