import { useQuery } from "react-query";
import { staff } from "src/api";
import { DashboardLayout } from "~modules-dashboard/layouts";
import { TNextPageWithLayout } from "~types/_app";

const DeliveryStaffPage: TNextPageWithLayout = () => {
  const { data } = useQuery(["DeliveryStaff"], () =>
    staff.getListDeliveryStaff()
  );

  console.log(data?.data);

  return (
    <ul>
      {data?.data?.map((item: any) => (
        <li key={item.id}>{item.fullName}</li>
      ))}
    </ul>
  );
};

DeliveryStaffPage.displayName = "Danh sách nhân viên phân phối";

DeliveryStaffPage.getLayout = () => (
  <DashboardLayout title="TÀI KHOẢN / DANH SÁCH NHÂN VIÊN PHÂN PHỐI">
    <DeliveryStaffPage />
  </DashboardLayout>
);

export default DeliveryStaffPage;
