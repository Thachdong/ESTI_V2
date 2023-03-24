import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useReactToPrint } from "react-to-print";
import {
  BaseButton,
  Dialog,
  FormInputNumber,
  PrintButton,
} from "~modules-core/components";
import { TDialog } from "~types/dialog";

export const PrintStampDialog: React.FC<TDialog> = ({
  open,
  defaultValue,
  onClose,
}) => {
  const [size, setSize] = useState("small");

  const { control, setValue, watch } = useForm();

  const { quantity } = watch();

  const printAreaRef = useRef<HTMLTableElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printAreaRef.current,
    pageStyle: `
        @page {
            size: 210mm 297mm;
            @top {
                content: counter(page);
            }
            html, body {
                height: auto;
            }
        }

        @media print {
            body {
                -webkit-print-color-adjust: exact;
            }
            html, body {
                height: 100%;
                
            }

            .print-container {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
            }
        }
      `,
  });

  const printData = {
    ...defaultValue,
    title: `${defaultValue?.productCode} ${defaultValue?.labelTypeName} ${defaultValue?.productName}`,
    website: "navis.com.vn",
    tel: "02862631422",
    orther:
      "xem thêm trên bao bì hoặc tải dữ liệu sản phẩm bằng cách quét mã vạch.",
  };

  useEffect(() => {
    setValue("quantity", 9);
  }, []);

  const renderSmallStamp = useCallback(
    (key: number) => (
      <div
        key={key}
        style={{
          width: "60mm",
          height: "15mm",
          border: "1px solid black",
          padding: 5,
          margin: 5,
          display: "inline-block",
          pageBreakInside: "avoid",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 500,
            display: "flex",
            alignItems: "center",
            height: "100%",
            width: "100%",
            gap: 5,
          }}
        >
          <div style={{ width: "75%" }}>
            <p>CODE: {printData?.productCode}</p>
            <p>LOT#: {printData?.lotNumber}</p>
          </div>

          <div style={{ width: "25%", textAlign: "right" }}>
            <img width="90%" src={printData?.QRCode} />
          </div>
        </div>
      </div>
    ),
    [printData]
  );

  const renderlargeStamp = useCallback(
    (key: number) => (
      <div
        style={{
          width: "65mm",
          border: "1px solid black",
          padding: 5,
          margin: 5,
          pageBreakInside: "avoid",
        }}
      >
        <table style={{ fontSize: 10 }}>
          <thead>
            <tr style={{ paddingBottom: 5 }}>
              <th colSpan={2}>{printData?.productName}</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              {printData?.labelType === 1 && (
                <td colSpan={2}>
                  <p> - Mã sản phẩm: {printData?.productCode}</p>
                  <p> - Công thức hóa học: {printData?.chemicalName}</p>
                  <p> - Quy cách: {printData?.specs}</p>
                  <p> - LOT#: {printData?.lotNumber}</p>
                  <p> - Hãng sản xuất: {printData?.manufactor}</p>
                  <p> - Xuất xứ: {printData?.origin}</p>
                </td>
              )}
              {printData?.labelType === 2 && (
                <td colSpan={2}>
                  <p> - Mã sản phẩm: {printData?.productCode}</p>
                  <p> - Quy cách: {printData?.specs}</p>
                  <p> - LOT#: {printData?.lotNumber}</p>
                  <p> - Hãng sản xuất: {printData?.manufactor}</p>
                  <p> - Xuất xứ: {printData?.origin}</p>
                </td>
              )}
              {printData?.labelType === 3 && (
                <td colSpan={2}>
                  <p>- Mã sản phẩm: {printData?.productCode}</p>
                  <p>- Serial number: {printData?.lotNumber}</p>
                  <p>
                    - Năm sản xuất:{" "}
                    {moment(printData?.dateManufacture).format("YYYY")}
                  </p>
                  <p>- Hãng sản xuất: {printData?.manufactor}</p>
                  <p>- Xuất xứ: {printData?.origin}</p>
                </td>
              )}
            </tr>
            <tr>
              <td colSpan={2}>
                <p>
                  <span style={{ textDecoration: "underline" }}>
                    Nhà nhập khẩu:
                  </span>{" "}
                  {printData?.branchName}
                </p>
                <p>
                  <span style={{ textDecoration: "underline" }}>Đ/c:</span>{" "}
                  {printData?.branchAddress}
                </p>
              </td>
            </tr>
            <tr>
              <td style={{ width: "50%", verticalAlign: "top" }}>
                <p style={{ paddingTop: 10 }}>
                  <span style={{ textDecoration: "underline" }}>
                    Các thông tin khác:
                  </span>{" "}
                  xem thêm trên bao bì hoặc tải dữ liệu sản phẩm bằng cách quét
                  mã vạch.
                </p>
              </td>
              <td style={{ width: "50%", whiteSpace: "break-spaces", alignItems: "center" }}>
                <img width="75%" src={printData?.QRCode} />
              </td>
            </tr>
            <tr>
              <td>
                <p style={{ paddingBottom: "2mm" }}>
                  <span style={{ textDecoration: "underline" }}>Tel:</span>{" "}
                  02862631422
                </p>
              </td>
              <td>
                <p style={{ paddingBottom: "2mm" }}>
                  <span style={{ textDecoration: "underline" }}>Website:</span>{" "}
                  esti.vn
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    ),
    [printData]
  );

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" title="Thông số">
      <Typography>Size</Typography>
      <RadioGroup
        className="flex flex-row items-center mb-4"
        defaultValue={size}
        onChange={(e) => setSize(e.target.value)}
      >
        <FormControlLabel value="large" control={<Radio />} label="Lớn" />

        <FormControlLabel value="small" control={<Radio />} label="Nhỏ" />
      </RadioGroup>
      <FormInputNumber
        controlProps={{
          control,
          name: "quantity",
          rules: { required: "Phải nhập số lượng cần in" },
        }}
        label="Số lượng in"
        shrinkLabel
      />

      <Box className="flex justify-end mt-4">
        <PrintButton onClick={handlePrint}>In</PrintButton>

        <BaseButton type="button" className="!bg-main-1 ml-3" onClick={onClose}>
          Đóng
        </BaseButton>
      </Box>

      <Box>
        <Box className="print-container hidden" ref={printAreaRef}>
          {size === "small"
            ? Array.from(Array(quantity).keys()).map(renderSmallStamp)
            : Array.from(Array(quantity).keys()).map(renderlargeStamp)}
        </Box>
      </Box>
    </Dialog>
  );
};
