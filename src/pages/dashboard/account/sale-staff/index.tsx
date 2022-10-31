import { useQuery } from "react-query";
import { staff } from "src/api";
import { DashboardLayout } from "~modules-dashboard/layouts";
import { TNextPageWithLayout } from "~types/_app";

const SaleStaffPage: TNextPageWithLayout = () => {
  const { data } = useQuery(["SaleStaffList"], () =>
    staff.getListSale()
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

SaleStaffPage.displayName = "Danh sách nhân viên sale";

SaleStaffPage.getLayout = () => (
  <DashboardLayout title="TÀI KHOẢN / DANH SÁCH NHÂN VIÊN SALE">
    <SaleStaffPage />
  </DashboardLayout>
);

export default SaleStaffPage;
