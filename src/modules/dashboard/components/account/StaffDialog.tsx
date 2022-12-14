import { Box } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { branchs, role, staff, TStaff } from "src/api";
import {
  BaseButton,
  Dialog,
  FormAvatar,
  FormDatepicker,
  FormInput,
  FormInputPassword,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { FormSelectAsyncBase } from "~modules-core/components/form-bases/FormSelectAsyncBase";
import { toast } from "~modules-core/toast";
import { TDialog } from "~types/dialog";

export const StaffDialog: React.FC<TDialog> = ({
  onClose,
  open,
  type,
  refetch,
  defaultValue,
}) => {
  const [isUpdate, setIsUpdate] = useState(false);

  const { control, handleSubmit, reset, setError, watch } = useForm<TStaff>({
    mode: "onBlur",
  });

  const { data: branchsList } = useQuery(["branchsList"], () =>
    branchs
      .getList({ pageSize: 999, pageIndex: 1 })
      .then((res) => res.data.items)
  );

  const { data: rolesList } = useQuery(["rolesList"], () =>
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

  const mutateAdd = useMutation((data: TStaff) => staff.createStaff(data), {
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch?.();

      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
  });

  const mutateUpdate = useMutation((data: TStaff) => staff.updateStaff(data), {
    onSuccess: (data) => {
      toast.success(data.resultMessage);

      refetch?.();

      onClose();
    },
    onError: (error: any) => {
      toast.error(error?.resultMessage);
    },
  });

  const handleAddStaff = async (data: TStaff) => {
    const { password, repeatPassword, birthday } = data;

    if (password !== repeatPassword) {
      setError("repeatPassword", {
        type: "repeatPassword",
        message: "Mật khẩu không khớp",
      });
      return;
    }

    const momentBirthday = moment(birthday);

    if (momentBirthday.isAfter(moment())) {
      setError("birthday", {
        type: "birthday",
        message: "Ngày sinh không hợp lệ!",
      });
      return;
    }

    await mutateAdd.mutateAsync({
      ...data,
      birthday: momentBirthday.valueOf(),
    });
  };

  const handleUpdateStaff = async (data: TStaff) => {
    const { birthday } = data;

    const momentBirthday = moment(birthday);

    if (momentBirthday.isAfter(moment())) {
      setError("birthday", {
        type: "birthday",
        message: "Ngày sinh không hợp lệ!",
      });
      return;
    }

    await mutateUpdate.mutateAsync({
      ...data,
      birthday: momentBirthday.valueOf(),
    });
  };

  const renderButtons = () => {
    switch (true) {
      case type === "Add":
        return (
          <>
            <BaseButton
              onClick={handleSubmit((data) => {
                console.log("....");

                handleAddStaff(data);
              })}
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
              onClick={handleSubmit(handleUpdateStaff)}
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
    <Dialog onClose={onClose} open={open} maxWidth="lg" title={title}>
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
              selectShape={{ valueKey: "id", labelKey: "code" }}
              label="Chọn chi nhánh"
              disabled={type === "View" && !isUpdate}
            />

            <FormSelect
              controlProps={{
                name: "roleCode",
                control,
                rules: { required: "Phải chọn chức vụ" },
              }}
              options={(rolesList as []) || []}
              selectShape={{ valueKey: "code", labelKey: "name" }}
              label="Chọn chức vụ"
              disabled={type === "View" && !isUpdate}
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
        {renderButtons()}
      </Box>
    </Dialog>
  );
};
