import RefreshIcon from "@mui/icons-material/RefreshRounded";
import { Button, ButtonBase, ButtonProps, Tooltip } from "@mui/material";
import clsx from "clsx";

type TProps = ButtonProps & {
  tooltipText?: string;
};

export const RefreshButton: React.FC<TProps> = (props) => {
  const { tooltipText, className, children, ...rest } = props || {};

  return (
    <Tooltip title={props?.tooltipText || "Tải lại"} placement="top">
      <ButtonBase
        {...rest}
        className={clsx(
          "px-3 text-main bg-[#F3F6F9] h-[40px] w-[40px] rounded border border-solid border-[#edf0f2] active:bg-main active:text-white",
          className
        )}
      >
        <RefreshIcon className="!font-semibold" />
        <span className="truncate">{children}</span>
      </ButtonBase>
    </Tooltip>
  );
};
