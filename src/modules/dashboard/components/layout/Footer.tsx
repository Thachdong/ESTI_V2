import { Box, Typography } from "@mui/material";
import styles from "~modules-dashboard/styles/layout/footer.module.css";

export const Footer: React.FC = () => (
  <Box className={styles["footer"]}>
    <Typography className="text-xs !bg-none">
      © COPYRIGHT 2022 - ESTI COMPANY
    </Typography>
  </Box>
);
