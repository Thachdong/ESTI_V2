import { DialogProps } from "@mui/material";

type TDialog = DialogProps & {
    onClose: () => void;
    open: boolean;
    defaultValue?: any;
    type?: string;
    title?: string;
    refetch?: () => void;
    titleClassName?: string;
}

type TDefaultDialogState = {
    open: boolean;
    type?: string;
}