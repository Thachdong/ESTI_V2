import {
  Box,
  ButtonBase,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { method } from "lodash";
import { useRouter } from "next/router";
import { useCallback, useMemo, useRef, useState } from "react";
import { Item, Menu } from "react-contexify";
import { useFormContext } from "react-hook-form";
import { useMutation } from "react-query";
import { preQuote } from "src/api";
import {
  AddButton,
  ContextMenuWrapper,
  DataTable,
  DropdownButton,
  FormInputNumber,
} from "~modules-core/components";
import { toast } from "~modules-core/toast";
import { _format } from "~modules-core/utility/fomat";
import { productColumns } from "~modules-dashboard/pages/quotation/quote-detail/data";
import { TGridColDef } from "~types/data-grid";
import { TDefaultDialogState } from "~types/dialog";
import { AskPriceDialog } from "./AskPriceDialog";
import { QuoteDetailDialog } from "./QuoteDetailDialog";

type TProps = {
  data?: any;
  disabled: boolean;
  refetch: () => void;
};

export const QuoteDetailProduct: React.FC<TProps> = ({
  data,
  disabled,
  refetch,
}) => {
  const { id } = useRouter().query;

  const [dialog, setDialog] = useState<TDefaultDialogState>();

  const defaultValue = useRef<any>();

  const { watch, setValue, control } = useFormContext();

  const products = watch("products");

  // METHODS
  const onClose = useCallback(() => {
    setDialog({ open: false });
  }, []);

  const onOpen = useCallback((type: string) => {
    setDialog({ open: true, type });
  }, []);

  const handleDelete = useCallback(() => {
    const { productCode, no } = defaultValue.current || {};

    if (confirm("Xác nhận xóa SP: " + productCode)) {
      setValue(
        "products",
        products.filter((prod: any) => prod?.no !== no)
      );
    }
  }, [defaultValue, products]);

  const onMouseEnterRow = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id;

    const currentRow = products.find((item: any) => item.id === id);

    defaultValue.current = currentRow;
  };

  const getPrice = useMemo(() => {
    if (data) {
      return {
        totalPrice: _format.getVND(data?.totalPriceNotTax || 0),
        totalTax: _format.getVND(data?.totalTax || 0),
        finalPrice: _format.getVND(data?.totalPrice || 0),
      };
    } else {
      const initResult = {
        totalPrice: 0,
        totalTax: 0,
        finalPrice: 0,
      };
      return products.reduce(
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
    }
  }, [data, products]);

  const mutateSelect = useMutation(
    (payload: { id: string; selected: boolean }) =>
      preQuote.selectProduct(payload),
    {
      onSuccess: (data: any) => {
        toast.success(data?.resultMessage);

        refetch();
      },
    }
  );

  const handleSelect = useCallback(async (row: any) => {
    const { id, productCode, selected } = row || {};

    const title = !selected
      ? `Xác nhận thêm SP ${productCode} vào danh sách gửi mail báo giá`
      : `Xác nhận không gửi SP ${productCode} vào mail báo giá`;

    if (confirm(title)) {
      await mutateSelect.mutateAsync({ id: id as string, selected: !selected });
    }
  }, []);

  // DATA TABLE
  const columns: TGridColDef[] = [
    ...productColumns,
    {
      field: "action",
      headerName: "",
      width: 50,
      renderCell: ({ row }) => (
        <DropdownButton
          id={row?.id}
          items={[
            {
              action: () => onOpen("Update"),
              label: "Thông tin chi tiết",
              disabled: disabled,
            },
            {
              action: handleDelete,
              label: "Xóa",
              disabled: disabled || !!id,
            },
          ]}
        />
      ),
    },
  ];

  if (!!id) {
    columns.splice(
      1,
      0,
      {
        field: "selectAction",
        headerName: "Chọn báo giá",
        minWidth: 120,
        renderCell: ({ row }) => (
          <FormControlLabel
            control={<Checkbox size="small" />}
            label=""
            className="col-span-2"
            value={row?.selected}
            onChange={(e: any) => handleSelect(row)}
            checked={row?.selected}
          />
        ),
      },
      {
        field: "askPriceAction",
        headerName: "Hỏi giá",
        minWidth: 120,
        renderCell: ({ row }) => (
          <ButtonBase
            onClick={() => onOpen("askPrice")}
            className="bg-main text-white rounded-md p-1"
          >
            Tạo hỏi giá
          </ButtonBase>
        ),
      }
    );
  }

  return (
    <Box className="flex flex-col col-span-2">
      <Box className="flex items-center mb-3 justify-between">
        <Typography className="font-bold uppercase mr-3 text-sm">
          Sản phẩm
        </Typography>

        <AddButton disabled={!!id} onClick={() => onOpen("Add")}>
          Thêm SP
        </AddButton>
      </Box>

      <Box className="bg-white">
        <ContextMenuWrapper
          menuId="product_table_menu"
          menuComponent={
            <Menu className="p-0" id="product_table_menu">
              <Item
                disabled={disabled}
                id="view-product"
                onClick={() => onOpen("Update")}
              >
                Cập nhật
              </Item>
              <Item
                disabled={disabled || !!id}
                id="delete-product"
                onClick={handleDelete}
              >
                Xóa
              </Item>
            </Menu>
          }
        >
          <DataTable
            columns={columns}
            rows={products.map((prod: any, index: number) => ({
              ...prod,
              no: index + 1,
            }))}
            hideFooter
            hideSearchbar
            autoHeight
            componentsProps={{
              row: {
                onMouseEnter: onMouseEnterRow,
              },
            }}
            paginationMode="client"
          />
        </ContextMenuWrapper>

        <List className="border-0 border-t border-solid border-grey-3 p-0">
          <ListItem className="text-sm grid grid-cols-5 items-center gap-3 py-1 border-b border-0 border-dashed border-grey-3">
            <span className="font-semibold col-span-4 text-right">
              Thành tiền chưa có thuế(VNĐ):
            </span>{" "}
            <span className="text-base">
              {" "}
              {_format.getVND(getPrice.totalPrice)}
            </span>
          </ListItem>

          <ListItem className="text-sm grid grid-cols-5 items-center gap-3 py-1 border-b border-0 border-dashed border-grey-3">
            <span className="font-semibold col-span-4 text-right">
              Thuế GTGT(VNĐ):
            </span>{" "}
            <span className="text-base">
              {" "}
              {_format.getVND(getPrice.totalTax)}
            </span>
          </ListItem>

          <ListItem className="text-sm grid grid-cols-5 items-center gap-3 py-1 border-b border-0 border-dashed border-grey-3">
            <span className="font-semibold col-span-4 text-right">
              Tổng cộng tiền thanh toán(VNĐ):
            </span>
            <span className="text-base">
              {" "}
              {_format.getVND(getPrice.finalPrice)}
            </span>
          </ListItem>

          <ListItem className="text-sm grid grid-cols-5 items-center gap-3 py-1">
            <span className="font-semibold col-span-4 text-right">
              Tiền hoa hồng(VNĐ):
            </span>
            <FormInputNumber
              controlProps={{
                control,
                name: "commission",
              }}
              shrinkLabel
            />
          </ListItem>
        </List>
      </Box>

      <QuoteDetailDialog
        onClose={onClose}
        open={!!dialog?.open && dialog?.type !== "askPrice"}
        type={dialog?.type}
        defaultValue={defaultValue.current}
      />

      <AskPriceDialog
        onClose={onClose}
        open={!!dialog?.open && dialog?.type === "askPrice"}
        defaultValue={defaultValue.current}
      />
    </Box>
  );
};
