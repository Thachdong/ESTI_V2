import { Box, Typography } from "@mui/material";
import moment from "moment";
import { Bar } from "react-chartjs-2";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { products, referencePrice } from "src/api";
import { FormDatepicker, FormSelectAsync } from "~modules-core/components";
import { chartjsOptions } from "~modules-core/constance";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect } from "react";
import { toast } from "~modules-core/toast";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const ReferencePriceStatistic: React.FC = () => {
  const { control, watch } = useForm<any>({
    defaultValues: {
      fromdate: moment().startOf("year").valueOf(),
      todate: moment().endOf("year").valueOf(),
    },
  });

  const { productId, fromdate, todate } = watch();

  // DATA FETCHING
  const { data: referencePriceList } = useQuery(
    ["ReferencePriceList", productId, fromdate, todate],
    () =>
      referencePrice
        .getList({
          pageIndex: 1,
          pageSize: 9999,
          orderBy: 10,
          productId,
          expireDateStatus: 0,
          fromdate,
          todate,
        })
        .then((res) =>
          res.data.items?.map((item: any) => ({
            id: item?.id,
            quantity: item?.quantity,
            price: item?.price,
            created: moment(item?.created).format("DD/MM/YYYY"),
          }))
        ),
    {
      enabled: !!productId && !!fromdate && !!todate,
    }
  );

  // SIDE EFFECTS
  useEffect(() => {
    if (referencePriceList?.length === 0) {
      toast.error(`Không tìm thấy giá tham khảo`)
    }
  }, [referencePriceList]);

  // CHART DATA
  let labels: number[] = [];
  let quantity: number[] = [];
  let price: number[] = [];

  referencePriceList?.map((item: any) => {
    labels.push(item?.created);

    quantity.push(item?.quantity);

    price.push(item?.price);
  });

  const config = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: "Số lượng",
        data: quantity,
        backgroundColor: "#1976d2",
        tension: 0.3,
        borderRadius: 3,
        barThickness: 15,
        yAxesGroup: "quantity",
      },
      {
        type: "bar" as const,
        label: "Đơn giá",
        data: price,
        backgroundColor: "rgb(255, 29, 132)",
        tension: 0.3,
        borderRadius: 3,
        barThickness: 15,
        yAxesGroup: "price",
      },
    ],
    // options: {
    //   yAxes: [
    //     {
    //       name: "price",
    //       type: "linear",
    //       position: "left",
    //       scalePositionLeft: true,
    //     },
    //     {
    //       name: "quantity",
    //       type: "bar",
    //       position: "right",
    //       scalePositionLeft: false,
    //     },
    //   ],
    // },
    type: "scale",
  };

  return (
    <Box className="mb-4">
      <Typography className="font-bold mb-3">
        Biểu đồ giá tham khảo theo SP
      </Typography>

      <Box className="grid grid-cols-3 gap-4 bg-white p-2 rounded-sm">
        <FormDatepicker
          controlProps={{
            name: "fromdate",
            control,
          }}
          label="Từ ngày"
        />

        <FormDatepicker
          controlProps={{
            name: "todate",
            control,
          }}
          label="Đến ngày"
        />

        <FormSelectAsync
          label={"Chọn Sản Phẩm"}
          controlProps={{
            name: "productId",
            control,
          }}
          fetcher={products.getList}
          getOptionLabel={(opt) =>
            !!opt ? `${opt?.productCode} - ${opt?.productName}` : ""
          }
          shrinkLabel
        />
      </Box>

      <Bar data={config as any} height={100} />
    </Box>
  );
};
