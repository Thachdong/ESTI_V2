import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { TDialog } from "~types/dialog";
import ClearIcon from "@mui/icons-material/Clear";
import { BaseButton } from "./buttons";

export const Dialog: React.FC<TDialog> = (props) => {
  const { onClose, title, open, ...remainProps } =
    props;

  return (
    <MuiDialog open={open} maxWidth="sm" fullWidth={true} PaperProps={{sx: {height: "100%"}}} {...remainProps}>
      <DialogTitle className="flex items-center text-black px-0">
        <Typography variant="h5" component="div" className="flex-grow text-center font-medium">
          {title?.toUpperCase()}
        </Typography>
        <BaseButton variant="text" tooltipText="Đóng" onClick={onClose} className="text-[#000]">
          <ClearIcon />
        </BaseButton>
      </DialogTitle>

      <DialogContent className="py-2 mb-4">
        {props.children}
      </DialogContent>
    </MuiDialog>
  );
};
