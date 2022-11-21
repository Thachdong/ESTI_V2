import { Box, Paper } from "@mui/material";
import clsx from "clsx";
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
  // ADD "loading" TO QUERY KEY TO TRIGGER LOADING EFFECT
  const isFetching = useIsFetching({
    predicate: (query) => query?.queryKey?.includes("loading"),
  });

  const {title} = data || {};
  

  return (
    <Box className="flex" sx={{ height: "100vh", overflow: "hidden" }}>
      <Sidebar />
 
      <Box className="flex flex-col flex-grow">
        <Header title={title} />

        <Box className="bg-[#f3f6f9] flex-grow relative  overflow-y-auto p-3" component="main">
          {!!isFetching && (
            <div className="absolute w-full">
              <Loading />
            </div>
          )}
          <Paper elevation={3} className={clsx(styles["layout"], "relative bg-white w-full h-full")}>
            <Page />
          </Paper>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};
