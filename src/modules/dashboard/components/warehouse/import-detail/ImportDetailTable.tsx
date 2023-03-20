import { Box, Typography } from "@mui/material";
import _ from "lodash";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
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
  StampDetailDialog,
  StampDialog,
} from "~modules-dashboard/components";
import { productColumns } from "~modules-dashboard/pages/warehouse/import-detail/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { ImportDetailProductDialog } from "./ImportDetailProductDialog";

type TProps = {
  transactionData: any;
  warehouseConfigId: string;
};

export const ImportDetailTable: React.FC<TProps> = ({
  transactionData,
  warehouseConfigId,
}) => {
  // LOCAL STATE AND EXTRACT PROPS
  const [dialog, setDialog] = useState<TDefaultDialogState>({ open: false });

  const [defaultValue, setDefaultValue] = useState<any>();

  const router = useRouter();

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
    const { productName, rowId } = defaultValue || {};

    if (confirm("Xác nhận xóa SP: " + productName)) {
      const updatedProductList = productList.filter(
        (p: any) => p?.rowId !== rowId
      );

      setValue("productList", updatedProductList);
    }
  }, [productList, defaultValue]);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = productList?.find((item: any) => item?.rowId === id);

    setDefaultValue(currentRow);
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
            <Item id="view-product-document">
              <a
                target="_blank"
                href={`/public/documents/?productId=${defaultValue?.productId}&productCode=${defaultValue?.productCode}&lotNumber=${defaultValue?.lotNumber}&importId=${router.query.id}`}
                rel="noopener noreferrer"
                className="no-underline !text-[#504e4e]"
              >
                Xem tài liệu SP
              </a>
            </Item>

            <Item
              id="create-product-document"
              onClick={() => handleOpen("CreateDocument")}
            >
              Tạo tài liệu SP
            </Item>

            {!!defaultValue?.productLabelId ? (
              <Item
                id="create-product-label"
                onClick={() => handleOpen("ViewLabel")}
              >
                Xem nhãn SP
              </Item>
            ) : (
              <Item
                id="create-product-label"
                onClick={() => handleOpen("CreateLabel")}
              >
                Tạo nhãn SP
              </Item>
            )}
          </Menu>
        );
    }
  }, [importStatus, productList, defaultValue]);

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
                  action: () => console.log(),
                  label: (
                    <a
                      target="_blank"
                      href={`/public/documents/?productId=${defaultValue?.productId}&productCode=${defaultValue?.productCode}&lotNumber=${defaultValue?.lotNumber}&importId=${router.query.id}`}
                      rel="noopener noreferrer"
                      className="no-underline !text-[#504e4e]"
                    >
                      Xem tài liệu SP
                    </a>
                  ),
                },
                {
                  action: () => handleOpen("CreateDocument"),
                  label: "Tạo tài liệu SP",
                },
                {
                  action: () =>
                    handleOpen(
                      defaultValue?.productLabelId ? "ViewLabel" : "CreateLabel"
                    ),
                  label: defaultValue?.productLabelId
                    ? "Xem nhãn SP"
                    : "Tạo nhãn SP",
                },
              ]}
            />
          );
      }
    },
    [importStatus, defaultValue]
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

  const renderStampDialog = useCallback(() => {
    const { productLabelId } = defaultValue || {};

    const { type, open } = dialog || {};

    if (!!productLabelId) {
      return (
        <StampDetailDialog
          onClose={handleClose}
          open={open && type === "ViewLabel"}
          type={"ViewLabel"}
          defaultValue={{ ...defaultValue } as any}
        />
      );
    } else {
      const historyPayload = {
        warehouseSessionId: router.query.id,
        lotNumber: defaultValue?.lotNumber,
        quantity: defaultValue?.quantity,
        positionId: defaultValue?.positionId,
        dateManufacture: defaultValue?.dateManufacture,
        dateExpiration: defaultValue?.dateExpiration,
      };

      return (
        <StampDialog
          onClose={handleClose}
          open={open && type === "CreateLabel"}
          type={"CreateLabel"}
          defaultValue={{ id: productLabelId } as any}
          historyPayload={historyPayload}
        />
      );
    }
  }, [defaultValue, dialog]);

  return (
    <Box className="">
      <Box className="flex items-center mb-3">
        <Typography className="text-sm font-semibold flex-grow">
          SẢN PHẨM
        </Typography>
        <Box className="flex justify-end ">
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
            onClick={() =>
              router.push("/dashboard/product-manage/product-detail/")
            }
            disabled={disabled}
          >
            Tạo SP mới
          </AddButton>
        </Box>
      </Box>
      <Box className="rounded bg-white">
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

        <Box className="border-0 border-t border-solid border-grey-3 pb-1">
          <Typography className="text-sm grid grid-cols-5 items-center gap-3 py-1">
            <span className="font-semibold col-span-4 text-right">
              {" "}
              Tổng cộng tiền thanh toán(VNĐ):
            </span>
            <span className="text-base"> {_format.getVND(totalPrice)}</span>
          </Typography>
        </Box>
      </Box>
      {/* IMPLEMENT TRANSACTION DIALOG */}
      <ImportDetailProductDialog
        onClose={handleClose}
        open={Boolean(dialog.open && dialog?.type?.includes?.("Product"))}
        type={dialog?.type}
        defaultValue={defaultValue}
        warehouseConfigId={warehouseConfigId}
      />

      {/* PRODUCT DOCUMENT DIALOG */}
      <DocumentDialog
        onClose={handleClose}
        open={!!dialog?.open && dialog?.type === "CreateDocument"}
        type="AddFromAnotherRoute"
        defaultValue={
          {
            productId: defaultValue?.productId,
            lotNumber: defaultValue?.lotNumber,
          } as any
        }
      />

      {/* STAMP DIALOG */}
      {renderStampDialog()}
    </Box>
  );
};
