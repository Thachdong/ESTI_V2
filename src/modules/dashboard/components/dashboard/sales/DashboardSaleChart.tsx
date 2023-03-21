import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { customer, dashboard, staff } from "src/api";
import {
  AutoCompleteBase,
  FormDatepickerBase,
  FormInputBase,
  FormSelect,
  FormSelectAsync,
} from "~modules-core/components";
import { defaultBranchId } from "~modules-core/constance";
import { _format } from "~modules-core/utility/fomat";

export const DashboardSaleChart: React.FC = () => {
  const [date, setDate] = useState({
    fromDate: moment().startOf("year").valueOf(),
    toDate: moment().endOf("year").valueOf(),
    type: "year",
  });

  const [userType, setUserType] = useState("all");

  const { branchId = defaultBranchId } = useRouter().query;

  const { control, watch, setValue } = useForm();

  const userId = watch("userId");

  // DATA FETCHING
  const { data: montlyData } = useQuery(
    ["SaleYearChartData", branchId, date.type, userId],
    () =>
      dashboard
        .getOrderByYear({
          branchId: branchId as string,
          userId: userId || null,
        })
        .then((res) => {
          const { list = [] } = res.data || {};

          const updateList = list.map((d: any) => ({
            ...d,
            month: "Tháng " + d?.month,
          }));

          return { ...res.data, list: updateList };
        }),
    {
      enabled: date.type === "year",
    }
  );

  const { data: daysData } = useQuery(
    ["SaleDaysChartData", branchId, date, userId],
    () =>
      dashboard
        .getOrderByDays({
          branchId: branchId as string,
          fromDate: date.fromDate,
          toDate: date.toDate,
          userId: userId || null,
        })
        .then((res) => {
          const { list = [] } = res.data || {};

          const updateList = list.map((d: any) => ({
            ...d,
            day: moment(d?.day).format("DD/MM/YYYY"),
          }));

          return { ...res.data, list: updateList };
        }),
    {
      enabled: !!branchId && date.type !== "year",
    }
  );

  const { data: saleList } = useQuery(["SaleList"], () =>
    staff.getListSale().then((res) => res.data)
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

  const renderUserTag = useCallback(() => {
    switch (userType) {
      case "sale":
        return (
          <FormSelect
            options={saleList || []}
            label={"Chọn sale"}
            controlProps={{
              name: "userId",
              control,
              rules: { required: "Phải chọn sale" },
            }}
            getOptionLabel={(opt: any) =>
              !!opt ? `${opt.code} - ${opt.fullName}` : ""
            }
            shrinkLabel
          />
        );
      case "customer":
        return (
          <FormSelectAsync
            label={"Chọn khách hàng"}
            controlProps={{
              name: "userId",
              control,
              rules: { required: "Phải chọn khách hàng" },
            }}
            fetcher={customer.getList}
            getOptionLabel={(opt: any) =>
              !!opt ? `${opt.customerCode} - ${opt.companyName}` : ""
            }
            shrinkLabel
          />
        );
      default:
        return <FormInputBase className="invisible" />;
    }
  }, [userType]);

  const renderChartTitle = useCallback(() => {
    const data = date.type === "year" ? montlyData : daysData;

    const { sales, ratio, income } = data || {};

    return (
      <Box className="flex justify-between">
        <Box>
          <Typography className="text-[#718096] text-right">
            Tổng giá trị đơn hàng
          </Typography>
          <Typography className="text-main text-lg font-semibold text-right">
            {_format.getVND(income)} đ
          </Typography>
        </Box>

        <Box>
          <Typography className="text-[#718096] text-right">
            Tổng số lượng đơn hàng
          </Typography>
          <Typography className="text-main text-lg font-semibold text-right">
            {sales}
          </Typography>
        </Box>

        <Box>
          <Typography className="text-[#718096] text-right">
            Chuyển đổi báo giá thành đơn hàng
          </Typography>
          <Typography className="text-main text-lg font-semibold text-right">
            {Number.parseFloat(ratio).toFixed(2)} %
          </Typography>
        </Box>
      </Box>
    );
  }, [date.type, montlyData, daysData]);

  // SIDE EFFECTS
  useEffect(() => {
    setValue("userId", null);
  }, [userType]);

  return (
    <Box>
      <Box className="flex items-center justify-between mb-4">
        <Box className="grid grid-cols-2 gap-3 mr-3">
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
            className="col-span-2"
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

        <Box>
          <RadioGroup
            className="flex flex-row flex-nowrap mb-3"
            onChange={(e) => setUserType(e.target.value)}
          >
            <FormControlLabel value="all" control={<Radio />} label="Tất cả" className="whitespace-nowrap" />

            <FormControlLabel value="sale" control={<Radio />} label="Sales" className="whitespace-nowrap" />

            <FormControlLabel
              value="customer"
              control={<Radio />}
              label="Khách hàng"
              className="whitespace-nowrap"
            />
          </RadioGroup>

          {renderUserTag()}
        </Box>
      </Box>

      {renderChartTitle()}

      <ResponsiveContainer width="100%" height={500}>
        <ComposedChart
          data={date.type === "year" ? montlyData?.list : daysData?.list || []}
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
            yAxisId="left"
            stroke="#f5f5f5"
            tick={{
              stroke: "#002642",
            }}
            alignmentBaseline="alphabetic"
            fontSize="0.7rem"
            tickFormatter={(value) => {
              if (value >= 1000000000000) return `${value / 1000000000}Mi`;
              if (value >= 1000000000) return `${value / 1000000000}Bi`;
              if (value >= 1000000) return `${value / 1000000}M`;
              if (value >= 1000) return `${value / 1000}k`;
              return value;
            }}
          />

          <YAxis
            orientation="right"
            yAxisId="right"
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

          <Area
            yAxisId="left"
            stroke="#4527A0"
            fill="#5E35B1"
            fillOpacity="0.2"
            strokeWidth={2.5}
            type="monotone"
            dataKey="quantityPreOrder"
            name="Số lượng yêu cầu"
          />

          <Bar
            yAxisId="left"
            stroke="#1E88E5"
            fill="#1E88E5"
            type="monotone"
            dataKey="quantityMainOrder"
            name="Số lượng đơn hàng"
          />

          <Line
            strokeWidth={3}
            yAxisId="left"
            stroke="#F1B44C"
            type="monotone"
            dataKey="quantityPreQuote"
            name="Số lượng báo giá"
          />

          <Scatter
            // unit={" đ" as any}
            yAxisId="right"
            dataKey="totalPriceMainOrder"
            name="Giá trị đơn hàng"
            fill="#840032"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};
