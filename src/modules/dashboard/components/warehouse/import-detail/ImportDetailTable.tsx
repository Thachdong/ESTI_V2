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
    const { productName, no } = defaultValue.current || {};

    if (confirm("Xác nhận xóa SP: " + productName)) {
      const updatedProductList = productList.filter((p: any) => p?.no !== no);

      setValue("productList", updatedProductList);
    }
  }, [productList, defaultValue]);

  const handleAddProduct = useCallback(
    (product: any) => {
      setValue("productList", [
        ...productList,
        {
          ...product,
          no: productList.length + 1,
          id: dialog.type === "Copy" ? null : product?.id,
        },
      ]);
    },
    [productList, setValue, dialog.type]
  );

  const handleUpdateProduct = useCallback(
    (product: any) => {
      const updatedProductList = productList.map((p: any) =>
        p.no === product.no ? { ...product } : { ...p }
      );

      setValue("productList", updatedProductList);
    },
    [productList, setValue]
  );

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = productList?.find(
      (item: any) => item.no?.toString() === id
    );

    defaultValue.current = currentRow;
  };

  // DATA TABLE
  const renderContextMenu = useCallback(() => {
    switch (true) {
      case importStatus === undefined:
        return (
          <Menu className="p-0" id="product_table_menu">
            <Item id="update-product" onClick={() => handleOpen("Update")}>
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
            <Item id="update-product" onClick={() => handleOpen("Update")}>
              Cập nhật
            </Item>

            <Item id="delete-product" onClick={() => handleOpen("Copy")}>
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
  }, [importStatus]);

  const renderActionButtons = useCallback(
    (row: any) => {
      switch (true) {
        case importStatus === undefined:
          return (
            <DropdownButton
              id={row?.id}
              items={[
                {
                  action: () => handleOpen("Update"),
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
                  action: () => handleOpen("Update"),
                  label: "Cập nhật SP",
                },
                {
                  action: () => handleOpen("Copy"),
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
            onClick={() => handleOpen("Add")}
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
          rows={productList}
          columns={columns}
          autoHeight={true}
          hideSearchbar={true}
          getRowId={(row) => row.no}
          hideFooter
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

      <ImportDetailProductDialog
        onClose={handleClose}
        open={
          dialog.open &&
          (dialog?.type === "Add" ||
            dialog?.type === "Update" ||
            dialog?.type === "Copy")
        }
        type={dialog?.type}
        addProduct={handleAddProduct}
        updateProduct={handleUpdateProduct}
        defaultValue={defaultValue.current}
      />

      <ProductsDialog
        onClose={handleClose}
        open={dialog.open && dialog?.type === "CreateProduct"}
        type="Add"
      />

      <DocumentDialog
        onClose={handleClose}
        open={!!dialog?.open && dialog?.type === "CreateDocument"}
        type="AddFromAnotherRoute"
        defaultValue={defaultValue.current}
      />

      <StampDialog
        onClose={handleClose}
        open={dialog?.open && dialog?.type === "CreateLabel"}
        type="AddFromAnotherRoute"
        defaultValue={defaultValue.current}
      />
    </Paper>
  );
};
