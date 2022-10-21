import { Box } from "@mui/material";
import clsx from "clsx";
import { ReactElement } from "react";
import { Footer, Header, Sidebar } from "~modules-dashboard/components/layout";
import styles from "~modules-dashboard/styles/layout/layout.module.css";

type TProps = {
  children: ReactElement;
  title: string;
};

export const DashboardLayout: React.FC<TProps> = ({ children, title }) => {
  console.log("sdfasdfasdf", children);

  return (
    <Box className="flex" sx={{ height: "100vh", overflow: "hidden" }}>
      <Sidebar />

      <Box className="flex flex-col flex-grow">
        <Header title={title} />

        <Box className={clsx(styles["layout"])} component="main">
          {children}
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};
