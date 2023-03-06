import { CustomerDetailBasic, CustomerDetailDemand } from "~modules-dashboard/components";

export const CustomerDetailPage: React.FC = () => {
  return (
    <>
      <CustomerDetailBasic />

      <hr />

      <CustomerDetailDemand />
    </>
  );
};
