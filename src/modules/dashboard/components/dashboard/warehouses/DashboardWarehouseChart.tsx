import { Box } from "@mui/system";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import {
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { dashboard } from "src/api";
import { AutoCompleteBase, FormDatepickerBase } from "~modules-core/components";
import { defaultBranchId } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";

export const DashboardWarehouseChart: React.FC = () => {
  const { branchId = defaultBranchId } = useRouter().query;

  const [date, setDate] = useState({
    fromDate: moment().startOf("year").valueOf(),
    toDate: moment().endOf("year").valueOf(),
    type: "year",
  });

  // DATA FETCHING
  const { data: montlyData } = useQuery(
    ["WarehouseYearChartData", branchId],
    () =>
      dashboard
        .getWarehouseByYear(branchId as string)
        .then((res) =>
          res.data?.map((d: any) => ({ ...d, month: "Tháng " + d?.month }))
        )
  );

  const { data: daysData } = useQuery(
    ["WarehouseDaysChartData", branchId, date],
    () =>
      dashboard
        .getWarehouseByDays({
          branchId,
          fromDate: date.fromDate,
          toDate: date.toDate,
        })
        .then((res) =>
          res.data?.map((d: any) => ({
            ...d,
            day: moment(d?.day).format("DD/MM/YYYY"),
          }))
        ),
    {
      enabled: !!branchId && date.type !== "year",
    }
  );

  // METHODS
  const handleChangeFilterType = useCallback((type: string) => {
    const currentDate = moment();

    switch (type) {
      case "year": {
        setDate({
          type,
          fromDate: currentDate.startOf("year").valueOf(),
          toDate: currentDate.endOf("year").valueOf(),
        });
        break;
      }
      case "month": {
        setDate({
          type,
          fromDate: currentDate.startOf("month").valueOf(),
          toDate: currentDate.endOf("month").valueOf(),
        });
        break;
      }
      case "week": {
        setDate({
          type,
          fromDate: currentDate.startOf("week").valueOf(),
          toDate: currentDate.endOf("week").valueOf(),
        });
        break;
      }
    }
  }, []);

  return (
    <Box>
      <Box className="grid grid-cols-3 gap-4 mb-3">
        <AutoCompleteBase
          options={[
            { id: "year", name: "Năm hiện tại" },
            { id: "month", name: "Tháng hiện tại" },
            { id: "week", name: "Tuần hiện tại" },
          ]}
          label={"Xem theo"}
          shrinkLabel
          onChange={(val: any) => handleChangeFilterType(val)}
          value={date.type}
        />

        <FormDatepickerBase
          label="Từ ngày"
          shrinkLabel
          onChange={(val: any) => setDate({ ...date, fromDate: val })}
          value={date.fromDate}
          inputFormat="DD/MM/YYYY"
          InputProps
          disabled={date.type === "year"}
        />

        <FormDatepickerBase
          label="Đến ngày"
          shrinkLabel
          onChange={(val: any) => setDate({ ...date, toDate: val })}
          value={date.toDate}
          inputFormat="DD/MM/YYYY"
          disabled={date.type === "year"}
        />
      </Box>

      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          data={date.type === "year" ? montlyData : daysData}
          margin={{
            top: 20,
            right: -20,
            left: -20,
            bottom: 0,
          }}
          maxBarSize={10}
        >
          <Tooltip
            wrapperStyle={{
              border: "none",
            }}
            contentStyle={{
              fontWeight: "bold",
              fontSize: "0.75rem",
              border: "none",
              borderRadius: "0.3rem",
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 1.6px 3.6px 0px, rgba(0, 0, 0, 0.2) 0px 0.3px 0.9px 0px",
            }}
            labelStyle={{
              fontWeight: 500,
              fontSize: "0.875rem",
              borderBottom: "1px solid #ccc",
              paddingBottom: "0.5rem",
            }}
            formatter={(value: any) => _format.getVND(value as number)}
          />

          <Legend
            iconSize={10}
            iconType="circle"
            margin={{ top: 20 }}
            formatter={(value: any) => (
              <span
                style={{
                  fontSize: "12px",
                }}
              >
                {value}
              </span>
            )}
          />
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis
            stroke="#f5f5f5"
            tick={{
              stroke: "#002642",
            }}
            fontSize="0.7rem"
            dataKey={date.type === "year" ? "month" : "day"}
          />
          <YAxis
            stroke="#f5f5f5"
            tick={{
              stroke: "#002642",
            }}
            alignmentBaseline="alphabetic"
            fontSize="0.7rem"
            tickFormatter={(value) => {
              if (value >= 1000000000000) return `${value / 1000000000}Me`;
              if (value >= 1000000000) return `${value / 1000000000}Bi`;
              if (value >= 1000000) return `${value / 1000000}M`;
              if (value >= 1000) return `${value / 1000}k`;
              return value;
            }}
          />

          <Line
            unit=" đ"
            strokeWidth={3}
            type="monotone"
            stroke="#F1B44C"
            dataKey="totalPriceImport"
            name="Giá trị nhập"
          ></Line>
          <Line
            unit=" đ"
            strokeWidth={3}
            type="monotone"
            stroke="#1565C0"
            dataKey="totalPriceExport"
            name="Giá trị xuất"
          ></Line>
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};
