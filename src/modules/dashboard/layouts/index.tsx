import { Box, Paper } from "@mui/material";
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
  const [expand, setExpand] = useState(false);

  // ADD "loading" TO QUERY KEY TO TRIGGER LOADING EFFECT
  const isFetching = useIsFetching({
    predicate: (query) => query?.queryKey?.includes("loading"),
  });

  const { title } = data || {};

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: expand
          ? "250px calc(100% - 250px)"
          : "60px calc(100% - 60px)",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        transition: "all 0.5s",
      }}
    >
      <Sidebar expand={expand} setExpand={setExpand} />

      <Box className="flex flex-col">
        <Header title={title} />

        <Box
          className="bg-[#e9ecf0] flex-grow relative  overflow-y-auto"
          component="main"
        >
          {!!isFetching && (
            <div className="absolute w-full">
              <Loading />
            </div>
          )}
          <div className={clsx(styles["layout"], "relative w-full h-full")}>
            <Page />
          </div>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};
