import AddIcon from "@mui/icons-material/Add";
import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";

export const AddButton: React.FC<ButtonProps> = ({ ref, ...props }) => {
  return (
    <Button
      {...props}
      className={clsx(
        "bg-main-2 hover:bg-[#3182ce] px-3",
        props.disabled && "disable-form-input",
        props?.className
      )}
    >
      <AddIcon className="mr-2 !font-semibold" />
      <span className="truncate">{props?.children}</span>
    </Button>
  );
};
