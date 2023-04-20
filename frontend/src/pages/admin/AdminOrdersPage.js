import OrdersPageComponent from "./components/OrdersPageComponenet";
import axios from "axios";

// const getOrders = async (abctrl) => {
//   const { data } = await axios.get("/api/orders/admin", {
//     signal: abctrl.signal
//   });
//   return data;
// };
const getOrders = async () => {
  const { data } = await axios.get("/api/orders/admin");
  return data;
};

const AdminOrdersPage = () => {
  return (
    <>
      <OrdersPageComponent getOrders={getOrders} />
    </>
  );
};

export default AdminOrdersPage;
