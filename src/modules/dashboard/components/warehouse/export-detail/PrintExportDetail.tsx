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

export const PrintExportDetail: React.FC<{
  printAreaRef: any;
  defaultValue: any;
}> = ({ defaultValue, printAreaRef }) => {
  const { productOrder, productOrderDetail } = defaultValue || {};

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
            <p className={style.contentTitleHeader}>PHIẾU XUẤT KHO</p>
            <p>Ngày tạo: 23/02/2023</p>
            <p>Mã khách hàng: KH-346</p>
            <p>Mã xuất kho: ĐH23-03856</p>
          </Box>
        </TableRow>
      </TableHead>

      <TableBody>
        <TableRow>
          <Box className={style.InforDeliveries}>
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
                      {productOrder?.companyName}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Mã số thuế: {productOrder?.companyTaxCode}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Ðịa chỉ: {productOrder?.companyAddress}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Người đại diện: {productOrder?.curatorName}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Email: {productOrder?.curatorEmail}
                    </Typography>
                    <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                      Ðiện thoại: {productOrder?.curatorPhone}
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
                  <StyledTableCell align="left">
                    Thông tin nhận hàng
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    Thông tin vận chuyển
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={style.tableBody}>
                <TableRow>
                  <StyledTableCell align="left">
                    {productOrder?.mainOrderCode}
                  </StyledTableCell>

                  <StyledTableCell component="th" scope="row">
                    <Typography sx={{ fontSize: "10pt" }}>
                      Người nhận : {productOrder?.receiverFullName}
                    </Typography>
                    <Typography sx={{ fontSize: "10pt" }}>
                      Số điện thoại : {productOrder?.receiverPhone}
                    </Typography>
                    <Typography sx={{ fontSize: "10pt" }}>
                      Ðịa chỉ nhận hàng : {productOrder?.receiverAddress}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <Typography sx={{ fontSize: "10pt" }}>
                      Ðơn vị vận chuyển : {productOrder?.deliveryName}
                    </Typography>
                    <Typography sx={{ fontSize: "10pt" }}>
                      Mã vận đơn : {productOrder?.mainOrderCode}
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
                  <StyledTableCell rowSpan={2}>STT</StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Mã SP
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Thông tin SP
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Quy cách
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Đơn vị
                  </StyledTableCell>
                  <StyledTableCell align="center" colSpan={2}>
                    Số lượng
                  </StyledTableCell>
                  <StyledTableCell align="left" rowSpan={2}>
                    Ghi chú
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="left">Yêu cầu</StyledTableCell>
                  <StyledTableCell align="left">Thực xuất</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody className={style.tableBody}>
                {productOrderDetail?.map((row: any, index: number) => (
                  <TableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {" "}
                      {row?.productCode}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        {row?.productName}
                      </Typography>
                      <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        Nhà sản xuất: {row?.manufactor}
                      </Typography>
                      {/* <Typography sx={{ margin: 0, fontSize: "10pt" }}>
                        Xuất sứ: {row?.origin}
                      </Typography> */}
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
                      {/* {row?.quantity} */}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {" "}
                      {row?.note}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableRow>
      </TableBody>

      <Box sx={{ marginBottom: 1 }}>
        <Typography sx={{ fontSize: "10pt" }}>
          Phiếu xuất kho được in thành 2 bản, mỗi bên giữ một bản
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "80%",
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
              NGƯỜI LẬP PHIẾU
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
    </Table>
  );
};
