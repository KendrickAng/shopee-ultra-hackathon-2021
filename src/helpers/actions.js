import { SET_TITLE } from "./constants";
import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  ADD_SHIPPING,
} from "./action_types/cart_actions";

export function setTitle(payload) {
  return { type: SET_TITLE, payload };
}

export const addToCart = (id) => {
  return {
    type: ADD_TO_CART,
    id,
  };
};
