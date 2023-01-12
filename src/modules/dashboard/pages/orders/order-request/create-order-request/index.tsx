import { ButtonBase, Menu, Paper } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import { Item } from "react-contexify";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { preQuote, products } from "src/api";
import {
  BaseButton,
  ContextMenuWrapper,
  DataTable,
  FormInput,
  FormSelect,
  FormSelectAsync,
  generatePaginationProps,
  SearchBox,
} from "~modules-core/components";
import { FormCheckbox } from "~modules-core/components/form-hooks/FormCheckbox";
import { FormInputNumber } from "~modules-core/components/form-hooks/FormInputNumber";
import { defaultPagination, VAT } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";
import { InfoCreateOrderRequest } from "~modules-dashboard/components";
import DeleteIcon from "@mui/icons-material/Delete";

export const CreateOrdersRequestPage = () => {
  const [pagination, setPagination] = useState(defaultPagination);
  const { control, handleSubmit, setValue, watch } = useForm<any>({
    mode: "onBlur",
  });

  const [checkConfirm, setCheckConfirm] = useState(false);
  const [dataSellectPreQuoteDetail, setDataSellectPreQuoteDetail] =
    useState<any>();

  // HANDLE PREQOTE DETAIL
  const {
    data: preQuoteDetailData,
    isLoading: preQuoteDetailLoading,
    isFetching: preQuoteDetailFetching,
  } = useQuery(
    ["proQuoteDetail", { id: dataSellectPreQuoteDetail?.id }],
    () =>
      preQuote.getById(dataSellectPreQuoteDetail?.id).then((res) => {
        const { preOrderDetailView } = res.data;
        preOrderDetailView?.map((item: any) => {
          setValue(`product.productCode.${item?.productCode}`, item?.productId);
          setValue(`product.productName.${item?.productCode}`, item?.productId);
          setValue(`product.quantity.${item?.productCode}`, item?.quantity);
          setValue(`product.price.${item?.productCode}`, item?.price);
          setValue(`product.note.${item?.productCode}`, item?.note);
          setValue(`product.vat.${item?.productCode}`, parseInt(item?.vat));
        });

        return res.data;
      }),
    {
      enabled: !!dataSellectPreQuoteDetail,
    }
  );

  const columns: GridColDef<any>[] = [
    {
      field: "index",
      headerName: "STT",
      width: 50,
      align: "center",
    },
    {
      field: "productCode",
      headerName: "Mã SP",
      minWidth: 180,
      renderCell: ({ row }) => (
        <div className="w-full">
          <FormSelectAsync
            fetcher={products.getList}
            label={""}
            controlProps={{
              name: `product.productCode.${row?.productCode}`,
              control: control,
            }}
            defaultOptions={[
              { productCode: row?.productCode, id: row?.productId },
            ]}
            labelKey="productCode"
          />
        </div>
      ),
    },
    {
      field: "productName",
      headerName: "Tên SP",
      minWidth: 250,
      renderCell: ({ row }) => (
        <div className="w-full">
          <FormSelectAsync
            fetcher={products.getList}
            label={""}
            controlProps={{
              name: `product.productName.${row?.productCode}`,
              control: control,
            }}
            defaultOptions={[
              { productName: row?.productName, id: row?.productId },
            ]}
            labelKey="productName"
          />
        </div>
      ),
    },
    { field: "manufactor", headerName: "Hãng SX", minWidth: 100 },
    {
      field: "origin",
      headerName: "Quy cách",
      minWidth: 100,
    },
    { field: "unitName", headerName: "Đơn vị", minWidth: 100 },
    {
      field: "quantity",
      headerName: "Số lượng",
      minWidth: 115,
      renderCell: ({ row }) => (
        <div className="w-full">
          <FormInput
            label={""}
            controlProps={{
              name: `product.quantity.${row?.productCode}`,
              control: control,
            }}
          />
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Giá",
      minWidth: 200,
      renderCell: ({ row }) => (
        <div className="w-full">
          <FormInputNumber
            label={""}
            controlProps={{
              name: `product.price.${row?.productCode}`,
              control: control,
            }}
          />
        </div>
      ),
    },
    {
      field: "vat",
      headerName: "Thuế GTGT",
      minWidth: 150,
      renderCell: ({ row }) => (
        <div className="w-full">
          <FormSelect
            options={VAT}
            label={""}
            controlProps={{
              name: `product.vat.${row?.productCode}`,
              control: control,
            }}
            labelKey="name"
          />
        </div>
      ),
    },
    {
      field: "totalPrice",
      headerName: "Thành tiền",
      minWidth: 250,
      renderCell: ({ row }) => _format.getVND(row?.totalPrice),
    },
    {
      field: "note",
      headerName: "Ghi chú",
      minWidth: 250,
      renderCell: ({ row }) => (
        <div className="w-full">
          <FormInput
            label={""}
            controlProps={{
              name: `product.note.${row?.productCode}`,
              control: control,
            }}
          />
        </div>
      ),
    },
    {
      field: "action",
      headerName: "",
      align: "center",
      width: 50,
      renderCell: ({ row }) => (
        <ButtonBase className="text-[#b63a3a]">
          <DeleteIcon />
        </ButtonBase>
      ),
    },
  ];

  const paginationProps = generatePaginationProps(pagination, setPagination);
  const onMouseEnterRow = () => {
    console.log("test");
  };

  const onCreate = (data: any) => {
    const dataSubmit = {
      customerId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      companyName: "string",
      companyTaxCode: "string",
      companyProfession: 0,
      companyAddress: "string",
      companyEmail: "string",
      receiverAdress: "string",
      curatorId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      curatorName: "string",
      curatorDepartmentId: 0,
      curatorPhone: "string",
      curatorEmail: "string",
      requirements: "string",
      attachFile: "string",
      preOrderDetailCreate: [
        {
          productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          quantity: 0,
          note: "string",
        },
      ],
    };
    console.log("data", data);
    console.log("List data", dataSubmit);
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
          onChange={(val) => setCheckConfirm(val.target.checked)}
        />
      </div>

      <div>
        <InfoCreateOrderRequest
          control={control}
          watch={watch}
          setValue={setValue}
          checkConfirm={checkConfirm}
          handelSelectPreQuoteDetail={(data: any) =>
            setDataSellectPreQuoteDetail(data)
          }
        />
      </div>

      <Paper className="shadow-none p-4 bgContainer mt-4">
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
            rows={preQuoteDetailData?.preOrderDetailView as []}
            columns={columns}
            gridProps={{
              loading: preQuoteDetailLoading || preQuoteDetailFetching,
              ...paginationProps,
            }}
            autoHeight={true}
            hideSearchbar={true}
            componentsProps={{
              row: {
                onMouseEnter: onMouseEnterRow,
              },
            }}
          />
        </ContextMenuWrapper>
      </Paper>

      <Paper className="grid grid-cols-4 gap-4 shadow-none p-4 mt-4">
        <div className="">
          <div className="font-bold text-sm mb-2">
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
          <div className=" font-bold text-sm mb-2">
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
          <div className=" font-bold text-sm mb-2">
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
          <div className=" font-bold text-sm mb-2">
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
        <BaseButton onClick={handleSubmit(onCreate)}>Tạo đơn hàng</BaseButton>
      </div>
    </div>
  );
};
