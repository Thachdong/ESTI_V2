import {
  Box,
  Button,
  ButtonGroup,
  Stack,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { FormDatepickerBase } from "./form-bases";
import ArrowForwardSharpIcon from "@mui/icons-material/ArrowForwardSharp";
import { JSXElementConstructor, ReactElement, useState } from "react";
import { Moment } from "moment";

type TProps = {
  handleFilter: (FromDate?: number, ToDate?: number) => void;
  handleClear: () => void;
};

export const FilterDateRange: React.FC<TProps> = ({
  handleFilter,
  handleClear,
}) => {
  const [FromDate, setFromDate] = useState<Moment | null>(null);
  const [ToDate, setToDate] = useState<Moment | null>(null);

  const handleReset = () => {
    setFromDate(null);

    setToDate(null);

    handleClear();
  };
  return (
    <Box sx={{ width: "450px" }}>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Box>
          <Typography
            sx={{ textAlign: "center", color: "gray", fontSize: "14px" }}
          >
            Từ ngày
          </Typography>
          {/* <FormDatepickerBase
            value={FromDate}
            onChange={(val: any) => setFromDate(val)}
            renderInput={function (
              props: TextFieldProps
            ): ReactElement<any, string | JSXElementConstructor<any>> {
              throw new Error("Function not implemented.");
            }}
          /> */}
        </Box>

        <Box sx={{ marginTop: "1rem !important" }}>
          <ArrowForwardSharpIcon sx={{ fontSize: "16px", color: "gray" }} />
        </Box>

        <Box>
          <Typography
            sx={{ textAlign: "center", color: "gray", fontSize: "14px" }}
          >
            Đến ngày
          </Typography>
          {/* <FormDatepickerBase
            value={ToDate}
            onChange={(val: any) => setToDate(val)}
            renderInput={function (
              props: TextFieldProps
            ): ReactElement<any, string | JSXElementConstructor<any>> {
              throw new Error("Function not implemented.");
            }}
          /> */}
        </Box>
      </Stack>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          color="info"
          onClick={() =>
            handleFilter(
              FromDate?.toDate().getTime(),
              ToDate?.toDate().getTime()
            )
          }
        >
          Lọc
        </Button>
        <Button color="error" onClick={handleReset}>
          Bỏ lọc
        </Button>
      </ButtonGroup>
    </Box>
  );
};
