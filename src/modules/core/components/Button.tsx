import { LoadingButton, LoadingButtonProps } from "@mui/lab";

type TProps = {
  buttonProps: LoadingButtonProps;
  children: ReactNode;
};

export const Button: React.FC<TProps> = ({ buttonProps, children }) => {
  return (
    <LoadingButton fullWidth variant="contained" {...buttonProps}>
      {children}
    </LoadingButton>
  );
};
