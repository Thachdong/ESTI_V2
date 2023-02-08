import moment from "moment";
import { SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { staff, TStaff } from "src/api";
import { BaseButton } from "~modules-core/components";
import { toast } from "~modules-core/toast";

type TProps = {
  type?: string;
  isUpdate: boolean;
  refetch?: () => void;
  onClose: () => void;
  setIsUpdate: (value: SetStateAction<boolean>) => void;
};

export const DialogButtons: React.FC<TProps> = ({
  type,
  isUpdate,
  refetch,
  onClose,
  setIsUpdate,
}) => {
  const { handleSubmit, setError } = useFormContext();

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

  const handleAddStaff = async (data: any) => {
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

  const handleUpdateStaff = async (data: any) => {
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

  switch (true) {
    case type === "Add":
      return (
        <>
          <BaseButton onClick={handleSubmit(handleAddStaff)} className="mr-2">
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
    default:
      return <></>;
  }
};
