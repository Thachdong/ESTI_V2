import { Menu, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import router, { useRouter } from "next/router";
import React, { useState } from "react";
import { Item } from "react-contexify";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { Bill, TWarehouseExport } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { billColumns } from "./billColumns";

export const BillListPage: React.FC = () => {
  const { control, handleSubmit } = useForm<any>({
    mode: "onBlur",
  });
  const [pagination, setPagination] = useState(defaultPagination);
  const router = useRouter();
  const { query } = router;
  const [searchContent, setSearchContent] = useState("");

  // DATA FETCHING
  const { data, isLoading, isFetching, refetch } = useQuery(
    [
      "bills",
      "loading",
      {
        ...pagination,
        ...query,
      },
    ],
    () =>
      Bill.getList({
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        ...query,
      }).then((res) => res.data),
    {
      onSuccess: (data) => {
        setPagination({ ...pagination, total: data.totalItem });
      },
    }
  );

  const columns: GridColDef<TWarehouseExport>[] = [
    ...billColumns,
    { field: "action", headerName: "" },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);
  const onMouseEnterRow = () => {
    console.log("Huhuuh");
  };

  return (
    <>
      <div className="mb-4 grid grid-cols-4 gap-4 ">
        <div className="bg-[#c6c2bc] p-4 rounded-sm h-[100px] font-semibold text-white">
          <div className="mb-4 ">
            <span>TỔNG GIÁ TRỊ HOÁ ĐƠN</span>
          </div>
          <div className="flex justify-end text-xl">
            <span>0</span>
          </div>
        </div>
        <div className="bg-[#519de0] p-4 rounded-sm h-[100px] font-semibold text-white">
          <div className="mb-4 ">
            <span>TỔNG GIÁ TRỊ ĐÃ THANH TOÁN</span>
          </div>
          <div className="flex justify-end text-xl">
            <span>47</span>
          </div>
        </div>
        <div className="bg-[#48cda1] p-4 rounded-sm h-[100px] font-semibold text-[#fff]">
          <div className="mb-4 ">
            <span>TỔNG GIÁ TRỊ CÒN PHẢI THU</span>
          </div>
          <div className="flex justify-end text-xl">
            <span>29</span>
          </div>
        </div>
        <div className="bg-[#c686e8] p-4 rounded-sm h-[100px] font-semibold text-white">
          <div className="mb-4 ">
            <span>TỔNG GIÁ TRỊ QUÁ HẠN</span>
          </div>
          <div className="flex justify-end text-xl">
            <span>0 VNĐ</span>
          </div>
        </div>
      </div>
      <Paper className="p-2 w-full h-full shadow bgContainer">
        <div className="flex gap-4 items-center mb-2">
          <div>
            <AddButton
              variant="contained"
              onClick={() =>
                router.push("/dashboard/orders/bill-list/create-bill")
              }
            >
              TẠO MỚI HOÁ ĐƠN
            </AddButton>
          </div>
        </div>
        <ContextMenuWrapper
          menuId="order_request_table_menu"
          menuComponent={
            <Menu className="p-0" id="order_request_table_menu" open={false}>
              <Item id="view-product" onClick={() => undefined}>
                Xem chi tiết
              </Item>
              <Item id="delete-product" onClick={() => undefined}>
                Xóa
              </Item>
            </Menu>
          }
        >
          <DataTable
            rows={data?.items as []}
            columns={columns}
            gridProps={{
              loading: isLoading || isFetching,
              ...paginationProps,
            }}
            componentsProps={{
              row: {
                // onMouseEnter: onMouseEnterRow,
                oncontextmenu: onMouseEnterRow,
              },
            }}
          />
        </ContextMenuWrapper>
      </Paper>
    </>
  );
};
