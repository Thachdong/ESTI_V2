import UploadIcon from "@mui/icons-material/UploadFileOutlined";
import { InputLabel } from "@mui/material";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { toast } from "~modules-core/toast";
import { TBaseButton } from "~types/buttons";
import { FormUploadBase } from "../form-bases";
import { BaseButton } from "./BaseButton";

type TProps = TBaseButton & {
  loader: (file: FormData) => Promise<TBaseResponse<string>>;
  refetch?: () => void;
};

export const UploadButton: React.FC<TProps> = (props) => {
  const { control } = useForm();

  const { className, children, loader, refetch, ...restProps } = props;

  const renderTitle = (loading: boolean) => (
    <BaseButton
      tooltipText="Tải lên file excel"
      {...restProps}
      className={clsx(
        "px-0 bg-[#F3F6F9] h-[40px] min-w-[40px] w-[40px] active:bg-main cursor-pointer !shadow-none",
        className
      )}
    >
      <InputLabel htmlFor="ImportFile" className="flex items-center justify-cetner text-main active:text-white !shadow-none" disabled={loading}>
        <UploadIcon />
        {children}
      </InputLabel>
    </BaseButton>
  );

  return (
    <FormUploadBase
      controlProps={{
        control,
        name: "ImportFile",
      }}
      loader={loader}
      renderTitle={renderTitle}
      successToast={() => {
        toast.success("Tải lên file excel thành công!");
        refetch?.();
      }}
    />
  );
};
