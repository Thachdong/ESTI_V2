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

export const PrintQuoteRequest: React.FC<{
  printAreaRef: any;
  defaultValue: any;
}> = ({ defaultValue, printAreaRef }) => {
  const { preOrderDetailView, preOrderView } = defaultValue || [];

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
            <p className={style.contentTitleHeader}>ĐƠN YÊU CẦU BÁO GIÁ</p>
            <p>Ngày yêu cầu: {_format.converseDate(preOrderView?.created)}</p>
            <p>Mã khách hàng: {preOrderView?.customerCode}</p>
            <p>Số yêu cầu: {preOrderView?.preOrderCode}</p>
          </Box>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <Box className={style.InforDeliveries}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Thông tin người gửi</StyledTableCell>
                  <StyledTableCell align="left">
                    Thông tin người nhận
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={style.tableBody}>
                <TableRow>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    sx={{ width: "50%" }}
                  >
                    <Typography sx={{ fontWeight: 600, fontSize: "10pt" }}>
                      {preOrderView?.companyName}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Mã số thuế: {preOrderView?.companyTaxCode}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Ðịa chỉ: {preOrderView?.companyAddress}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Người liên hệ: {preOrderView?.curatorName}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Email: {preOrderView?.curatorEmail}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Ðiện thoại:{preOrderView?.curatorPhone}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left" sx={{ width: "50%" }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "10pt" }}>
                      CÔNG TY TNHH NAVIS VIỆT NAM
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Mã số thuế: 0312481940{" "}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Ðịa chỉ: L3 Tòa Nhà Vạn Ðạt Lô II-1, Ðường Số 8 (CN8), KCN
                      Tân Bình
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Người phụ trách: {preOrderView?.salesName}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Email:{preOrderView?.curatorPhone}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Ðiện thoại:{preOrderView?.curatorPhone}
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>

          <Box className={style.InforOrder}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>STT</StyledTableCell>
                  <StyledTableCell align="left">Mã SP</StyledTableCell>
                  <StyledTableCell align="left">Tên SP</StyledTableCell>
                  <StyledTableCell align="left">Hãng SX</StyledTableCell>
                  <StyledTableCell align="left">Quy cách</StyledTableCell>
                  <StyledTableCell align="left">Đơn vị</StyledTableCell>
                  <StyledTableCell align="left">SL</StyledTableCell>
                  <StyledTableCell align="left">Ghi chú</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={style.tableBody}>
                {preOrderDetailView?.map((row: any, index: number) => (
                  <TableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {index}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      {row?.productCode}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row?.productName}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row?.origin}
                    </StyledTableCell>
                    <StyledTableCell align="left">{row?.specs}</StyledTableCell>
                    <StyledTableCell align="left">
                      {row?.unitName}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {row?.quantity}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {row?.note}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableRow>
      </TableBody>
    </Table>
  );
};
