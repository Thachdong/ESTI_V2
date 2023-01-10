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
  DropdownButton,
  FormInput,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { FormCheckbox } from "~modules-core/components/form-hooks/FormCheckbox";
import { defaultPagination } from "~modules-core/constance";
import { InfoCreateOrderRequest } from "~modules-dashboard/components";
import { orderRequestColumns } from "./orderRequestColumns";

export const CreateOrdersRequestPage = () => {
  const [pagination, setPagination] = useState(defaultPagination);
  const { control, handleSubmit } = useForm<any>({
    mode: "onBlur",
  });
  const [checkConfirm, setChecConfirm] = useState(false);

  const columns: GridColDef<any>[] = [
    ...orderRequestColumns,
    {
      field: "action",
      headerName: "",
      align: "center",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id as string}
          items={[
            {
              action: () => undefined,
              label: "Thông tin chi tiết",
            },
            {
              action: () => undefined,
              label: "Xóa",
            },
          ]}
        />
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);
  const onMouseEnterRow = () => {
    console.log("test");
  };
  return (
    <div className="h-[400px] verflow-y-auto ">
      <div>
        <FormCheckbox
          label={"Đơn đặt không thông qua đơn mua"}
          controlProps={{
            name: "confirm",
            control: control,
            rules: undefined,
          }}
          onChange={(val) => setChecConfirm(val.target.checked)}
        />
      </div>
      <div>
        <InfoCreateOrderRequest control={control} checkConfirm={checkConfirm} />
      </div>

      <Paper className="shadow p-4 bgContainer">
        <div className="w-[50%] mb-4">
          <SearchBox />
        </div>
        <ContextMenuWrapper
          menuId="create_request_table_menu"
          menuComponent={
            <Menu className="p-0" id="create_request_table_menu" open={false}>
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
                onMouseEnter: onMouseEnterRow,
              },
            }}
          />
        </ContextMenuWrapper>
      </Paper>

      <Paper className="grid grid-cols-4 gap-4 shadow p-4 mt-4">
        <div className="">
          <div className=" font-medium text-sm mb-2">
            <span>SHOP MANAGER NOTE</span>
          </div>
          <div className="">
            <FormInput
              controlProps={{
                name: "code",
                control,
              }}
              label=""
              required
              multiline
              minRows={3}
              disabled
            />
          </div>
        </div>
        <div className="">
          <div className=" font-medium text-sm mb-2">
            <span>SALES ADMIN NOTE</span>
          </div>
          <div className="">
            <FormInput
              controlProps={{
                name: "code",
                control,
              }}
              label=""
              required
              multiline
              minRows={3}
              disabled
            />
          </div>
        </div>
        <div className="">
          <div className=" font-medium text-sm mb-2">
            <span>SALES NOTE</span>
          </div>
          <div className="">
            <FormInput
              controlProps={{
                name: "code",
                control,
              }}
              label=""
              required
              multiline
              minRows={3}
              disabled
            />
          </div>
        </div>
        <div className="">
          <div className=" font-medium text-sm mb-2">
            <span>GIAO NHẬN NOTE</span>
          </div>
          <div className="">
            <FormInput
              controlProps={{
                name: "code",
                control,
              }}
              label=""
              required
              multiline
              minRows={3}
              disabled
            />
          </div>
        </div>
      </Paper>
      <div className="flex justify-end py-4">
        <BaseButton>Tạo đơn hàng</BaseButton>
      </div>
    </div>
  );
};
