import { useQuery } from "react-query";
import { staff } from "src/api";
import { DashboardLayout } from "~modules-dashboard/layouts";
import { TNextPageWithLayout } from "~types/_app";

export const StaffPage: TNextPageWithLayout = () => {
  const { data } = useQuery(["StaffList"], () =>
    staff.getList({ pageIndex: 1, pageSize: 20 })
  );

  console.log(data);
  

  return (
    <ul>
      {data?.data.items.map((item) => (
        <li key={item.id}>{item.fullName}</li>
      ))}
    </ul>
  );
};

StaffPage.displayName = "Danh sách nhân viên";

StaffPage.getLayout = () => (
  <DashboardLayout title="TÀI KHOẢN / DANH SÁCH NHÂN VIÊN">
    <StaffPage />
  </DashboardLayout>
);

export default StaffPage;
