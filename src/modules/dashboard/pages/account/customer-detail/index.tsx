import {
  CustomerDetailBasic,
  CustomerDetailCharacteristics,
  CustomerDetailCompetitor,
  CustomerDetailDemand,
  CustomerDetailOpinion,
  CustomerDetailOrder,
  CustomerDetailStatisticChart,
} from "~modules-dashboard/components";

export const CustomerDetailPage: React.FC = () => {
  return (
    <>
      <CustomerDetailBasic />

      <hr />

      <CustomerDetailDemand />

      <hr />

      <CustomerDetailCompetitor />

      <hr />

      <CustomerDetailOpinion />

      <hr />

      <CustomerDetailCharacteristics />

      <hr />

      <CustomerDetailOrder />

      <hr />

      <CustomerDetailStatisticChart />
    </>
  );
};
