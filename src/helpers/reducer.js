import { SET_TITLE } from "./constants";

import Item1 from "../images/item1.jpg";
import Item2 from "../images/item2.jpg";
import Item3 from "../images/item3.jpg";
import Item4 from "../images/item3.jpg";

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
      id: 3,
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

export default rootReducer;
