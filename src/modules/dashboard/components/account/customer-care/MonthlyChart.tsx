import { Bar } from "react-chartjs-2";
import { useQuery } from "react-query";
import { customerCare } from "src/api";
import { chartjsOptions } from "~modules-core/constance";

type TProps = {
  fromdate: number;
  todate: number;
};
export const MonthlyChart: React.FC<TProps> = ({ fromdate, todate }) => {
  const { data: chartData } = useQuery(
    ["MonthlyStatisticsData", fromdate, todate],
    () =>
      customerCare
        .getStatisticByMonth({
          fromdate,
          todate,
          pageIndex: 1, // Theo yêu cầu của api
          pageSize: 9999, // Theo yêu cầu của api
        })
        .then((res) => res.data),
    {
      enabled: !!fromdate && !!todate,
    }
  );

  let labels: number[] = [];
  let sendMail: number[] = [];
  let messager: number[] = [];
  let gift: number[] = [];
  let callPhone: number[] = [];
  let appointment: number[] = [];

  chartData?.map((data: any, index: number) => {
    labels?.push(index + 1);
    sendMail.push(data?.sendMail);
    messager.push(data?.messager);
    gift.push(data?.gift);
    callPhone.push(data?.callPhone);
    appointment.push(data?.appointment);
  });

  const config = {
    labels,
    datasets: [
      {
        type: "bar" as const,
        label: "Gửi mail",
        data: sendMail,
        backgroundColor: "#1976d2",
        tension: 0.3,
        borderRadius: 3,
        barThickness: 15,
      },
      {
        type: "bar" as const,
        label: "Nhắn tin",
        data: messager,
        backgroundColor: "#e74c3c",
        tension: 0.3,
        borderRadius: 3,
        barThickness: 15,
      },
      {
        type: "bar" as const,
        label: "Tặng quà",
        data: gift,
        backgroundColor: "#4cd964",
        tension: 0.3,
        borderRadius: 3,
        barThickness: 15,
      },
      {
        type: "bar" as const,
        label: "Gọi điện",
        data: callPhone,
        backgroundColor: "#5856d6",
        tension: 0.3,
        borderRadius: 3,
        barThickness: 15,
      },
      {
        type: "bar" as const,
        label: "Hẹn gặp",
        data: appointment,
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
      data={config as any} height={100} />
  );
};
