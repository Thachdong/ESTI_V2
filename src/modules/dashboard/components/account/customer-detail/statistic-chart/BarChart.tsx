import { Bar } from "react-chartjs-2";
import { chartjsOptions } from "~modules-core/constance";

type TProps = {
  data: any[];
};
export const BarChart: React.FC<TProps> = ({ data }) => {
  let labels: number[] = [];
  let quantity: number[] = [];
  let value: number[] = [];

  data?.map((d: any) => {
    labels.push(d?.productGroup);

    quantity.push(d?.quantityProduct);

    value.push(d?.totalPriceOrder);
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
      },
      {
        type: "bar" as const,
        label: "Giá trị",
        data: value,
        backgroundColor: "rgb(255, 29, 132)",
        tension: 0.3,
        borderRadius: 3,
        barThickness: 15,
      },
    ],
  };

  return (
    <Bar
      // options={chartjsOptions as any}
      data={config as any}
      height={100}
    />
  );
};
