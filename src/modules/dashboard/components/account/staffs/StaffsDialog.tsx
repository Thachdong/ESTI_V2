import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { branchs, role, staff } from "src/api";
import {
  Dialog,
  FormAvatar,
  FormDatepicker,
  FormInput,
  FormInputPassword,
  FormSelect,
} from "~modules-core/components";
import { TDialog } from "~types/dialog";
import { DialogButtons } from "./DialogButtons";

export const StaffsDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  refetch,
  defaultValue,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const method = useForm<any>({
    mode: "onBlur",
  });

  const { control, reset } = method;

  const { data: branchsList } = useQuery(["branchsList"], () =>
    branchs
      .getList({ pageSize: 999, pageIndex: 1 })
      .then((res) => res.data.items)
  );

  const { data: rolesList = [] } = useQuery(["rolesList"], () =>
    role.getAll().then((res) => res.data)
  );

  const title =
    type === "Add"
      ? "Tạo nhân viên"
      : type === "View" && isUpdate
      ? "Cập nhật nhân viên"
      : "Thông tin nhân viên";

  useEffect(() => {
    if (type === "Add") {
      reset({});
    }

    if (type === "View" && defaultValue) {
      reset(defaultValue);
    }
  }, [type, defaultValue]);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="lg" title={title}>
      <FormProvider {...method}>
        <Box className="grid grid-cols-3 gap-4">
          <Box>
            <Box className="flex justify-center mb-3">
              <FormAvatar
                loader={staff.uploadAvatar}
                controlProps={{
                  control,
                  name: "avatar",
                }}
                disabled={type === "View" && !isUpdate}
              />
            </Box>

            <FormInput
              controlProps={{
                name: "username",
                control,
                rules: { required: "Phải nhập tên tài khoản" },
              }}
              label="Tên tài khoản"
              className="mb-4"
              disabled={type === "View" && !isUpdate}
            />

            {type === "Add" && (
              <>
                <FormInputPassword
                  controlProps={{
                    name: "password",
                    control,
                    rules: { required: "Phải nhập mật khẩu" },
                  }}
                  label="Mật khẩu"
                  className="mb-4"
                />

                <FormInputPassword
                  controlProps={{
                    name: "repeatPassword",
                    control,
                    rules: { required: "Nhập lại mật khẩu không khớp" },
                  }}
                  label="Nhập lại mật khẩu"
                />
              </>
            )}
          </Box>

          <Box className="col-span-2">
            <Box className="grid grid-cols-2 gap-4">
              <FormInput
                controlProps={{
                  name: "fullName",
                  control,
                  rules: { required: "Phải nhập tên nhân viên" },
                }}
                label="Tên nhân viên"
                disabled={type === "View" && !isUpdate}
              />

              <FormSelect
                controlProps={{
                  name: "branchId",
                  control,
                  rules: { required: "Phải chọn chi nhánh" },
                }}
                options={branchsList || []}
                label="Chọn chi nhánh"
                disabled={type === "View" && !isUpdate}
                getOptionLabel={(option) => option?.code}
              />

              <FormSelect
                controlProps={{
                  name: "roleCode",
                  control,
                  rules: { required: "Phải chọn chức vụ" },
                }}
                options={rolesList || []}
                label="Chọn chức vụ"
                disabled={type === "View" && !isUpdate}
                valueKey="code"
              />

              <FormDatepicker
                controlProps={{
                  name: "birthday",
                  control,
                  rules: { required: "Phải nhập ngày sinh" },
                }}
                label="Ngày sinh"
                disabled={type === "View" && !isUpdate}
              />

              <FormInput
                controlProps={{
                  name: "email",
                  control,
                  rules: { required: "Phải nhập email" },
                }}
                label="Email"
                type="email"
                disabled={type === "View" && !isUpdate}
              />

              <FormInput
                controlProps={{
                  name: "phone",
                  control,
                  rules: { required: "Phải nhập số điện thoại" },
                }}
                label="Số điện thoại"
                type="tel"
                disabled={type === "View" && !isUpdate}
              />

              <FormInput
                controlProps={{
                  name: "address",
                  control,
                  rules: { required: "Phải nhập địa chỉ" },
                }}
                label="Địa chỉ"
                className="col-span-2"
                placeholder="Địa chỉ ..."
                multiline
                minRows={3}
                disabled={type === "View" && !isUpdate}
              />
            </Box>
          </Box>
        </Box>

        <Box className="flex items-center justify-end mt-5">
          <DialogButtons
            type={type}
            isUpdate={isUpdate}
            refetch={refetch}
            onClose={onClose}
            setIsUpdate={setIsUpdate}
          />
        </Box>
      </FormProvider>
    </Dialog>
  );
};
