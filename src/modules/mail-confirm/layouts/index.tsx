import { Box } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { TNextPageWithLayout } from "~types/_app";
import styles from "../styles/mail-confirm.module.css";

type TProps = {
  Page: TNextPageWithLayout;
};

export const MailConfirmLayout: React.FC<TProps> = ({ Page }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      const callbackUrl = router.asPath;

      router.push(`/auth/login/?callbackUrl=${callbackUrl}`);
    }
  }, []);

  return (
    <Box className={clsx("flex items-center justify-center w-screen h-screen", styles["mail-confirm-layout"])}>
      <Page />
    </Box>
  );
};