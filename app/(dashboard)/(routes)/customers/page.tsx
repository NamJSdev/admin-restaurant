import { DataCustomerTable } from "@/components/customer/app.table";

export const metadata = {
  title: 'Khách Hàng',
  description: ':List Customer By NamJS',
}
const CustomerPage = () => {
  return (
    <DataCustomerTable/>
  );
};

export default CustomerPage;
