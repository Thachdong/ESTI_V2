import { useQuery } from "react-query";
import { suppliers } from "src/api";
import { DashboardLayout } from "~modules-dashboard/layouts";
import { TNextPageWithLayout } from "~types/_app";

const SuppliersPage: TNextPageWithLayout = () => {
  const { data } = useQuery(["Suppliers"], () =>
    suppliers.getList({ pageIndex: 1, pageSize: 20 })
  );

  return (
    <ul>
      {
        data?.data.items.map(item => <li key={item.id}>{item.supplierName}</li>)
      }
    </ul>
  );
};

SuppliersPage.displayName = "Danh sách nhà cung cấp";

SuppliersPage.getLayout = () => (
  <DashboardLayout title="TÀI KHOẢN / DANH SÁCH NHÀ CUNG CẤP">
    <SuppliersPage />
  </DashboardLayout>
);

export default SuppliersPage;
