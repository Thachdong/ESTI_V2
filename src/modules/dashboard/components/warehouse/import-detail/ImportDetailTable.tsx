import { Box, Paper, Typography } from "@mui/material";
import _ from "lodash";
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
import {
  DocumentDialog,
  ProductsDialog,
  StampDialog,
} from "~modules-dashboard/components";
import { productColumns } from "~modules-dashboard/pages/warehouse/import-detail/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { ImportDetailProductDialog } from "./ImportDetailProductDialog";

type TProps = {
  transactionData: any;
};

export const ImportDetailTable: React.FC<TProps> = ({ transactionData }) => {
  // LOCAL STATE AND EXTRACT PROPS
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const defaultValue = useRef<any>();

  const { importStatus } = transactionData || {};

  const { watch, setValue } = useFormContext();

  const { productList = [] } = watch();

  const disabled = importStatus !== undefined;

  const totalPrice = useMemo(
    () =>
      productList?.reduce(
        (total: number, product: any) => total + product?.totalPrice,
        0
      ),
    [productList]
  );

  // METHODS
  const handleClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const handleOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  const handleRemoveProduct = useCallback(() => {
    const { productName, rowId } = defaultValue.current || {};

    if (confirm("Xác nhận xóa SP: " + productName)) {
      const updatedProductList = productList.filter((p: any) => p?.rowId !== rowId);

      setValue("productList", updatedProductList);
    }
  }, [productList, defaultValue.current]);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = productList?.find((item: any) => item?.rowId === id);

    defaultValue.current = currentRow;
  };

  // DATA TABLE
  const renderContextMenu = useCallback(() => {
    switch (true) {
      case importStatus === undefined:
        return (
          <Menu className="p-0" id="product_table_menu">
            <Item
              id="update-product"
              onClick={() => handleOpen("UpdateProduct")}
            >
              Cập nhật
            </Item>

            <Item id="delete-product" onClick={handleRemoveProduct}>
              Xóa
            </Item>
          </Menu>
        );
      case importStatus === 0:
        return (
          <Menu className="p-0" id="product_table_menu">
            <Item
              id="update-product"
              onClick={() => handleOpen("UpdateProduct")}
            >
              Cập nhật
            </Item>

            <Item id="delete-product" onClick={() => handleOpen("CopyProduct")}>
              Sao chép SP
            </Item>
          </Menu>
        );
      case importStatus > 0:
        return (
          <Menu className="p-0" id="product_table_menu">
            <Item
              id="view-product-document"
              // onClick={() => handleOpen("Update")}
            >
              Xem tài liệu SP
            </Item>

            <Item
              id="create-product-document"
              onClick={() => handleOpen("CreateDocument")}
            >
              Tạo tài liệu SP
            </Item>

            <Item
              id="create-product-label"
              onClick={() => handleOpen("CreateLabel")}
            >
              Tạo nhãn SP
            </Item>
          </Menu>
        );
    }
  }, [importStatus, productList]);

  const renderActionButtons = useCallback(
    (row: any) => {
      switch (true) {
        case importStatus === undefined:
          return (
            <DropdownButton
              id={row?.id}
              items={[
                {
                  action: () => handleOpen("UpdateProduct"),
                  label: "Cập nhật SP",
                },
                {
                  action: handleRemoveProduct,
                  label: "Xóa SP",
                },
              ]}
            />
          );
        case importStatus === 0:
          return (
            <DropdownButton
              id={row?.id}
              items={[
                {
                  action: () => handleOpen("UpdateProduct"),
                  label: "Cập nhật SP",
                },
                {
                  action: () => handleOpen("CopyProduct"),
                  label: "Sao chép SP",
                },
              ]}
            />
          );
        case importStatus > 0:
          return (
            <DropdownButton
              id={row?.id}
              items={[
                {
                  action: () => handleOpen("Update"),
                  label: "Xem tài liệu SP",
                },
                {
                  action: () => handleOpen("CreateDocument"),
                  label: "Tạo tài liệu SP",
                },
                {
                  action: () => handleOpen("CreateLabel"),
                  label: "Tạo nhãn SP",
                },
              ]}
            />
          );
      }
    },
    [importStatus]
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

  return (
    <Paper className="rounded-sm p-3">
      <Box className="flex items-center mb-3">
        <Typography className="text-sm font-medium flex-grow">
          SẢN PHẨM
        </Typography>
        <Box className="flex justify-end">
          <AddButton
            onClick={() => handleOpen("AddProduct")}
            variant="contained"
            className="mr-3"
            disabled={disabled}
          >
            Thêm SP
          </AddButton>
          <AddButton
            variant="contained"
            onClick={() => handleOpen("CreateProduct")}
            disabled={disabled}
          >
            Tạo SP mới
          </AddButton>
        </Box>
      </Box>

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
          hideFooterPagination
          componentsProps={{
            row: {
              onMouseEnter: onMouseEnterRow,
            },
          }}
          getRowId={(record) => record.rowId}
        />
      </ContextMenuWrapper>

      <Typography className="my-3">
        Tổng cộng tiền thanh toán(VNĐ):
        <strong> {_format.getVND(totalPrice)}</strong>
      </Typography>

      {/* IMPLEMENT TRANSACTION DIALOG */}
      <ImportDetailProductDialog
        onClose={handleClose}
        open={Boolean(dialog.open && dialog?.type?.includes?.("Product"))}
        type={dialog?.type}
        defaultValue={defaultValue.current}
      />

      {/* ADD PRODUCT DIALOG */}
      <ProductsDialog
        onClose={handleClose}
        open={dialog.open && dialog?.type === "CreateProduct"}
        type="Add"
      />

      {/* PRODUCT DOCUMENT DIALOG */}
      <DocumentDialog
        onClose={handleClose}
        open={!!dialog?.open && dialog?.type === "CreateDocument"}
        type="AddFromAnotherRoute"
        defaultValue={defaultValue.current}
      />

      {/* STAMP DIALOG */}
      <StampDialog
        onClose={handleClose}
        open={dialog?.open && dialog?.type === "CreateLabel"}
        type="AddFromAnotherRoute"
        defaultValue={defaultValue.current}
      />
    </Paper>
  );
};
