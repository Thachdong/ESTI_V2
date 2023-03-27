import { Box, List, ListItem, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useFormContext } from "react-hook-form";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
} from "~modules-core/components";
import { _format } from "~modules-core/utility/fomat";
import { productColumns } from "~modules-dashboard/pages/warehouse/export-detail/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { ExportDetailProductDialog } from "./ExportDetailProductDialog";

type TProps = {
  productOptions: any[];
  getWarehouseConfig: () => {
    warehouseConfigId: string;
    warehouseConfigCode: string;
  };
  transactionData: any;
};

export const ExportDetailProducts: React.FC<TProps> = ({
  productOptions,
  getWarehouseConfig,
  transactionData
}) => {
  // EXTRACT PROPS
  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const {exportStatus} = transactionData || {};

  const router = useRouter();

  const defaultValue = useRef<any>();

  const { watch, setValue } = useFormContext();

  const { id } = useRouter().query;

  const { productList = [] } = watch();

  const totalPrice = useMemo(
    () =>
      productList.reduce(
        (total: number, product: any) => total + product?.totalPrice,
        0
      ),
    [productList]
  );

  // DIALOG METHODS
  const handleOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  const onCloseDialog = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const handleDeleteProduct = useCallback(() => {
    const { productCode, id } = defaultValue.current || {};

    if (!productCode) return;

    if (confirm("Xác nhận xóa SP: " + productCode)) {
      const updatedProductList = productList.filter(
        (prod: any) => prod?.id !== id
      );

      setValue("productList", updatedProductList);
    }
  }, [defaultValue, productList]);

  const getPrice = useMemo(() => {
    if (transactionData) {
      return {
        totalPrice: _format.getVND(transactionData?.totalPriceNotTax),
        totalTax: _format.getVND(transactionData?.totalTax),
        finalPrice: _format.getVND(transactionData?.totalPrice),
      };
    } else {
      const initResult = {
        totalPrice: 0,
        totalTax: 0,
        finalPrice: 0,
      };

      const resultObj = productList.reduce(
        (result: any, { price = 0, quantity = 0, vat = 0 }: any) => {
          const total = quantity * price;

          const tax = (total * vat) / 100;

          return {
            totalPrice: result?.totalPrice + total,
            totalTax: result?.totalTax + tax,
            finalPrice: result?.finalPrice + total + tax,
          };
        },
        initResult
      );

      return {
        totalPrice: _format.getVND(resultObj.totalPrice),
        totalTax: _format.getVND(resultObj.totalTax),
        finalPrice: _format.getVND(resultObj.finalPrice),
      };
    }
  }, [transactionData, productList]);

  // DATA TABLE
  const renderContextMenu = useCallback(() => {
    switch (true) {
      case exportStatus === undefined:
        return (
          <Menu className="p-0" id="product_table_menu">
            <Item id="update-product" onClick={() => handleOpen("Update")}>
              Cập nhật
            </Item>

            <Item id="delete-product" onClick={() => handleOpen("Copy")}>
              Sao chép SP
            </Item>

            <Item id="delete-product" onClick={handleDeleteProduct}>
              Xóa
            </Item>
          </Menu>
        );
      case exportStatus === 0:
        return (
          <Menu className="p-0" id="product_table_menu">
            <Item id="update-product" onClick={() => handleOpen("Update")}>
              Cập nhật
            </Item>

            <Item id="delete-product" onClick={() => handleOpen("Copy")}>
              Sao chép SP
            </Item>

            <Item
              id="view-product-document"
              onClick={() =>
                router.push({
                  pathname: "/dashboard/product-manage/documents/",
                  query: {
                    productName: defaultValue?.current?.productName,
                    lotNumber: defaultValue?.current?.lotNumber,
                  },
                })
              }
            >
              Xem tài liệu SP
            </Item>
          </Menu>
        );
      case exportStatus > 0:
        return (
          <Menu className="p-0" id="product_table_menu">
            <Item
              id="view-product-document"
              onClick={() =>
                router.push({
                  pathname: "/dashboard/product-manage/documents/",
                  query: {
                    productName: defaultValue?.current?.productName,
                    lotNumber: defaultValue?.current?.lotNumber,
                  },
                })
              }
            >
              Xem tài liệu SP
            </Item>
          </Menu>
        );
    }
  }, [exportStatus, productList, defaultValue.current]);

  const renderActionButtons = useCallback(
    (row: any) => {
      switch (true) {
        case exportStatus === undefined:
          return (
            <DropdownButton
              id={row?.id}
              items={[
                {
                  action: () => handleOpen("Update"),
                  label: "Cập nhật SP",
                },
                {
                  action: () => handleOpen("Copy"),
                  label: "Sao chép SP",
                },
                {
                  action: handleDeleteProduct,
                  label: "Xóa SP",
                },
              ]}
            />
          );
        case exportStatus === 0:
          return (
            <DropdownButton
              id={row?.id}
              items={[
                {
                  action: () => handleOpen("Update"),
                  label: "Cập nhật SP",
                },
                {
                  action: () => handleOpen("Copy"),
                  label: "Sao chép SP",
                },
                {
                  action: () =>
                    router.push({
                      pathname: "/dashboard/product-manage/documents/",
                      query: {
                        productName: defaultValue?.current?.productName,
                        lotNumber: defaultValue?.current?.lotNumber,
                      },
                    }),
                  label: "Xem tài liệu SP",
                },
              ]}
            />
          );
        case exportStatus > 0:
          return (
            <DropdownButton
              id={row?.id}
              items={[
                {
                  action: () =>
                    router.push({
                      pathname: "/dashboard/product-manage/documents/",
                      query: {
                        productName: defaultValue?.current?.productName,
                        lotNumber: defaultValue?.current?.lotNumber,
                      },
                    }),
                  label: "Xem tài liệu SP",
                },
              ]}
            />
          );
      }
    },
    [exportStatus, defaultValue.current]
  );

  const columns: TGridColDef[] = [
    ...productColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => renderActionButtons(row),
    },
  ];

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = productList.find((item: any) => item.id?.toString() === id);

    defaultValue.current = currentRow;
  };

  return (
    <Box className="">
      <Box className="flex justify-between items-end mb-3">
        <Typography className="text-sm font-medium flex-grow">
          SẢN PHẨM
        </Typography>

        <AddButton
          disabled={!!id}
          onClick={() => handleOpen("Add")}
          variant="contained"
        >
          Thêm sản phẩm
        </AddButton>
      </Box>

      <Box className="bg-white">
        <ContextMenuWrapper
          menuId="product_table_menu"
          menuComponent={renderContextMenu()}
        >
          <DataTable
            rows={productList?.map((prod: any, index: number) => ({
              ...prod,
              no: index + 1,
            }))}
            columns={columns}
            autoHeight
            hideSearchbar
            hideFooter
            componentsProps={{
              row: {
                onMouseEnter: onMouseEnterRow,
              },
            }}
            paginationMode="client"
            className=""
          />
        </ContextMenuWrapper>

        <List className="border-0 border-t border-solid border-grey-3 p-0 pb-1">
          <ListItem className="text-sm grid grid-cols-5 items-center gap-3 py-1 border-b border-0 border-dashed border-grey-3">
            <span className="font-semibold col-span-4 text-right">
              {" "}
              Thành tiền chưa có thuế(VNĐ):
            </span>{" "}
            <span className="text-base">{getPrice.totalPrice}</span>
          </ListItem>
          <ListItem className="text-sm grid grid-cols-5 items-center gap-3 py-1 border-b border-0 border-dashed border-grey-3">
            <span className="font-semibold col-span-4 text-right">
              Thuế GTGT(VNĐ):{" "}
            </span>
            <span className="text-base">{getPrice.totalTax}</span>
          </ListItem>
          <ListItem className="text-sm grid grid-cols-5 items-center gap-3 py-1">
            <span className="font-semibold col-span-4 text-right">
              Tổng cộng tiền thanh toán(VNĐ):
            </span>{" "}
            <span className="text-base">{getPrice.finalPrice}</span>
          </ListItem>
        </List>
      </Box>

      <ExportDetailProductDialog
        onClose={onCloseDialog}
        open={!!dialog?.open}
        type={dialog?.type}
        defaultValue={defaultValue.current}
        getWarehouseConfig={getWarehouseConfig}
        productOptions={productOptions}
      />
    </Box>
  );
};
