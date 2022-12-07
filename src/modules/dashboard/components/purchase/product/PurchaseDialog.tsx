import { Box } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, TUnit, TWarehouseExport } from "src/api";
import {
  BaseButton,
  DataTable,
  Dialog,
  FormInput,
  FormSelect,
  FormSelectMultiple,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { TDialog } from "~types/dialog";

export const PurchaseDialog: React.FC<TDialog> = ({
  onClose,
  refetch,
  open,
  defaultValue,
  type,
}) => {
  const [pagination, setPagination] = useState(defaultPagination);
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
                console.log("Lưu")
              )}
              className="mr-2"
            >
              Lưu
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

  const columns: GridColDef<TWarehouseExport>[] = [
    {
      field: "STT",
      headerName: "STT",
    },
    { field: "branchCode", headerName: "MÃ SẢN PHẨM" },
    { field: "mainOrderCode", headerName: "MÔ TẢ" },
    { field: "warehouseSessionCode", headerName: "HÃNG SẢN XUẤT" },
    { field: "nameProduct", headerName: "QUY CÁCH" },
    { field: "count", headerName: "ĐƠN VỊ" },
    { field: "codeSupplier", headerName: "SỐ LƯỢNG" },
    { field: "status", headerName: "ĐƠN GIÁ" },
    { field: "nameSupplier", headerName: "THÀNH TIỀN" },
    { field: "note", headerName: "GHI CHÚ" },
    { field: "action", headerName: "" },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  return (
    <Dialog
      onClose={onClose}
      open={open}
      maxWidth="lg"
      title={title}
      PaperProps={{ sx: { height: "90%", textAlign: "left" } }}
    >
      <Box component="form" onSubmit={(e: any) => e.preventDefault()}>
        <div>
          <div className="font-semibold text-sm mb-2">
            <span>THÔNG TIN CHUNG</span>
          </div>
          <div className="flex items-center">
            <div className="text-sm font-medium w-[15%]">
              <span>
                Mã chi nhánh<span className="text-error">*</span> :
              </span>
            </div>
            <div className="flex items-center gap-4 w-[85%]">
              <div className="w-[40%]">
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
              <div className="flex items-center w-[60%]">
                <div className="text-sm font-medium  w-[25%]">
                  <span>Ngày tạo:</span>
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
                    }}
                    options={branchsList as []}
                    selectShape={{ valueKey: "id", labelKey: "code" }}
                    label="Chọn chi nhánh"
                    className="mb-4"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm font-medium  w-[25%]">
                  <span>Địa chỉ:</span>
                </div>
                <div className=" w-[75%]">
                  <FormInput
                    controlProps={{
                      name: "branchId",
                      control,
                    }}
                    multiline
                    minRows={3}
                    className="mb-4"
                  />
                </div>
              </div>
              <div className="flex items-center mt-12">
                <div className="text-sm font-medium  w-[25%]">
                  <span>Mã số thuế:</span>
                </div>
                <div className=" w-[75%]">
                  <FormInput
                    controlProps={{
                      name: "Code",
                      control,
                    }}
                    className="mb-4"
                    disabled={true}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm font-medium w-[25%]">
                  <span>Nhóm sản phẩm cung cấp :</span>
                </div>
                <div className=" w-[75%]">
                  <FormSelectMultiple
                    controlProps={{
                      name: "branchId",
                      control,
                    }}
                    options={branchsList as []}
                    selectShape={{ valueKey: "id", labelKey: "code" }}
                    label="Chọn chi nhánh"
                    className="mb-4"
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
                  <span>Ngừoi phụ trách :</span>
                </div>
                <div className=" w-[75%]">
                  <FormInput
                    controlProps={{
                      name: "branchId",
                      control,
                    }}
                    label=""
                    className="mb-4"
                    disabled={true}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm font-medium  w-[25%]">
                  <span>Chức vụ:</span>
                </div>
                <div className=" w-[75%]">
                  <FormSelect
                    controlProps={{
                      name: "",
                      control,
                    }}
                    options={branchsList as []}
                    selectShape={{ valueKey: "id", labelKey: "code" }}
                    label=""
                    className="mb-4"
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm font-medium w-[25%]">
                  <span>Điện thoại :</span>
                </div>
                <div className=" w-[75%]">
                  <FormInput
                    controlProps={{
                      name: "phone",
                      control,
                    }}
                    label=""
                    className="mb-4"
                    disabled={true}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm font-medium w-[25%]">
                  <span>Email:</span>
                </div>
                <div className=" w-[75%]">
                  <FormInput
                    controlProps={{
                      name: "email",
                      control,
                    }}
                    label=""
                    className="mb-4"
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="font-medium text-sm pb-2">
            <span>THÔNG TIN SẢN PHẨM</span>
          </div>
          <div>
            <DataTable
              rows={[]}
              columns={columns}
              gridProps={{
                // loading: isLoading || isFetching,
                ...paginationProps,
              }}
            />
          </div>
        </div>
        <Box className="flex items-center justify-end mt-4">
          {renderButtons()}
        </Box>
      </Box>
    </Dialog>
  );
};
