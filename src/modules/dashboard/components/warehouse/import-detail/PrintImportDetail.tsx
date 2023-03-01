import React from "react";
import {
  Box,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import style from "./index.module.scss";
import { _format } from "~modules-core/utility/fomat";

export const PrintImportDetail: React.FC<{
  printAreaRef: any;
  defaultValue: any;
}> = ({ defaultValue, printAreaRef }) => {
  const { warehouse, warehouseSession } = defaultValue || {};

  const rows: any = [{ send: "Phuc", recive: "Phuc" }];
  const rowsInfo: any = [
    {
      code: "ÐH22-03848",
      numberOrder: "311111111111",
      dateOrder: "20/02/2023",
      paymentLitmit: "NET 7 (7 ngày)",
    },
  ];
  const rowsOrder: any = [
    {
      code: "B108735-25G",
      info: "B108735-25G Hóa chất Pararosaniline hydrochloride",
      specifications: "25 G",
      unit: " Chai",
      quantity: "1",
      price: 111111,
      intomoney: 111111,
      note: "",
      producer: "Aladdin",
      origin: "Trung Quốc",
      lot: "20D214108",
      gtgt: "10 %",
      locationSave: "T11",
    },
    {
      code: "B108735-25G",
      info: "B108735-25G Hóa chất Pararosaniline hydrochloride",
      specifications: "25 G",
      unit: " Chai",
      quantity: "1",
      price: 111111,
      intomoney: 111111,
      note: "",
      producer: "Aladdin",
      origin: "Trung Quốc",
      lot: "20D214108",
      gtgt: "5 %",
      locationSave: "T3",
    },
  ];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#051e34",
      color: theme.palette.common.white,
      padding: 5,
      border: 0.5,
      borderStyle: "solid",
      borderColor: "#000",
      fontSize: "10pt",
      fontWeight: 600,
      whiteSpace: "nowrap",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 12,
      padding: 8,
      border: 0.5,
      borderStyle: "solid",
      borderColor: "#000",
    },
  }));

  return (
    <Table
      style={{ fontSize: "10pt" }}
      ref={printAreaRef}
      className={style.PrintContainer}
    >
      {/* HEADER */}
      <TableHead>
        <TableRow className={style.Header}>
          <Box className={style.logoHeader}>
            <img
              src="/logo-full.png"
              alt="logo-navis"
              width={180}
              height={80}
            />
          </Box>
          <Box className={style.contentHeader}>
            <p className={style.contentTitleHeader}>PHIẾU NHẬP KHO</p>
            <p>Ngày tạo: 23/02/2023</p>
            <p>Mã đơn mua hàng: KH-346</p>
            <p>Mã nhập kho: ĐH23-03856</p>
          </Box>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <Box className={style.InforOrder}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>STT</StyledTableCell>
                  <StyledTableCell align="left">Mã SP</StyledTableCell>
                  <StyledTableCell align="left">Thông tin SP</StyledTableCell>
                  <StyledTableCell align="left">Quy cách</StyledTableCell>
                  <StyledTableCell align="left">Đơn vị</StyledTableCell>
                  <StyledTableCell align="center">Số lượng</StyledTableCell>
                  <StyledTableCell align="center">Đơn giá</StyledTableCell>
                  <StyledTableCell align="center">Thuế GTGT</StyledTableCell>
                  <StyledTableCell align="center">Thành tiền</StyledTableCell>
                  <StyledTableCell align="left">Vị trí lưu</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={style.tableBody}>
                {warehouse?.map((row: any, index: number) => (
                  <TableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row?.productCode}
                    </StyledTableCell>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      sx={{ minWidth: "200px" }}
                    >
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        {row?.productName}
                      </Typography>
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        Nhà sản xuất: {row?.manufactor}
                      </Typography>
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        Xuất sứ: {row?.origin}
                      </Typography>
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        LOT : {row?.lotNumber}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      {row?.specs}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {" "}
                      {row?.unitName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      {row?.quantity}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      {_format.getVND(row?.price)}
                    </StyledTableCell>
                    <StyledTableCell align="left"> {row?.gtgt}</StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      {_format.getVND(row?.totalPrice)}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {" "}
                      {row?.positionName}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box className={style.paymentOrder}>
              <Box className={style.paymentItemOrder}>
                <span className={style.title}>
                  Thành tiền chưa có thuế(VNÐ):
                </span>{" "}
                <span>
                  {_format.getVND(warehouseSession?.totalPriceNotTax)}
                </span>
              </Box>
              <Box className={style.paymentItemOrder}>
                <span className={style.title}>Thuế GTGT:</span>{" "}
                <span>{_format.getVND(warehouseSession?.totalTax)}</span>
              </Box>
              <Box className={style.paymentItemOrder}>
                <span className={style.title}>
                  Tổng cộng tiền thanh toán(VNÐ):
                </span>{" "}
                <span>{_format.getVND(warehouseSession?.totalPrice)}</span>
              </Box>
            </Box>
          </Box>
        </TableRow>
      </TableBody>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "60%",
          margin: "auto",
        }}
      >
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              marginTop: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "10pt",
              }}
            >
              NGƯỜI NHẬP KHO
            </Typography>
            <Typography
              sx={{
                fontSize: "10pt",
                fontStyle: "italic",
              }}
            >
              {"(Ký và ghi rõ họ tên)"}
            </Typography>
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              marginTop: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "10pt",
              }}
            >
              THỦ KHO
            </Typography>
            <Typography
              sx={{
                fontSize: "10pt",
                fontStyle: "italic",
              }}
            >
              {"(Ký và ghi rõ họ tên)"}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Table>
  );
};
