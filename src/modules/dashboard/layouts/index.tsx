import { Box } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Footer, Header, Sidebar } from "~modules-dashboard/components/layout";
import styles from "~modules-dashboard/styles/layout/layout.module.css";
import { TNextPageWithLayout } from "~types/_app";

type TProps = {
  Page: TNextPageWithLayout;
  data: any;
};

export const DashboardLayout: React.FC<TProps> = ({ Page, data }) => {
  const [expand, setExpand] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      const callbackUrl = router.asPath;
      router.push(`/auth/login/?callbackUrl=${callbackUrl}`);
    }
  }, []);

  return (
    <Box
      className={clsx(styles["dashboard-layout"])}
      sx={{
        gridTemplateColumns: expand
          ? "250px calc(100vw - 250px)"
          : "64px calc(100vw - 64px)",
      }}
    >
      {/* height: 60px */}
      <Sidebar expand={expand} setExpand={setExpand} />

      <Box className="flex flex-col">
        <Header data={data} />

        <Box
          className="bg-[#F3F6F9] flex-grow relative  overflow-y-auto"
          component="main"
          sx={{ height: "calc(100vh - 64px - 45px)" }}
        >
          <Box className={clsx(styles["page"], "relative w-full h-full")}>
            <Page />
          </Box>
        </Box>
        {/* height: 45px */}
        <Footer />
      </Box>
    </Box>
  );
};
