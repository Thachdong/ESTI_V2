import { Box, List, ListItem, Stack, Tooltip, Typography } from "@mui/material";
import moment from "moment";
import { _format } from "~modules-core/utility/fomat";
import { TGridColDef } from "~types/data-grid";

export const productColumns: TGridColDef[] = [
  {
    field: "no",
    headerName: "STT",
    width: 50,
  },
  {
    field: "productCode",
    headerName: "Mã SP",
    minWidth: 75,
  },
  {
    field: "productName",
    headerName: "Tên SP",
    minWidth: 250,
    flex: 1,
  },
  {
    field: "manufactor",
    headerName: "Hãng SX",
    minWidth: 100,
  },
  {
    field: "specs",
    headerName: "Quy cách",
    minWidth: 75,
  },
  {
    field: "unitName",
    headerName: "Đơn vị",
    minWidth: 75,
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Số lượng",
    minWidth: 75,
    flex: 1,
  },
  {
    field: "price",
    headerName: "Giá",
    minWidth: 100,
    flex: 1,
    renderCell: ({ row }) => _format.getVND(row.price),
  },
  {
    field: "vat",
    headerName: "Thuế GTGT",
    minWidth: 100,
    flex: 1,
  },
  {
    field: "totalPrice",
    headerName: "Thành tiền",
    minWidth: 120,
    flex: 1,
    renderCell: ({ row }) => {
      const { quantity, price, vat } = row || {};

      const total = quantity * price;

      const tax = (total * +vat) / 100;
      return (
        <Tooltip title={"Sau thuế: " + _format.getVND(total + tax)}>
          <Box>{_format.getVND(row.totalPrice)}</Box>
        </Tooltip>
      );
    },
  },
  {
    field: "note",
    headerName: "Ghi chú",
    minWidth: 80,
    flex: 1,
  },
];

export const feedbackColumns: TGridColDef[] = [
  {
    field: "created",
    headerName: "Thời gian",
    minWidth: 50,
    renderCell: ({ row }) =>
      row?.created ? moment(row?.created).format("DD/MM/YYYY") : "",
  },
  {
    field: "createdByName",
    headerName: "Nguồn gửi",
    minWidth: 150,
  },
  {
    field: "statusName",
    headerName: "Trạng thái",
    minWidth: 75,
  },
  {
    field: "titleMail",
    headerName: "Tiêu đề email",
    minWidth: 125,
    flex: 1,
  },
  {
    field: "note",
    headerName: "Nội dung email trao đổi",
    minWidth: 250,
    renderCell: ({ row }) => (
      <div dangerouslySetInnerHTML={{ __html: row?.note }} />
    ),
    flex: 1,
  },
  {
    field: "ListItem",
    headerName: "File đính kèm",
    minWidth: 150,
    renderCell: ({ row }) => {
      const { attachFile } = row || {};

      let files: any[] = [];

      try {
        files = attachFile?.split(",");
      } catch (error) {
        console.log(error);
      }

      if (files?.length === 0) {
        return (
          <Typography className="text-xs text-grey">
            (Không có file đính kèm)
          </Typography>
        );
      } else {
        return (
          <List className="truncate">
            {files.map((f: string, index: number) => (
              <ListItem key={index} className="truncate">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate"
                  href={f}
                >
                  {f}
                </a>
              </ListItem>
            ))}
          </List>
        );
      }
    },
    flex: 1,
  },
];
