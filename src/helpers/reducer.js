import { SET_TITLE } from "./constants";

import Item1 from "../images/item1.jpg";
import Item2 from "../images/item2.jpg";
import Item3 from "../images/item3.jpg";
import Item4 from "../images/item3.jpg";
// import { ADD_TO_CART } from "./action_types/cart_actions";

const initialState = {
  navTitle: "Testing",
  items: [
    { id: 1, title: "Winter body", desc: "hello", price: 110, img: Item1 },
    { id: 2, title: "Adidas", desc: "this is chicken", price: 80, img: Item2 },
    {
      id: 3,
      title: "Vans",
      desc: "note: raw chicken!",
      price: 120,
      img: Item3,
    },
    {
      id: 4,
      title: "Vans",
      desc: "note: raw!!!",
      price: 120,
      img: Item4,
    },
  ],
  addedItems: [],
  total: 0,
};

function rootReducer(state = initialState, action) {
  if (action.type === SET_TITLE) {
    return Object.assign({}, state, {
      navTitle: action.payload,
    });
  }

  return state;
}

// const cartReducer = (state = initialState, action) => {
//   //INSIDE HOME COMPONENT
//   if (action.type === ADD_TO_CART) {
//     let addedItem = state.items.find((item) => item.id === action.id);
//     //check if the action id exists in the addedItems
//     let existed_item = state.addedItems.find((item) => action.id === item.id);
//     if (existed_item) {
//       addedItem.quantity += 1;
//       return {
//         ...state,
//         total: state.total + addedItem.price,
//       };
//     } else {
//       addedItem.quantity = 1;
//       //calculating the total
//       let newTotal = state.total + addedItem.price;

//       return {
//         ...state,
//         addedItems: [...state.addedItems, addedItem],
//         total: newTotal,
//       };
//     }
//   } else {
//     return state;
//   }
// };

export default rootReducer;
