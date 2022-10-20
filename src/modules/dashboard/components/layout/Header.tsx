import { Box, Typography } from "@mui/material";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { LoadingButton } from "@mui/lab";
import styles from "~modules-dashboard/styles/layout/header.module.css";
import { signOut } from "next-auth/react";
import clsx from 'clsx';

type TProps = {
  title: string;
};

export const Header: React.FC<TProps> = ({ title }) => {
  return (
    <Box className={clsx(styles["header"])}>
      <Typography component="h1" variant="h5" className="flex-grow">
        {title}
      </Typography>

      <LoadingButton
        sx={{ height: "32px" }}
        variant="contained"
        color="error"
        startIcon={<PowerSettingsNewRoundedIcon />}
        onClick={() => signOut()}
      >
        Đăng xuất
      </LoadingButton>
    </Box>
  );
};
