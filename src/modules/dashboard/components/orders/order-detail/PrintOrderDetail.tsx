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

export const PrintOrderDetail: React.FC<{
  printAreaRef: any;
  defaultValue: any;
}> = ({ defaultValue, printAreaRef }) => {
  const { mainOrder, mainOrderDetail } = defaultValue || [];
  const rows: any = [{ send: "Phuc", recive: "Phuc" }];

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
            <p className={style.contentTitleHeader}>ĐƠN ĐẶT HÀNG</p>
            <p>Ngày tạo: {_format.converseDate(mainOrder?.created)}</p>
            <p>Mã khách hàng: {mainOrder?.customerCode}</p>
            <p>Mã đơn hàng: {mainOrder?.mainOrderCode}</p>
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
                {rows.map((row: any) => (
                  <TableRow key={row.name}>
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
                        Ðịa chỉ: L3 Tòa Nhà Vạn Ðạt Lô II-1, Ðường Số 8 (CN8),
                        KCN Tân Bình
                      </Typography>
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        Người đại diện: Lê Thị Hồng Cẩm{" "}
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
                        {mainOrder?.companyName}
                      </Typography>
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        Mã số thuế: {mainOrder?.companyTaxCode}
                      </Typography>
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        Ðịa chỉ: {mainOrder?.companyAddress}
                      </Typography>
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        Người phụ trách: {mainOrder?.curatorName}
                      </Typography>
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        Email: {mainOrder?.curatorEmail}
                      </Typography>
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        Ðiện thoại: {mainOrder?.curatorPhone}
                      </Typography>
                    </StyledTableCell>
                  </TableRow>
                ))}
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
                {mainOrderDetail?.map((row: any, index: number) => (
                  <TableRow key={index}>
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
                <span>{_format.getVND(mainOrder?.totalPriceNotTax)}</span>
              </Box>
              <Box className={style.paymentItemOrder}>
                <span className={style.title}>Thuế GTGT:</span>{" "}
                <span>{_format.getVND(mainOrder?.totalTax)}</span>
              </Box>
              <Box className={style.paymentItemOrder}>
                <span className={style.title}>
                  Tổng cộng tiền thanh toán(VNÐ):
                </span>{" "}
                <span>{_format.getVND(mainOrder?.totalPrice)}</span>
              </Box>
            </Box>
          </Box>
        </TableRow>
      </TableBody>

      <TableFooter>
        <Box sx={{ marginBottom: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: "10pt" }}>
            Điều khoản đơn hàng
          </Typography>
          <Typography sx={{ fontSize: "10pt", paddingLeft: 2 }}>
            - Tổng cộng tiền thanh toán đã bao gồm thuế GTGT, chi phí giao hàng
            và các khoản phí khác (nếu có)
          </Typography>
          <Typography sx={{ fontSize: "10pt", paddingLeft: 2 }}>
            - Hình thức thanh toán: {mainOrder?.paymentType}
          </Typography>
          <Typography sx={{ fontSize: "10pt", paddingLeft: 2 }}>
            - Thời gian giao hàng dự kiến{" "}
            {_format.converseDate(mainOrder?.deliverDate)}
          </Typography>
          <Typography sx={{ fontSize: "10pt", paddingLeft: 2 }}>
            - Hiệu lực báo giá: đến{" "}
            {_format.converseDate(mainOrder?.expireDate)}
          </Typography>
          <Typography sx={{ fontSize: "10pt", paddingLeft: 2 }}>
            - Ðịa điểm giao hàng: {mainOrder?.receiverAddress}
          </Typography>
          <Typography sx={{ fontSize: "10pt", paddingLeft: 2 }}>
            - Chứng từ thanh toán:{" "}
            {JSON.parse(mainOrder?.paymentDocument || "[]").map(
              (item: any) => item?.paymentDocumentName + ","
            )}
          </Typography>
        </Box>

        <Box sx={{ marginBottom: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: "10pt" }}>
            Thông tin tài khoản ngân hàng:
          </Typography>
          <Typography sx={{ fontSize: "10pt", paddingLeft: 2 }}>
            - Ðơn vị thụ hưởng: CONG TY TNHH NAVIS VIET NAM
          </Typography>
          <Typography sx={{ fontSize: "10pt", paddingLeft: 2 }}>
            - Tài khoản: 007.1000.802.734
          </Typography>
          <Typography sx={{ fontSize: "10pt", paddingLeft: 2 }}>
            - Ngân hàng: VIETCOMBANK HCM, CN. TÂY SÀI GÒN
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: 600, fontSize: "10pt" }}>
            THANK YOU FOR YOUR KIND COOPERATION
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{
              textAlign: "right",
              marginTop: 2,
            }}
          >
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: "10pt",
              }}
            >
              NGƯỜI PHỤ TRÁCH
            </Typography>
            <Typography
              sx={{
                fontSize: "10pt",
              }}
            >
              {"(Ký và ghi rõ họ tên)"}
            </Typography>
          </Typography>
        </Box>
      </TableFooter>
    </Table>
  );
};
