import { Box, Typography } from "@mui/material";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { LoadingButton } from "@mui/lab";
import styles from "~modules-dashboard/styles/layout/header.module.css";
import { signOut } from "next-auth/react";
import clsx from "clsx";

type TProps = {
  title: string;
};

export const Header: React.FC<TProps> = ({ title }) => {
  return (
    <Box className={clsx(styles["header"])}>
      <Typography
        component="h1"
        variant="h5"
        className="flex-grow pl-12 text-xl font-medium"
      >
        {title}
      </Typography>

      <LoadingButton
        sx={{ height: "34px " }}
        variant="contained"
        color="error"
        startIcon={<PowerSettingsNewRoundedIcon />}
        onClick={() => signOut()}
        className="shadow bg-[#E53E3E] font-semibold text-sm p-3"
      >
        Đăng xuất
      </LoadingButton>
    </Box>
  );
};
