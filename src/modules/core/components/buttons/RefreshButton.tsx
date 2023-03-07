import RefreshIcon from "@mui/icons-material/RefreshRounded";
import { Button, ButtonBase, ButtonProps } from "@mui/material";
import clsx from "clsx";

export const RefreshButton: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonBase
      {...props}
      className={clsx(
        "px-3 text-main bg-[#F3F6F9] h-[40px] w-[40px] rounded border border-solid border-[#edf0f2] active:bg-main active:text-white",
        props?.className
      )}
    >
      <RefreshIcon className="!font-semibold" />
      <span className="truncate">{props?.children}</span>
    </ButtonBase>
  );
};
