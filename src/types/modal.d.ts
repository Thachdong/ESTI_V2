import { ModalProps } from "@mui/material";

type TModal = ModalProps & {
    title: string;
    onClose: () => void;
    closeBtnText?: string;
    acceptBtnText?: string;
}