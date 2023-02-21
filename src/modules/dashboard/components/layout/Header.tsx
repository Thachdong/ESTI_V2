import { Box, Typography } from "@mui/material";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { LoadingButton } from "@mui/lab";
import styles from "~modules-dashboard/styles/layout/header.module.css";
import clsx from "clsx";
import { useRouter } from "next/router";
import {
  BillDetailTitle,
  OrderDetailTitle,
  QuoteDetailTitle,
  QuoteRequestDetailTitle,
  WarehouseExportDetailTitle,
  WarehouseImportDetailTitle,
} from "./titles";
import { useCallback } from "react";

type TProps = {
  data: any;
};

export const Header: React.FC<TProps> = ({ data }) => {
  const { title, pageName } = data || {};

  const router = useRouter();

  const renderTitle = useCallback(() => {
    switch (pageName) {
      case "quote-request-detail-page":
        return <QuoteRequestDetailTitle />;
      case "warehouse-export-detail-page":
        return <WarehouseExportDetailTitle />;
      case "warehouse-import-detail-page":
        return <WarehouseImportDetailTitle />;
      case "quote-detail-page":
        return <QuoteDetailTitle />;
      case "order-detail-page":
        return <OrderDetailTitle />;
      case "bill-detail-page":
        return <BillDetailTitle />;
      default:
        return title;
    }
  }, [data]);

  const handleLogout = () => {
    localStorage.clear();

    const { pathname } = window.location;

    router.push(`/auth/login?callbackUrl=${pathname}`);
  };

  return (
    <Box className={clsx(styles["header"])}>
      <Typography
        component="h1"
        variant="h5"
        className="flex-grow pl-[64px] text-xl font-medium uppercase"
      >
        {renderTitle()}
      </Typography>

      <LoadingButton
        sx={{ height: "44px " }}
        variant="contained"
        color="error"
        startIcon={<PowerSettingsNewRoundedIcon />}
        onClick={handleLogout}
        className="shadow-none text-[#E53E3E] bg-[#fde9e9] font-bold text-sm p-4"
      >
        Đăng xuất
      </LoadingButton>
    </Box>
  );
};
