import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, TUnit } from "src/api";
import {
  BaseButton,
  Dialog,
  FormInput,
  FormSelect,
} from "~modules-core/components";
import { TDialog } from "~types/dialog";

export const PurchaseDialog: React.FC<TDialog> = ({
  onClose,
  refetch,
  open,
  defaultValue,
  type,
}) => {
  const { control, handleSubmit, reset } = useForm<TUnit>({
    mode: "onBlur",
  });

  const [isUpdate, setIsUpdate] = useState(false);
  const { data: branchsList } = useQuery(["BranchsList"], () =>
    branchs
      .getList({ pageSize: 999, pageIndex: 1 })
      .then((res) => res.data.items)
  );

  const title =
    type === "Add"
      ? "Tạo mới sản phẩm cần mua"
      : type === "View" && isUpdate
      ? "Cập nhật sản phẩm cần mua"
      : "Thông tin sản phẩm cần mua";

  const renderButtons = () => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton
              onClick={handleSubmit((data: Pick<TUnit, "unitName">) =>
                // mutationAdd.mutateAsync(data)
                console.log("tạo")
              )}
              className="mr-2"
            >
              Tạo
            </BaseButton>
            <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === false:
        return (
          <>
            <BaseButton
              type="button"
              className="mr-2"
              onClick={() => setIsUpdate(true)}
            >
              Cập nhật
            </BaseButton>
            <BaseButton type="button" className="!bg-main-1" onClick={onClose}>
              Đóng
            </BaseButton>
          </>
        );
      case type === "View" && isUpdate === true:
        return (
          <>
            <BaseButton
              onClick={handleSubmit((data) => console.log("cập nhật"))}
              className="mr-2"
            >
              Cập nhật
            </BaseButton>
            <BaseButton
              type="button"
              className="!bg-main-1"
              onClick={() => setIsUpdate(false)}
            >
              Quay lại
            </BaseButton>
          </>
        );
    }
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="lg"
      title={title}
      PaperProps={{ sx: { height: "90%", textAlign: "left" } }}
    >
      <div>
        <div className="font-semibold text-sm mb-2">
          <span>THÔNG TIN CHUNG</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <div className="text-sm font-medium w-[25%]">
              <span>
                Mã chi nhánh<span className="text-error">*</span> :
              </span>
            </div>
            <div className=" w-[75%]">
              <FormSelect
                controlProps={{
                  name: "branchId",
                  control,
                  //   rules: { required: "Phải nhập số vị trí" },
                }}
                options={branchsList as []}
                selectShape={{ valueKey: "id", labelKey: "code" }}
                label="Chọn chi nhánh"
                className="mb-4"
                // disabled={type === "View" && !isUpdate}
              />
            </div>
          </div>
          <div className="flex items-center">
            <div className="text-sm font-medium  w-[25%]">
              <span>Ngày tạo</span>
            </div>
            <div className=" w-[75%]">
              <FormInput
                controlProps={{
                  name: "branchId",
                  control,
                  //   rules: { required: "Phải nhập số vị trí" },
                }}
                label="dd/mm/yyyy"
                className="mb-4"
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3">
          <div className="font-semibold text-sm mt-6 mb-2">
            <span>THÔNG TIN NHÀ CUNG CẤP</span>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center">
              <div className="text-sm font-medium w-[25%]">
                <span>
                  Nhà cung cấp<span className="text-error"> *</span> :
                </span>
              </div>
              <div className=" w-[75%]">
                <FormSelect
                  controlProps={{
                    name: "branchId",
                    control,
                    // rules: { required: "Phải nhập số vị trí" },
                  }}
                  options={branchsList as []}
                  selectShape={{ valueKey: "id", labelKey: "code" }}
                  label="Chọn chi nhánh"
                  className="mb-4"
                  // disabled={type === "View" && !isUpdate}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium  w-[25%]">
                <span>Ngày tạo</span>
              </div>
              <div className=" w-[75%]">
                <FormInput
                  controlProps={{
                    name: "branchId",
                    control,
                    // rules: { required: "Phải nhập số vị trí" },
                  }}
                  multiline
                  minRows={3}
                  className="mb-4"
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">
          <div className="font-semibold text-sm mt-6 mb-2">
            <span>THÔNG TIN NHÀ CUNG CẤP</span>
          </div>
          <div className="grid gap-4">
            <div className="flex items-center">
              <div className="text-sm font-medium w-[25%]">
                <span>
                  Mã chi nhánh<span className="text-error"> *</span> :
                </span>
              </div>
              <div className=" w-[75%]">
                <FormSelect
                  controlProps={{
                    name: "branchId",
                    control,
                    // rules: { required: "Phải nhập số vị trí" },
                  }}
                  options={branchsList as []}
                  selectShape={{ valueKey: "id", labelKey: "code" }}
                  label="Chọn chi nhánh"
                  className="mb-4"
                  // disabled={type === "View" && !isUpdate}
                />
              </div>
            </div>
            <div className="flex items-center">
              <div className="text-sm font-medium  w-[25%]">
                <span>Ngày tạo</span>
              </div>
              <div className=" w-[75%]">
                <FormInput
                  controlProps={{
                    name: "branchId",
                    control,
                    rules: { required: "Phải nhập số vị trí" },
                  }}
                  label="dd/mm/yyyy"
                  className="mb-4"
                  disabled={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};
