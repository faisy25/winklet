import axios from "axios";
import ProductsPageComponent from "./components/ProductsPageComponent";

const fetchProducts = async (abctrl) => {
  const { data } = await axios.get("/api/products/admin", {
    signal: abctrl.signal
  });
  const res = data.data;
  return res;
};

const deleteProduct = async (productId) => {
  const { data } = await axios.delete(`/api/products/admin/${productId}`);
  return data.data;
};

const AdminProductsPage = () => {
  return (
    <>
      <ProductsPageComponent
        fetchProducts={fetchProducts}
        deleteProduct={deleteProduct}
      />
    </>
  );
};

export default AdminProductsPage;
