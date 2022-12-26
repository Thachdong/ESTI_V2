import { Box } from "@mui/material";
import clsx from "clsx";
import { useState } from "react";
import { useIsFetching } from "react-query";
import { Loading } from "~modules-core/components";
import { Footer, Header, Sidebar } from "~modules-dashboard/components/layout";
import styles from "~modules-dashboard/styles/layout/layout.module.css";
import { TNextPageWithLayout } from "~types/_app";

type TProps = {
  Page: TNextPageWithLayout;
  data: any;
};

export const DashboardLayout: React.FC<TProps> = ({ Page, data }) => {
  const [expand, setExpand] = useState(true);

  // ADD "loading" TO QUERY KEY TO TRIGGER LOADING EFFECT
  const isFetching = useIsFetching({
    predicate: (query) => query?.queryKey?.includes("loading"),
  });

  const { title } = data || {};

  return (
    <Box
      className={clsx(styles["dashboard-layout"])}
      sx={{
        gridTemplateColumns: expand
          ? "250px calc(100vw - 250px)"
          : "60px calc(100vw - 60px)",
      }}
    >
      {/* height: 60px */}
      <Sidebar expand={expand} setExpand={setExpand} />

      <Box className="flex flex-col">
        <Header title={title} />

        <Box
          className="bg-[#f5f8fb] flex-grow relative  overflow-y-auto"
          component="main"
          sx={{ height: "calc(100vh - 60px - 45px)" }}
        >
          {!!isFetching && (
            <Box className="absolute w-full">
              <Loading />
            </Box>
          )}
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
