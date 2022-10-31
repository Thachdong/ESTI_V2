import { useQuery } from "react-query";
import { staff } from "src/api";
import { DashboardLayout } from "~modules-dashboard/layouts";
import { TNextPageWithLayout } from "~types/_app";

const SaleAdminStaffPage: TNextPageWithLayout = () => {
  const { data } = useQuery(["SaleAdminList"], () => staff.getListSaleAdmin());

  console.log(data?.data);

  return (
    <ul>
      {data?.data?.map((d: any) => (
        <li key={d.id}>{d.fullName}</li>
      ))}
    </ul>
  );
};

SaleAdminStaffPage.displayName = "Danh sách sale admin";

SaleAdminStaffPage.getLayout = () => (
  <DashboardLayout title="TÀI KHOẢN / DANH SÁCH NHÂN VIÊN SALE ADMIN">
    <SaleAdminStaffPage />
  </DashboardLayout>
);

export default SaleAdminStaffPage;
