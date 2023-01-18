import { Box, Paper, Typography } from "@mui/material";
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
  warehouseConfig: any;
  exportStatus: number
};

export const ExportDetailProducts: React.FC<TProps> = ({
  productOptions,
  warehouseConfig,
  exportStatus
}) => {
  // EXTRACT PROPS
  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const defaultValue = useRef<any>();

  const { watch, setValue } = useFormContext();

  const { transactionId } = useRouter().query;

  const productList =
    watch("productList")?.map((prod: any, index: number) => ({
      ...prod,
      no: index + 1,
    })) || [];

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

  const productListOperators = {
    add: (product: any) => {
      setValue("productList", [...productList, { ...product }]);
    },
    update: (product: any) => {
      const updatedProductList = productList.map((prod: any) =>
        prod?.no === product?.no ? { ...product } : { ...prod }
      );

      setValue("productList", updatedProductList);
    },
    delete: (no: number) => {
      const updatedProductList = productList.filter(
        (prod: any) => prod?.no !== no
      );

      setValue("productList", updatedProductList);
    },
  };

  const handleDeleteProduct = useCallback(() => {
    const {productCode, no} = defaultValue.current || {};

    if (!productCode) return;

    if (confirm("Xác nhận xóa SP: " + productCode)) {
      productListOperators.delete(no);
    }
  }, [defaultValue]);

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

            <Item id="view-product-document">Xem tài liệu SP</Item>
          </Menu>
        );
      case exportStatus > 0:
        return (
          <Menu className="p-0" id="product_table_menu">
            <Item id="view-product-document">Xem tài liệu SP</Item>
          </Menu>
        );
    }
  }, [exportStatus]);

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
                  action: () => console.log("Xem tài liệu SP"),
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
                  action: () => console.log("Xem tài liệu SP"),
                  label: "Xem tài liệu SP",
                },
              ]}
            />
          );
      }
    },
    [exportStatus]
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

    const currentRow = productList.find(
      (item: any) => item.no?.toString() === id
    );

    defaultValue.current = currentRow;
  };

  return (
    <Paper className="rounded-sm p-3">
      <Box className="flex justify-between items-center mb-3">
        <Typography className="text-sm font-medium flex-grow">
          SẢN PHẨM
        </Typography>

        <AddButton
          disabled={!!transactionId}
          onClick={() => handleOpen("Add")}
          variant="contained"
        >
          Thêm sản phẩm
        </AddButton>
      </Box>

      <ContextMenuWrapper
        menuId="product_table_menu"
        menuComponent={renderContextMenu()}
      >
        <DataTable
          rows={productList}
          columns={columns}
          autoHeight={true}
          hideSearchbar={true}
          hideFooter
          getRowId={(row) => row.no}
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
            },
          }}
          paginationMode="client"
        />
      </ContextMenuWrapper>

      <Typography className="my-3">
        Tổng cộng tiền thanh toán(VNĐ):
        <strong> {_format.getVND(totalPrice)}</strong>
      </Typography>

      <ExportDetailProductDialog
        onClose={onCloseDialog}
        open={!!dialog?.open}
        type={dialog?.type}
        defaultValue={defaultValue.current}
        warehouseConfig={warehouseConfig}
        productOptions={productOptions}
        productListOperators={productListOperators}
      />
    </Paper>
  );
};
