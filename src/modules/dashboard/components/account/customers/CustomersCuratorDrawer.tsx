import { Box, Drawer, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { customer } from "src/api";
import { DataTable } from "~modules-core/components";
import { TGridColDef } from "~types/data-grid";

type TProps = {
  open: boolean;
  onClose: () => void;
  customerId: string;
};

export const CustomersCuratorDrawer: React.FC<TProps> = ({
  open,
  onClose,
  customerId,
}) => {
  const { data, isLoading, isFetching } = useQuery(
    ["CustomerDetail", customerId],
    () => customer.getById(customerId).then((res) => res.data),
    {
      enabled: !!customerId,
    }
  );

  const columns: TGridColDef[] = [
    {
      field: "curatorName",
      headerName: "Tên",
      minWidth: 100,
      flex: 1
    },
    {
      field: "accountCode",
      headerName: "Mã tài khoản",
      minWidth: 150,
    },
    {
      field: "accountTypeName",
      headerName: "Loại tài khoản",
      minWidth: 150,
    },
    {
      field: "curatorDepartmentName",
      headerName: "Phòng ban",
      minWidth: 150,
    },
    {
      field: "curatorPhone",
      headerName: "SDT",
      minWidth: 150,
    },
    {
      field: "curatorEmail",
      headerName: "Email",
      minWidth: 150,
    },
    {
      field: "curatorGenderName",
      headerName: "Giới tính",
      minWidth: 150,
    },
  ];

  return (
    <Drawer anchor={"bottom"} open={open} onClose={onClose}>
      <Box className="w-[100%] mb-4">
        <Typography className="p-3 font-semibold text-sm">
          DANH SÁCH NGƯỜI LIÊN HỆ
        </Typography>
        <DataTable
          rows={data?.curatorInfo || []}
          columns={columns}
          hideFooter
          hideSearchbar
          autoHeight
          gridProps={{
            loading: isLoading || isFetching,
          }}
        />
      </Box>
    </Drawer>
  );
};
