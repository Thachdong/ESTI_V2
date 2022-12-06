import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { TDialog } from "~types/dialog";
import ClearIcon from "@mui/icons-material/Clear";
import { BaseButton } from "./buttons";
import { ReactQueryProvider } from "~modules-core/providers";

export const Dialog: React.FC<TDialog> = (props) => {
  const { onClose, title, open, ...remainProps } = props;

  return (
    <ReactQueryProvider>
      <MuiDialog open={open} maxWidth="sm" fullWidth={true} {...remainProps}>
        <DialogTitle className="flex items-center text-black px-0">
          <Typography
            variant="h6"
            component="div"
            className="flex-grow text-left font-medium px-6"
          >
            {title?.toUpperCase()}
          </Typography>
          <BaseButton
            variant="text"
            tooltipText="Đóng"
            onClick={onClose}
            className="text-[#000]"
          >
            <ClearIcon />
          </BaseButton>
        </DialogTitle>

        <DialogContent className="py-2 mb-4">{props.children}</DialogContent>
      </MuiDialog>
    </ReactQueryProvider>
  );
};
