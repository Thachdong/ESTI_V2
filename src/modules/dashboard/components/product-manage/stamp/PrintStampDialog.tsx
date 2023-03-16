import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
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
      }
    `,
  });

  const printData = {
    title: `${defaultValue?.productCode} ${defaultValue?.labelTypeName} ${defaultValue?.productName}`,
    productCode: defaultValue?.productCode,
    chemicalName: defaultValue?.chemicalName,
    specs: defaultValue?.specs,
    lotNumber: defaultValue?.lotNumber,
    manufactor: defaultValue?.manufactor,
    origin: defaultValue?.origin,
    branchName: defaultValue?.branchName,
    branchAddress: defaultValue?.branchAddress,
    QRCode: defaultValue?.QRCode,
    website: "navis.com.vn",
    tel: "02862631422",
    orther:
      "xem thêm trên bao bì hoặc tải dữ liệu sản phẩm bằng cách quét mã vạch.",
  };

  useEffect(() => {
    setValue("quantity", 9);
  }, []);

  const renderSmallStamp = useCallback(
    (_: any, index: number) => (
      <table ref={printAreaRef} className="w-full">
        <tbody className="w-full">
          <tr className="w-full">
            <td className="w-full">
              {Array.from(Array(quantity).keys())?.map(
                (_: any, index: number) => (
                  <Box
                    key={index}
                    className="flex flex-row items-center border border-solid border-black px-2 py-3"
                  >
                    <Box className="flex-grow">
                      <Typography className="text-sm whitespace-nowrap">
                        CODE: {printData?.productCode}
                      </Typography>
                      <Typography className="text-sm whitespace-nowrap">
                        LOT#: {printData?.lotNumber}
                      </Typography>
                    </Box>

                    <Box>
                      <img src={printData?.QRCode} alt="qrcode" width={50} />
                    </Box>
                  </Box>
                )
              )}
            </td>
          </tr>
        </tbody>
      </table>
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

      <Box className="">
        <Box ref={printAreaRef} className="grid grid-cols-3 gap-4">
          {size === "small"
            ? Array.from(Array(quantity).keys()).map(renderSmallStamp)
            : Array.from(Array(quantity).keys())}
        </Box>
      </Box>
    </Dialog>
  );
};
