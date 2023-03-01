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

export const PrintBillDetail: React.FC<{
  printAreaRef: any;
  defaultValue: any;
}> = ({ defaultValue, printAreaRef }) => {
  const { BillDetailView, BillView } = defaultValue || [];

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#051e34",
      color: theme.palette.common.white,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 0,
      paddingBottom: 0,
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
            <p className={style.contentTitleHeader}>BIÊN BẢN GIAO HÀNG</p>
            <p>
              Ngày tạo: {_format.converseDate(BillView?.mainOrder?.created)}
            </p>
            <p>Mã khách hàng: {BillView?.mainOrder?.customerCode}</p>
            <p>Mã biên bản giao hàng: {BillView?.mainOrder?.mainOrderCode}</p>
          </Box>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <Box sx={{ marginBottom: 2 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Thông tin bên bán</StyledTableCell>
                  <StyledTableCell align="left">
                    Thông tin bên mua
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
                      CÔNG TY TNHH NAVIS VIỆT NAM{" "}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Mã số thuế: 0312481940{" "}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Ðịa chỉ: L3 Tòa Nhà Vạn Ðạt Lô II-1, Ðường Số 8 (CN8), KCN
                      Tân Bình
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Người phụ trách: Lê Thị Hồng Cẩm{" "}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Email: mn.cam-lethihong@esti.vn{" "}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Ðiện thoại: 0896009939{" "}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left" sx={{ width: "50%" }}>
                    <Typography sx={{ fontWeight: 600, fontSize: "10pt" }}>
                      {BillView?.mainOrder?.companyName}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Mã số thuế: {BillView?.mainOrder?.companyTaxCode}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Ðịa chỉ: {BillView?.mainOrder?.companyAddress}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Người đại diện: {BillView?.mainOrder?.curatorName}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Email:{BillView?.mainOrder?.curatorEmail}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Ðiện thoại: {BillView?.mainOrder?.curatorPhone}
                    </Typography>
                  </StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Mã đơn đặt hàng</StyledTableCell>
                  <StyledTableCell align="left">Số hoá đơn</StyledTableCell>
                  <StyledTableCell align="left">Ngày hoá đơn</StyledTableCell>
                  <StyledTableCell align="left">
                    Hạn mức hoá đơn
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={style.tableBody}>
                <TableRow key={BillView?.bill.name}>
                  <StyledTableCell component="th" scope="row">
                    {" "}
                    {BillView?.mainOrder?.mainOrderCode}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {" "}
                    {BillView?.bill?.billNumber}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {" "}
                    {_format.converseDate(BillView?.bill?.created)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {BillView?.mainOrder?.paymentLimit}
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
                  <StyledTableCell align="left">Thông tin SP</StyledTableCell>
                  <StyledTableCell align="left">Quy cách</StyledTableCell>
                  <StyledTableCell align="left">Đơn vị</StyledTableCell>
                  <StyledTableCell align="left">SL</StyledTableCell>
                  <StyledTableCell align="left">Đơn giá</StyledTableCell>
                  <StyledTableCell align="left">Thành tiền</StyledTableCell>
                  <StyledTableCell align="left">Ghi chú</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={style.tableBody}>
                {BillDetailView?.map((row: any, index: number) => (
                  <TableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {index}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      {row?.productCode}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {" "}
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        {row?.productName}
                      </Typography>
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        Nhà sản xuất: {row?.manufactor}
                      </Typography>
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        Xuất sứ: {row?.origin}
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
                    <StyledTableCell component="th" scope="row">
                      {" "}
                      {_format.getVND(row?.price)}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      {_format.getVND(row?.totalPrice)}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {" "}
                      {row?.note}
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
                  {_format.getVND(BillView?.mainOrder?.totalPriceNotTax)}
                </span>
              </Box>
              <Box className={style.paymentItemOrder}>
                <span className={style.title}>Thuế GTGT:</span>{" "}
                <span>{_format.getVND(BillView?.mainOrder?.totalTax)}</span>
              </Box>
              <Box className={style.paymentItemOrder}>
                <span className={style.title}>
                  Tổng cộng tiền thanh toán(VNÐ):
                </span>{" "}
                <span>{_format.getVND(BillView?.mainOrder?.totalPrice)}</span>
              </Box>
            </Box>
          </Box>
        </TableRow>
      </TableBody>

      <TableFooter>
        <Box sx={{ marginBottom: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: "10pt" }}>
            Ðiều kiện đổi trả, khiếu nại hàng hoá:
          </Typography>
          <Typography sx={{ fontSize: "10pt", paddingLeft: 2 }}>
            - Ðiều kiện đổi trả, khiếu nại hàng hoá: - Gởi thông báo cho NAVIS
            về việc thiếu sót số lượng hàng hoá hoặc hàng hoá bị hư hỏng trong
            vòng 03 ngày tính từ ngày nhận hàng. Thư khiếu nại về chất lượng,
            quy cách sản phẩm được chấp nhận trong vòng 30 ngày kể từ ngày nhận
            hàng.
          </Typography>
          <Typography sx={{ fontSize: "10pt", paddingLeft: 2 }}>
            - Quý Khách hàng cần hỗ trợ các vấn đề kỹ thuật, thông tin sản phẩm
            xin liên hệ số điện thoại 028 6263 1422 hoặc truy cập navis.com.vn
            để được tư vấn.
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontSize: "10pt" }}>
            Phiếu giao hàng được lập thành 02 bản, mỗi bên giữ 01 bản.
          </Typography>
          <Typography sx={{ fontWeight: 600, fontSize: "10pt" }}>
            THANK YOU FOR YOUR KIND COOPERATION
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
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
                ĐẠI DIỆN BÊN GIAO
              </Typography>
              <Typography
                sx={{
                  fontSize: "10pt",
                  fontStyle: "italic",
                }}
              >
                {"(Ký và ghi rõ họ tên)"}
              </Typography>
              <img
                src={BillView?.mainOrder?.signatureUrl}
                alt="signatureImage"
                width={150}
                height={80}
              />
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
                ĐẠI DIỆN BÊN NHẬN
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
      </TableFooter>
    </Table>
  );
};
