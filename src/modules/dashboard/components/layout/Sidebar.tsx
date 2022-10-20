import { Box } from "@mui/material";
import styles from "~modules-dashboard/styles/layout/sidebar.module.css";

const data = [
  {
    title: "Trang chủ",
    link: "",
    childrens: []
  },
];

export const Sidebar: React.FC = () => {
  const isCollapse = false;
  return (
    <Box className={styles["sidebar"]}>
      <Box className={styles["logo-box"]}>ESTI</Box>
    </Box>
  );
};
