import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import clsx from "clsx";
import moment from "moment";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormDatepicker } from "~modules-core/components";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MonthlyChart } from "./MonthlyChart";
import { YearChart } from "./YearChart";
import { StatisticCards } from "./StatisticCards";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const CustomerCareStatistics: React.FC = () => {
  const [dataType, setDataType] = useState("Month");

  const { control, watch } = useForm<any>({
    defaultValues: {
      date: moment().valueOf(),
    },
  });

  const { date } = watch();

  const momentDate = moment(date);

  const fromDate =
    dataType === "Month"
      ? momentDate.startOf("month").valueOf()
      : momentDate.startOf("year").valueOf();

  const toDate =
    dataType === "Month"
      ? momentDate.endOf("month").valueOf()
      : momentDate.endOf("year").valueOf();

  return (
    <Box className="mb-4">
      <Typography className="font-medium mb-3">Thống kê CSKH</Typography>

      <Box className="flex items-center justify-end mb-4">
        <ButtonGroup variant="contained" className="mr-3">
          <Button
            className={clsx(
              dataType === "Month" && "bg-main",
              "bg-grey-2 border-0"
            )}
            onClick={() => setDataType("Month")}
          >
            Tháng
          </Button>
          <Button
            className={clsx(
              dataType === "Year" && "bg-main",
              "bg-grey-2 border-0"
            )}
            onClick={() => setDataType("Year")}
          >
            Năm
          </Button>
        </ButtonGroup>

        <FormDatepicker
          controlProps={{
            name: "date",
            control: control,
          }}
          label={dataType === "Month" ? "Chọn tháng" : "Chọn năm"}
          views={
            dataType === "Month"
              ? ["month", "year"]
              : ["year"]
          }
          inputFormat={dataType === "Year" ? "YYYY" : "MM/YYYY"}
          InputProps={{
            sx: {
              background: "#fff !important",
            },
          }}
        />
      </Box>

      <StatisticCards fromdate={fromDate} todate={toDate} />

      {dataType === "Month" ? (
        <MonthlyChart fromdate={fromDate} todate={toDate} />
      ) : (
        <YearChart fromdate={fromDate} todate={toDate} />
      )}
    </Box>
  );
};
