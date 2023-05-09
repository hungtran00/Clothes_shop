import { createSlice } from "@reduxjs/toolkit";
// import staticMethods from "antd/es/notification";
import axios from "axios";
import { ACCESS_TOKEN, getStore, http } from "../../util/config";
const initialState = {
  arrProduct: [
    {
      id: 1,
      name: "product1",
      image: "https://i.pravatar.cc?u=1",
      price: 1000,
    },
    {
      id: 2,
      name: "product2",
      image: "https://i.pravatar.cc?u=2",
      price: 2000,
    },
  ],
  productDetail: {
    id: 1,
    name: "Adidas Prophere",
    alias: "adidas-prophere",
    price: 350,
    feature: false,
    description:
      "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
    size: ["36", "37", "38", "39", "40", "41", "42"],
    shortDescription:
      "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
    quantity: 995,
    image: "https://shop.cyberlearn.vn/images/adidas-prophere.png",
    categories: [
      {
        id: "ADIDAS",
        category: "ADIDAS",
      },
      {
        id: "MEN",
        category: "MEN",
      },
      {
        id: "WOMEN",
        category: "WOMEN",
      },
    ],
    relatedProducts: [
      {
        id: 2,
        name: "Adidas Prophere Black White",
        alias: "adidas-prophere-black-white",
        feature: false,
        price: 450,
        description:
          "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
        shortDescription:
          "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
        image:
          "https://shop.cyberlearn.vn/images/adidas-prophere-black-white.png",
      },
      {
        id: 3,
        name: "Adidas Prophere Customize",
        alias: "adidas-prophere-customize",
        feature: false,
        price: 375,
        description:
          "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
        shortDescription:
          "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
        image:
          "https://shop.cyberlearn.vn/images/adidas-prophere-customize.png",
      },
      {
        id: 5,
        name: "Adidas Swift Run",
        alias: "adidas-swift-run",
        feature: false,
        price: 550,
        description:
          "The adidas Primeknit upper wraps the foot with a supportive fit that enhances movement.\r\n\r\n",
        shortDescription:
          "The midsole contains 20% more Boost for an amplified Boost feeling.\r\n\r\n",
        image: "https://shop.cyberlearn.vn/images/adidas-swift-run.png",
      },
    ],
  },
  cartProducts: JSON.parse(localStorage.getItem("cartProduct"))
    ? JSON.parse(localStorage.getItem("cartProduct"))
    : [],
  totalQuantity: JSON.parse(localStorage.getItem("totalQuantity")) + 0,
  numberQuantity: 1,
  orderSubmit: [],
  arrFavouriteProduct: [],
  historyProduct: [],
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProductApi: (state, action) => {
      state.arrProduct = action.payload;
    },
    getDetailProductAction: (state, action) => {
      state.productDetail = action.payload;
    },
    addCartProduct: (state, action) => {
      const productCart = state.cartProducts.find(
        (prod) => prod.id == action.payload.id
      );
      if (productCart && state.numberQuantity === 1) {
        productCart.quantity += 1;
      } else if (productCart && state.numberQuantity > 1) {
        productCart.quantity += state.numberQuantity;
      } else {
        state.cartProducts.push(action.payload);
      }

      state.totalQuantity = state.cartProducts.reduce((td, prod) => {
        return td + prod.quantity;
      }, 0);
      localStorage.setItem("cartProduct", JSON.stringify(state.cartProducts));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },
    deleteCartProduct: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload
      );

      state.totalQuantity = state.cartProducts.reduce((td, prod) => {
        return td + prod.quantity;
      }, 0);

      localStorage.setItem("cartProduct", JSON.stringify(state.cartProducts));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },
    changeQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const cartProduct = state.cartProducts.find((item) => item.id === id);
      if (cartProduct) {
        cartProduct.quantity += quantity;
        if (cartProduct.quantity < 1) {
          alert("Số lượng nhỏ hơn 1");
          cartProduct.quantity -= quantity;
        }
      }
      // localStorage.setItem("cartProduct", JSON.stringify(state.cartProducts));
      state.totalQuantity = state.cartProducts.reduce((td, prod) => {
        return td + prod.quantity;
      }, 0);
      localStorage.setItem("cartProduct", JSON.stringify(state.cartProducts));
      localStorage.setItem(
        "totalQuantity",
        JSON.stringify(state.totalQuantity)
      );
    },
    // <<<<<<< HEAD
    increaseQuantity: (state, action) => {
      const { quantity } = action.payload;
      state.numberQuantity = state.numberQuantity + quantity;
      if (state.numberQuantity < 1) {
        state.numberQuantity -= quantity;
      }
      console.log(state.numberQuantity);
      // localStorage.setItem("cartProduct", JSON.stringify(state.cartProducts));
    },
    // =======
    arrFavouriteProduct: (state, action) => {
      state.arrFavouriteProduct = action.payload;
    },
    historyProductAction: (state, action) => {
      state.historyProduct = action.payload;
    },
    orderSubmitAction: (state, action) => {
      state.orderSubmit = action.payload;
    },
  },
});

export default productReducer.reducer;
export const {
  getAllProductApi,
  getDetailProductAction,
  addCartProduct,
  deleteCartProduct,
  changeQuantity,

  increaseQuantity,

  changeLike,
  arrFavouriteProduct,
  historyProductAction,
  orderSubmitAction,
} = productReducer.actions;

export const getProductApi = () => {
  return async (dispatch) => {
    const result = await axios({
      url: "https://shop.cyberlearn.vn/api/product",
      method: "GET",
    });
    const action = getAllProductApi(result.data.content);
    dispatch(action);
  };
};
export const getProductDetailApi = (id) => {
  return async (dispatch) => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/product/getbyid?id=${id}`,
      method: "GET",
    });
    const action = getDetailProductAction(result.data.content);
    dispatch(action);
  };
};

export const likeProductApi = (productId) => {
  return async (dispatch) => {
    const result = await http.get(
      `
    /api/Users/like`,
      productId
    );
    console.log(result.data.content);
  };
};

export const renderFavProduct = () => {
  return async (dispatch) => {
    let result = await axios({
      url: `https://shop.cyberlearn.vn/api/Users/getproductfavorite`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
      },
    });
    const action = arrFavouriteProduct(result.data.content.productsFavorite);
    dispatch(action);
  };
};
export const renderHistoryProduct = () => {
  return async (dispatch) => {
    const result = await axios({
      url: `https://shop.cyberlearn.vn/api/Users/getProfile`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
      },
    });
    console.log(result.data.content.ordersHistory);
    const action = historyProductAction(result.data.content.ordersHistory);
    dispatch(action);
    console.log(result.data.content.ordersHistory);
  };
};
export const orderSubmit = (orderSubmit) => {
  console.log(orderSubmit);
  return async (dispatch) => {
    const result = await axios({
      url: "https://shop.cyberlearn.vn/api/Users/order",
      method: "post",
      data: orderSubmit,
    });
    console.log(result.data.content);
    const action = orderSubmitAction(result.data.content);
    dispatch(action);
  };
};
