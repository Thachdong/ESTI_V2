import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { stockPlan } from "src/api";
import { AutoCompleteBase, FormDatepickerBase } from "~modules-core/components";

type TProps = {
  productId: string;
};

export const StockChart: React.FC<TProps> = ({ productId }) => {
  const [date, setDate] = useState({
    fromDate: moment().startOf("month").valueOf(),
    toDate: moment().endOf("month").valueOf(),
    type: "month",
  });

  // DATA FETCHING
  const { data } = useQuery(
    ["GetStockPlanOfProduct", productId, date],
    () =>
      stockPlan
        .getChartData({
          fromdate: date?.fromDate,
          todate: date?.toDate,
          warehouseConfigProductId: productId,
        })
        .then((res) => res.data),
    {
      enabled: !!productId,
    }
  );

  const chartData = [
    {
      name: "Số lượng tồn",
      value: data?.inventory,
      labelLine: "Số lượng tồn",
    },
    {
      name: "Số lượng dự trù",
      value: data?.estimatedQuantity,
    },
    {
      name: "Số lượng bán ra",
      value: data?.exported,
    },
  ];

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
      case "quarter": {
        setDate({
          type,
          fromDate: currentDate.startOf("quarter").valueOf(),
          toDate: currentDate.endOf("quarter").valueOf(),
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
    <Box className="mt-4">
      <Typography className="font-semibold uppercase mb-4">Biểu đồ</Typography>

      <Box className="grid grid-cols-3 gap-4 mb-3">
        <AutoCompleteBase
          options={[
            { id: "year", name: "Năm hiện tại" },
            { id: "quarter", name: "Quý hiện tại" },
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
        />

        <FormDatepickerBase
          label="Đến ngày"
          shrinkLabel
          onChange={(val: any) => setDate({ ...date, toDate: val })}
          value={date.toDate}
          inputFormat="DD/MM/YYYY"
        />
      </Box>

      <Box>
        {!data?.inventory && !data?.estimatedQuantity && !data?.exported ? (
          <Typography className="text-xs text-grey italic">Không có dữ liệu thống kê</Typography>
        ) : (
          <ResponsiveContainer width={730} height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#1976d2"
                label={(data: any) => `${data?.name}: ${data?.value}`}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </Box>
    </Box>
  );
};
