import { Box, Typography } from "@mui/material";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { LoadingButton } from "@mui/lab";
import styles from "~modules-dashboard/styles/layout/header.module.css";
import { signOut } from "next-auth/react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { warehouse } from "src/api";

type TProps = {
  data: any;
};

export const Header: React.FC<TProps> = ({ data }) => {
  const { title, pageName } = data || {};

  const { query } = useRouter();

  const { data: warehouseImportDetail } = useQuery(
    ["ImportWarehouseDetail_" + query?.id, { ...query }],
    () =>
      warehouse
        .getImportSessionById(query?.id as string)
        .then((res) => res.data),
    {
      enabled: pageName === "warehouse-import-detail",
    }
  );

  const { data: warehouseExportDetail } = useQuery(
    ["warehouseExportDetail_" + query.id],
    () =>
      warehouse
        .getExportSessionById(query.id as string)
        .then((res) => res.data),
    {
      enabled: pageName === "warehouse-export-detail",
    }
  );

  let extractedTitle = "";

  switch (pageName) {
    case "warehouse-export-detail":
      if (query.id) {
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

  return (
    <Box className={clsx(styles["header"])}>
      <Typography
        component="h1"
        variant="h5"
        className="flex-grow pl-12 text-xl font-medium"
      >
        {title || extractedTitle}
      </Typography>

      <LoadingButton
        sx={{ height: "34px " }}
        variant="contained"
        color="error"
        startIcon={<PowerSettingsNewRoundedIcon />}
        onClick={() => signOut()}
        className="shadow bg-[#E53E3E] font-semibold text-sm p-3"
      >
        Đăng xuất
      </LoadingButton>
    </Box>
  );
};
