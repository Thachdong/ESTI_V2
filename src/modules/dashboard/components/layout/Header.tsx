import { Box, Typography } from "@mui/material";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { LoadingButton } from "@mui/lab";
import styles from "~modules-dashboard/styles/layout/header.module.css";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { warehouse } from "src/api";

type TProps = {
  data: any;
};

export const Header: React.FC<TProps> = ({ data }) => {
  const { title, pageName } = data || {};
  const router = useRouter();
  const { query } = router;

  const { data: warehouseImportDetail } = useQuery(
    ["ImportWarehouseDetail_" + query?.id, { ...query }],
    () =>
      warehouse
        .getImportSessionById(query?.id as string)
        .then((res) => res.data),
    {
      enabled: pageName === "warehouse-import-detail" && !!query.id,
    }
  );

  const { data: warehouseExportDetail } = useQuery(
    ["warehouseExportDetail_" + query.transactionId],
    () =>
      warehouse
        .getExportSessionById(query.transactionId as string)
        .then((res) => res.data),
    {
      enabled: pageName === "warehouse-export-detail" && !!query.transactionId,
    }
  );

  let extractedTitle = "";

  switch (pageName) {
    case "warehouse-export-detail":
      if (query.transactionId) {
        extractedTitle = `XUẤT KHO / TẠO XUẤT KHO / ${
          warehouseExportDetail?.productOrder?.code || ""
        }`;
      } else {
        extractedTitle = "XUẤT KHO / TẠO XUẤT KHO";
      }
      break;

    case "warehouse-import-detail":
      if (query.id) {
        extractedTitle = `NHẬP KHO / CHI TIẾT / ${
          warehouseImportDetail?.warehouseSession?.code || ""
        }`;
      } else {
        extractedTitle = "NHẬP KHO / TẠO NHẬP KHO";
      }
      break;
  }

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
        {title ? (
          <>
            <div className="flex items-center">
              <span>{title.split("/")[0]}</span>
              {title.split("/")[1] ? (
                <span className="text-[#DDDDDD] !font-normal px-2">/</span>
              ) : null}
              <span className="text-main-2">{title.split("/")[1]}</span>
            </div>
          </>
        ) : (
          <>{extractedTitle}</>
        )}
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
