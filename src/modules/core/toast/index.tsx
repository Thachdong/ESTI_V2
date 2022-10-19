import { toast as toastify, ToastOptions } from "react-toastify";
import { Box, Typography } from "@mui/material";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import style from "../styles/toast.module.css";

const StatusIcons: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case "success":
      return <CheckCircleOutlineOutlinedIcon sx={{width: 15}} />;
    case "error":
      return <CheckCircleOutlineOutlinedIcon sx={{width: 15}} />;
    case "info":
      return <CheckCircleOutlineOutlinedIcon sx={{width: 15}} />;
    case "warning":
      return <CheckCircleOutlineOutlinedIcon sx={{width: 15}} />;
    default:
      return <></>;
  }
};

const Container: React.FC<TToastProps> = ({ type, title, message }) => (
  <Box>
    <Box className={`flex items-center ${style["toast-header"]}`}>
      <StatusIcons type={type} />
      <Typography className="text-sm ml-1" component="h6" variant="h6">
        {title}
      </Typography>
    </Box>
    <Typography className="text-sm" component="p">{message}</Typography>
  </Box>
);

export const toast = {
  success: (message: string, options?: ToastOptions) =>
    toastify(
      <Container title={"Thành công"} message={message} type={"success"} />,
      {...options, className: style["toast-success"]}
    ),

  error: (message: string, options?: ToastOptions) =>
    toastify(
      <Container title={"Lỗi"} message={message} type={"error"} />,
      {...options, className: style["toast-error"]}
    ),

  info: (message: string, options?: ToastOptions) =>
    toastify(
      <Container title={"Thông tin"} message={message} type={"info"} />,
      {...options, className: style["toast-info"]}
    ),

  warning: (message: string, options?: ToastOptions) =>
    toastify(
      <Container title={"Cảnh báo"} message={message} type={"warning"} />,
      {...options, className: style["toast-warning"]}
    ),
};

export const toastOptions: ToastOptions = {
  autoClose: 5000,
  hideProgressBar: false,
  pauseOnHover: true,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  draggable: true,
  progress: 0.2,
  position: "bottom-right",
};
