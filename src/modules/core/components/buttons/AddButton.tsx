import AddIcon from "@mui/icons-material/Add";
import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";

export const AddButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      className={clsx("bg-main-2 hover:bg-[#3182ce] px-3", props?.className)}
    >
      <AddIcon className="mr-2 !font-semibold" />
      {props?.children}
    </Button>
  );
};
