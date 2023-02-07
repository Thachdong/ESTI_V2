import { InputLabel, Paper } from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  AddButton,
  BaseButton,
  FormInput,
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import AddIcon from "@mui/icons-material/Add";
import { FormCheckbox } from "~modules-core/components/form-hooks/FormCheckbox";
import { TDefaultDialogState } from "~types/dialog";
import { branchs, customer, preQuote, staff } from "src/api";
import { useQuery } from "react-query";
import {
  businessAreas,
  curatorDepartments,
  paymentExpiredIn,
  paymentTypes,
} from "~modules-core/constance";
import { CustomersDialog } from "~modules-dashboard/components";

type TProps = {
  control: any;
  watch: any;
  setValue: any;
  checkConfirm: boolean;
  handelSelectPreQuoteDetail: (data: any) => void;
};

export const InfoCreateOrderRequest: React.FC<TProps> = ({
  control,
  watch,
  setValue,
  checkConfirm,
  handelSelectPreQuoteDetail,
}) => {
  const [customerId, setCustomerId] = useState<any>();

  // DIALOG METHODS
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });
  const onDialogClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  //SELLECT PREQUOTE
  const onSelectPrequote = async (data: any) => {
    if (watch()?.preQuoteCode) {
      handelSelectPreQuoteDetail(data);
      setCustomerId(data?.customerId);
    } else {
      handelSelectPreQuoteDetail(null);
      setCustomerId(null);
    }
  };

  const { data: customerDetailData } = useQuery(
    ["customerDetail", { id: customerId }],
    () =>
      customer.getById(customerId).then((res: any) => {
        const { companyInfo, curatorInfo, customer } = res.data;
        setValue("preOrder.customerId", customer?.itemModel?.id);
        setValue("preOrder.companyName", customer?.itemModel?.userName);
        setValue("preOrder.companyAddress", companyInfo?.address);
        setValue("preOrder.companyTaxCode", companyInfo?.taxCode);
        setValue("preOrder.companyEmail", companyInfo?.email);
        setValue("preOrder.hotline", companyInfo?.hotline);
        setValue("preOrder.curatorName", companyInfo?.cuartorName);
        setValue(
          "preOrder.curatorDepartmentId",
          companyInfo?.curatorDepartment
        );
        setValue("preOrder.salesId", customer?.itemModel?.salesId);
        setValue(
          "preOrder.receiverFullName",
          curatorInfo?.[0]?.receiverFullName
        );
        setValue("preOrder.receiverPhone1", curatorInfo?.[0]?.receiverPhone1);
        setValue("preOrder.receiverAddress", curatorInfo?.[0]?.receiverAddress);
        setValue("preOrder.paymentType", companyInfo?.paymentType);
        setValue("preOrder.paymentLimit", companyInfo?.paymentLimit);

        return res.data;
      }),
    {
      enabled: !!customerId,
    }
  );

  const { data: listSaleAdminData } = useQuery(["listSaleAdmin"], () =>
    staff.getListSaleAdmin().then((res) => res.data)
  );

  const { data: listSaleData } = useQuery(["listSale"], () =>
    staff.getListSale().then((res) => res.data)
  );

  const { data: listDeliveryStaffData } = useQuery(["listDeliveryStaff"], () =>
    staff.getListDeliveryStaff().then((res) => res.data)
  );

  return (
    <div>
      <Paper className="shadow-none p-4 mt-4 grid grid-cols-2 gap-x-4">
        <div className="font-bold text-sm col-span-2 mb-1">
          <span>THÔNG TIN CHUNG</span>
        </div>
        {!checkConfirm && (
          <div className="flex items-center">
            <div className="w-[100%]">
              <FormSelectAsync
                controlProps={{
                  name: "preQuoteCode",
                  control,
                }}
                label="Đơn báo giá"
                fetcher={preQuote.getList}
                labelKey="preQuoteCode"
                callback={onSelectPrequote}
              />
            </div>
          </div>
        )}

        <div className="flex items-center">
          <div className="w-[100%]">
            <FormSelectAsync
              controlProps={{
                name: "Branchs",
                control,
              }}
              label="CN thực hiện"
              labelKey="code"
              fetcher={branchs.getList}
            />
          </div>
        </div>
      </Paper>

      <div className="grid grid-cols-3 gap-4">
        <Paper className="col-span-2 shadow-none p-4 mt-4 ">
          <div className="grid gap-2">
            <div className="font-bold text-sm">
              <span>THÔNG TIN DOANH NGHIỆP</span>
            </div>
            <div className="flex items-center">
              <div className="w-[15%] font-semibold text-sm">
                <span>Khách hàng</span>
              </div>
              <div className="w-[85%] flex items-center gap-2">
                <div className="w-full">
                  <FormSelectAsync
                    controlProps={{
                      name: "customerId",
                      control,
                    }}
                    label=""
                    fetcher={customer.getList}
                    disabled={watch()?.preQuoteCode}
                    labelKey="companyName"
                    className="flex"
                    defaultOptions={[
                      {
                        companyName: customerDetailData?.companyInfo?.name,
                        id: customerDetailData?.customer?.itemModel?.id,
                      },
                    ]}
                  />
                </div>
                <div>
                  <BaseButton
                    onClick={() => setDialog({ open: true, type: "Add" })}
                    className="h-[40px] bg-main min-w-[40px] w-[40px]"
                  >
                    <AddIcon />
                  </BaseButton>
                  <CustomersDialog
                    onClose={onDialogClose}
                    open={dialog.open}
                    type={dialog.type}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[15%] font-semibold text-sm">
                <span>Địa chỉ:</span>
              </div>
              <div className="w-[85%]">
                <FormInput
                  controlProps={{
                    name: "companyAddress",
                    control,
                  }}
                  label=""
                  required
                  disabled
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[15%] font-semibold text-sm">
                <span>Mã số thuế:</span>
              </div>
              <div className="w-[85%] flex items-center gap-8">
                <div className="w-[25%]">
                  <FormInput
                    controlProps={{
                      name: "companyTaxCode",
                      control,
                    }}
                    label=""
                    required
                    disabled
                  />
                </div>
                <div className="flex items-center gap-4 w-[75%]">
                  <div className="font-semibold text-sm whitespace-nowrap">
                    <span>Lĩnh vực KD:</span>
                  </div>
                  <div className="w-full">
                    <FormSelect
                      controlProps={{
                        name: "id",
                        control,
                      }}
                      label=""
                      options={businessAreas}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-[15%] font-semibold text-sm">
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
          </div>
        </Paper>
        <Paper className="shadow-none p-4 mt-4 ">
          <div className="grid gap-2">
            <div className="font-bold text-sm">
              <span>THÔNG TIN LIÊN HỆ</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[30%] font-semibold text-sm whitespace-nowrap mr-2">
                <span>Người phụ trách:</span>
              </div>
              <div className="w-[70%]">
                <FormInput
                  controlProps={{
                    name: "curatorName",
                    control,
                  }}
                  label=""
                  required
                  disabled
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[30%] font-semibold text-sm whitespace-nowrap mr-2">
                <span>Phòng ban:</span>
              </div>
              <div className="w-[70%]">
                <FormSelect
                  controlProps={{
                    name: "curatorDepartmentId",
                    control,
                  }}
                  label=""
                  options={curatorDepartments}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[30%] font-semibold text-sm whitespace-nowrap mr-2">
                <span>Điện thoại:</span>
              </div>
              <div className="w-[70%]">
                <FormInput
                  controlProps={{
                    name: "hotline",
                    control,
                  }}
                  label=""
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[30%] font-semibold text-sm whitespace-nowrap mr-2">
                <span>Email:</span>
              </div>
              <div className="w-[70%]">
                <FormInput
                  controlProps={{
                    name: "companyEmail",
                    control,
                  }}
                  label=""
                  required
                />
              </div>
            </div>
          </div>
        </Paper>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Paper className="col-span-2 shadow-none p-4 mt-4 grid gap-2 grid-cols-2 h-fit">
          <div className="font-bold text-sm col-span-2 flex justify-between items-center">
            <span>THÔNG TIN NHẬN HÀNG</span>
            <span className="text-xs bg-[#f3f5f6] px-3 py-1 rounded">
              Điền thông tin bị thiếu
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold text-sm w-[30%]">
              <span>Họ, tên người nhận:</span>
            </div>
            <div className="w-[70%]">
              <FormInput
                controlProps={{
                  name: "receiverFullName",
                  control,
                }}
                label=""
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[30%] font-semibold text-sm">
              <span>Số điện thoại:</span>
            </div>
            <div className="w-[70%]">
              <FormInput
                controlProps={{
                  name: "receiverPhone1",
                  control,
                }}
                label=""
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[30%] font-semibold text-sm">
              <span>Hình thức TT:</span>
            </div>
            <div className="w-[70%]">
              <FormSelect
                controlProps={{
                  name: "paymentType",
                  control,
                }}
                label=""
                options={paymentTypes}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[30%] font-semibold text-sm">
              <span>Thời hạn công nợ:</span>
            </div>
            <div className="w-[70%]">
              <FormSelect
                controlProps={{
                  name: "paymentLimit",
                  control,
                }}
                label=""
                options={paymentExpiredIn}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <div className="font-semibold text-sm w-[15%]">
              <span>Đ/c nhận hàng:</span>
            </div>
            <div className="w-[85%]">
              <FormInput
                controlProps={{
                  name: "receiverAddress",
                  control,
                }}
                label=""
                required
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
        <Paper className="shadow-none p-4 mt-4 ">
          <div className="grid  gap-2">
            <div className="font-bold text-sm">
              <span>PHÂN CÔNG VIỆC</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[30%] font-semibold text-sm whitespace-nowrap mr-2">
                <span>Sales admin:</span>
              </div>
              <div className="w-[70%]">
                <FormSelect
                  options={listSaleAdminData}
                  controlProps={{
                    name: "id",
                    control,
                  }}
                  label=""
                  labelKey="fullName"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[30%] font-semibold text-sm whitespace-nowrap mr-2">
                <span>Sales:</span>
              </div>
              <div className="w-[70%]">
                <FormSelect
                  controlProps={{
                    name: "id",
                    control,
                  }}
                  label=""
                  options={listSaleData}
                  labelKey="fullName"
                  defaultValue={
                    customerDetailData?.customer?.itemModel?.salesId
                  }
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[30%] font-semibold text-sm whitespace-nowrap mr-2">
                <span>Giao nhận:</span>
              </div>
              <div className="w-[70%]">
                <FormSelect
                  controlProps={{
                    name: "id",
                    control,
                  }}
                  label=""
                  options={listDeliveryStaffData}
                  labelKey="fullName"
                />
              </div>
            </div>
          </div>
        </Paper>
      </div>
      <Paper className="shadow-none p-4 mt-4 grid gap-4 grid-cols-2">
        <div className="">
          <div className="font-bold text-sm mb-2 ">
            <span>FILE ĐÍNH KÈM</span>
          </div>
          <div>
            <AddButton variant="contained" className="">
              <InputLabel
                htmlFor="product-file"
                className="!text-[#FFF] font-semibold"
              >
                Đính kèm file
                <FormInputBase
                  id="product-file"
                  className="!hidden"
                  type="file"
                  onChange={() => undefined}
                  title="Đính kèm file"
                />
              </InputLabel>
            </AddButton>
          </div>
        </div>
        <div className="">
          <div className="font-bold text-sm mb-1">
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
