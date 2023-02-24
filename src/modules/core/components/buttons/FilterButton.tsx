import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Button, ButtonBase, ButtonProps } from "@mui/material";
import clsx from "clsx";

export const FilterButton: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonBase
      {...props}
      className={clsx(
        "px-3 text-main bg-[#F3F6F9] h-[40px] w-[40px] rounded border border-solid border-[#edf0f2] active:bg-main active:text-white",
        props?.className
      )}
    >
      <FilterAltOutlinedIcon />
      {props?.children}
    </ButtonBase>
  );
};
