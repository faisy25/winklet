// For cloudinary change !== to === for production.  line 30

import EditProductPageComponent from "./components/EditProductPageComponent";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { saveAttributeToCatDoc } from "../../redux/actions/categoryActions";
import {
  uploadImagesApiRequest,
  uploadImagesCloudinaryApiRequest,
} from "./utils/utils";

const fetchProduct = async (productId) => {
  const { data } = await axios.get(`/api/products/get-one/${productId}`);
  return data.data;
};

const updateProductApiRequest = async (productId, formInputs) => {
  const { data } = await axios.put(`/api/products/admin/${productId}`, {
    ...formInputs,
  });
  return data;
};

const AdminEditProductPage = () => {
  const { categories } = useSelector((state) => state.getCategories);
  const reduxDispatch = useDispatch();

  const imageDeleteHandler = async (imagePath, productId) => {
    let encoded = encodeURIComponent(imagePath);
    if (process.env.NODE_ENV === "production") {
      // !== to === for production
      await axios.delete(`/api/products/admin/image/${encoded}/${productId}`);
    } else {
      await axios.delete(
        `/api/products/admin/image/${encoded}/${productId}?cloudinary=true`
      );
    }
  };

  // const uploadHandler = async (images, productId) => {
  //   const formData = new FormData();

  //   Array.from(images).forEach((image) => {
  //     formData.append("images", image);
  //   });
  //   await axios.post(
  //     "/api/products/admin/upload?productId=" + productId,
  //     formData
  //   );
  // };

  return (
    <>
      <EditProductPageComponent
        categories={categories}
        fetchProduct={fetchProduct}
        updateProductApiRequest={updateProductApiRequest}
        reduxDispatch={reduxDispatch}
        saveAttributeToCatDoc={saveAttributeToCatDoc}
        imageDeleteHandler={imageDeleteHandler}
        // uploadHandler={uploadHandler}
        uploadImagesApiRequest={uploadImagesApiRequest}
        uploadImagesCloudinaryApiRequest={uploadImagesCloudinaryApiRequest}
      />
    </>
  );
};
export default AdminEditProductPage;
