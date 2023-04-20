import UserOrdersPageComponent from "./components/UserOrderPageComponent";
import axios from "axios";

const getOrders = async () => {
  const { data } = await axios.get("/api/orders");
  return data;
};

const UserOrdersPage = () => {
  return (
    <>
      <UserOrdersPageComponent getOrders={getOrders} />
    </>
  );
};

export default UserOrdersPage;
