import { useQuery } from "react-query";
import { customer } from "src/api/customer";
import { DashboardLayout } from "~modules-dashboard/layouts";
import { TNextPageWithLayout } from "~types/_app";

const CustomerPage: TNextPageWithLayout = () => {
  const { data } = useQuery(["CustomerList"], () =>
    customer.getList({ pageIndex: 1, pageSize: 20 })
  );

  console.log(data);

  return (
    <ul>
      {data?.data?.items.map((item) => (
        <li>{item.companyName}</li>
      ))}
    </ul>
  );
};

CustomerPage.displayName = "Danh sách khách hàng";

CustomerPage.getLayout = () => (
  <DashboardLayout title="TÀI KHOẢN / DANH SÁCH KHÁCH HÀNG">
    <CustomerPage />
  </DashboardLayout>
);

export default CustomerPage;
