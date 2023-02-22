import AddIcon from "@mui/icons-material/Add";
import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";

export const AddButton: React.FC<ButtonProps> = ({ ref, ...props }) => {
  return (
    <Button
      variant="contained"
      {...props}
      className={clsx(
        "bg-main-2 hover:bg-[#3182ce] px-3 shadow-none !font-bold",
        props.disabled && "disable-btn",
        props?.className
      )}
    >
      <AddIcon />
      {
        props?.children && <span className="truncate ml-2">{props?.children}</span>
      }
    </Button>
  );
};
