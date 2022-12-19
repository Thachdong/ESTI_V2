import RefreshIcon from "@mui/icons-material/RefreshRounded";
import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";

export const RefreshButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      variant="text"
      className={clsx("px-3", props?.className)}
    >
      <RefreshIcon className="mr-2 !font-semibold" />
      <span className="truncate">{props?.children}</span>
    </Button>
  );
};
