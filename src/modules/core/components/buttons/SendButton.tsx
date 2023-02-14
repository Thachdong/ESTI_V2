import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";

export const SendButton: React.FC<ButtonProps> = ({ref, ...props}) => {
  return (
    <Button
      {...props}
      className={clsx("bg-main-2 hover:bg-[#3182ce] text-white px-3", props?.className)}
    >
      <SendRoundedIcon className="mr-2 !font-semibold" />
      <span className="truncate">{props?.children}</span>
    </Button>
  );
};