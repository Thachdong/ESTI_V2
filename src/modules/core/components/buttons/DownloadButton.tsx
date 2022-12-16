import DownloadIcon from '@mui/icons-material/CloudDownloadRounded';
import { Button, ButtonProps } from "@mui/material";
import clsx from "clsx";

export const DownloadButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
      className={clsx("bg-main-2 hover:bg-[#3182ce] px-3", props?.className)}
    >
      <DownloadIcon className="mr-2 !font-semibold" />
      <span className="truncate">{props?.children}</span>
    </Button>
  );
};