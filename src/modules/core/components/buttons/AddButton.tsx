import AddIcon from "@mui/icons-material/Add";
import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";

export const AddButton: React.FC<ButtonProps> = ({ ref, ...props }) => {
  return (
    <Button
      variant="contained"
      {...props}
      className={clsx(
        "!bg-main hover:bg-[#3182ce] px-3 shadow-none !font-bold h-[40px] min-w-[260px]",
        props.disabled && "disable-btn",
        props?.className
      )}
    >
      <AddIcon />
      {props?.children && (
        <span className="truncate ml-2">{props?.children}</span>
      )}
    </Button>
  );
};
