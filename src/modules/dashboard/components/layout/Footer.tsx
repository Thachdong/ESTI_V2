import { Box, Typography } from "@mui/material";
import styles from "~modules-dashboard/styles/layout/footer.module.css";
import clsx from "clsx";

export const Footer: React.FC = () => (
  <Box className={clsx(styles["footer"], "flex flex-col items-center justify-center")}>
    <Typography className="text-xs">© COPYRIGHT 2022 - ESTI COMPANY</Typography>
  </Box>
);
