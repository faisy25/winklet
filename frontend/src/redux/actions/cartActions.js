import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart =
  (productId, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/get-one/${productId}`);
    const res = data.data;
    console.log(res);
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        productID: res._id,
        name: res.name,
        price: res.price,
        image: res.images[0] ?? null,
        count: res.count,
        quantity
      }
    });

    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };

export const removeFromCart =
  (productID, quantity, price) => async (dispatch, getState) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: { productID: productID, quantity: quantity, price: price }
    });
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };
