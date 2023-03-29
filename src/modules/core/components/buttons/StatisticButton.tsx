import { ButtonBase, ButtonProps, Tooltip } from "@mui/material";
import clsx from "clsx";
import BarChartIcon from "@mui/icons-material/BarChart";

export const StatisticButton: React.FC<ButtonProps & { View?: boolean }> = (
  props
) => {
  return (
    <Tooltip title={props?.View ? "Ẩn thống kê" : "Hiện thống kê"} placement="top">
      <ButtonBase
        {...props}
        className={clsx(
          "relative px-3 text-main bg-[#F3F6F9] h-[40px] w-[40px] rounded border border-solid border-[#edf0f2] active:bg-main active:text-white",
          props?.className
        )}
      >
        <BarChartIcon className="!font-semibold" />
        <span className="truncate">{props?.children}</span>
        {props?.View ? (
          <span className="h-[30px] w-[2px] bg-main p-[1px] rotate-45 absolute"></span>
        ) : (
          <></>
        )}
      </ButtonBase>
    </Tooltip>
  );
};
