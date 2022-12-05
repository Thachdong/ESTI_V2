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

export const WarehouseExportForm = () => {
  const { control, handleSubmit, reset } = useForm<TWarehouseExport>({
    mode: "onBlur",
  });
  return (
    <div>
      <div>
        <FormCheckbox
          label={"Xuất bỏ sản phẩm"}
          controlProps={{
            name: "ExportDelete",
            control: control,
            rules: undefined,
          }}
        />
      </div>
      <div className="bg-white w-full rounded-sm grid grid-cols-2 p-3 gap-y-2 gap-x-4 mb-4">
        <div className="col-span-2">
          <p className="m-0 text-sm font-medium">THÔNG TIN CHUNG</p>
        </div>
        <div className="flex items-center">
          <div className="w-[25%] text-sm font-semibold">
            <span>Mã đơn hàng: </span>
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
              // disabled={fa}
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
              disabled={true}
            />
          </div>
        </div>
        <div className="flex items-center">
          <div className="w-[25%] text-sm font-semibold">
            <span>Nhân viên giao nhận: </span>
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
            <span>Mã chi nhánh: </span>
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
            <span>Trạng thái xuất kho: </span>
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
        <div className="flex items-center">
          <div className="w-[25%] text-sm font-semibold">
            <span>Mã kho</span>
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
      <div className="grid grid-cols-3 gap-4">
        <div className="grid grid-cols-1 gap-2 bg-white col-span-2 p-3 rounded-sm">
          <div className="text-sm font-medium mb-3">
            <span>THÔNG TIN KHÁCH HÀNG</span>
          </div>
          <div className="flex items-center">
            <div className="w-[25%] text-sm font-semibold">
              <span>Khách hàng: </span>
            </div>
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
          </div>
          <div className="flex items-center">
            <div className="w-[25%] text-sm font-semibold">
              <span>Đ/c nhận hàng: </span>
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
          <div className="flex items-center">
            <div className="w-[25%] text-sm font-semibold">
              <span>Lĩnh vực kinh doanh</span>
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
            <span>THÔNG TIN KHÁCH HÀNG</span>
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
                  rules: { required: false },
                }}
                label=""
                disabled={true}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="w-[25%] text-sm font-semibold">
              <span>Phòng ban:</span>
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
              <span>Điện thoại</span>
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
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="grid grid-cols-2 col-span-2 gap-y-2 gap-x-4 bg-white p-4">
          <div className="col-span-2 text-sm font-medium mb-2">
            <span>THÔNG TIN NHẬN HÀNG</span>
          </div>
          <div className="flex items-center col-span-2">
            <div className="w-[25%] text-sm font-semibold">
              <span>Người nhận hàng: </span>
            </div>
            <div className="w-[25%] mr-4">
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
            <div className="flex items-center w-[50%]">
              <div className="w-[25%] text-sm font-semibold">
                <span>SĐT:</span>
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

          <div className="flex items-center col-span-2">
            <div className="w-[25%] text-sm font-semibold">
              <span>Đ/c nhận hàng:</span>
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
          <div className="flex items-center gap-2 col-span-2">
            <div className="text-sm">
              <span>
                Thông tin nhận hàng giống thông tin nhận hàng trong đơn hàng
              </span>
            </div>
            <div>
              <FormCheckbox
                label={""}
                controlProps={{
                  name: "Confirm",
                  control: control,
                  rules: { require: false },
                }}
              />
            </div>
          </div>
          <div className="flex items-center col-span-2">
            <div className="w-[25%] text-sm font-semibold">
              <span>Ngày giao dự kiến:</span>
            </div>
            <div className="w-[75%]">
              <FormDatepicker
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
          <div className="flex items-center col-span-2">
            <div className="w-[25%] text-sm font-semibold">
              <span>Chứng từ thanh toán: </span>
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
        <div className=" grid grid-cols-1 gap-2 col-span-1 bg-white p-4 rounded-sm">
          <div className="text-sm font-medium mb-2">
            <span>THÔNG TIN VẬN CHUYỂN</span>
          </div>
          <div className="flex items-center col-span-2">
            <div className="w-[25%] text-sm font-semibold">
              <span>Đơn vị v/c:</span>
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
          <div className="flex items-center col-span-2">
            <div className="w-[25%] text-sm font-semibold">
              <span>Mã vận đơn:</span>
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
          <div className="flex items-center col-span-2">
            <div className="w-[25%] text-sm font-semibold">
              <span>Số kiện hàng:</span>
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
          <div className="flex items-center col-span-2">
            <div className="w-[25%] text-sm font-semibold">
              <span>Khối lượng:</span>
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
          <div className="flex items-center col-span-2">
            <div className="w-[25%] text-sm font-semibold">
              <span>Cước phí:</span>
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
      <div className="p-4 bg-white rounded-sm mt-4">
        <div className="text-sm font-medium mb-2">
          <span>SẢN PHẨM</span>
        </div>
        <div>danh sách sản phẩm</div>
      </div>
      <div className="flex justify-end">
        <BaseButton
          type="button"
          className="bg-info my-4"
          onClick={() => console.log("Xuất kho")}
        >
          Xuất kho
        </BaseButton>
      </div>
    </div>
  );
};
