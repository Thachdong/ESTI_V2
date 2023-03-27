import { Box } from "@mui/material";
import clsx from "clsx";
import { TNextPageWithLayout } from "~types/_app";
import styles from "../styles/layout.module.css";

type TProps = {
  Page: TNextPageWithLayout;
};

export const PublicLayout: React.FC<TProps> = ({ Page }) => {
  return (
    <Box
      className={clsx(
        "flex items-center justify-center w-screen h-screen",
        styles["public-layout"]
      )}
    >
      <Page />
    </Box>
  );
};
