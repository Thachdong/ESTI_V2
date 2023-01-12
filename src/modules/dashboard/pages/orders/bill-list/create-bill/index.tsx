import { Menu, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import React, { useState } from "react";
import { Item } from "react-contexify";
import { useForm } from "react-hook-form";
import {
  BaseButton,
  ContextMenuWrapper,
  DataTable,
  FormInput,
  generatePaginationProps,
} from "~modules-core/components";
import { defaultPagination } from "~modules-core/constance";
import {
  InfoCreateBillForm,
  InfoReceipForm,
} from "~modules-dashboard/components";
import { createBillColumns } from "./createBillColumns";

export const CreateBillPage = () => {
  const { control, handleSubmit } = useForm<any>({
    mode: "onBlur",
  });
  const [pagination, setPagination] = useState(defaultPagination);

  const columns: GridColDef<any>[] = [
    ...createBillColumns,
    { field: "action", headerName: "" },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);

  const onMouseEnterRow = () => {};

  return (
    <div className="h-[400px] verflow-y-auto">
      <div>
        <InfoCreateBillForm control={control} />
      </div>
      <Paper className="shadow p-4 mt-4 bgContainer">
        <div className="font-medium mb-2">
          <span>THÔNG TIN SẢN PHẨM</span>
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
            rows={[]}
            columns={columns}
            gridProps={{
              // loading: isLoading || isFetching,
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
      <div>
        <InfoReceipForm control={control} />
      </div>
      <div className="flex justify-end py-4">
        <BaseButton className="">Lưu</BaseButton>
      </div>
    </div>
  );
};
