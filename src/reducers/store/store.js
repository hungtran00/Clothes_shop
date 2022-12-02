import { configureStore } from '@reduxjs/toolkit'
import accountSlice from '../account/accountSlice';
import cartSlice from '../cart/cartSlice';
import productSlice from '../product/productSlice';

const store = configureStore({
    reducer: {
        product: productSlice.reducer,
        account: accountSlice.reducer,
        cart: cartSlice
    }
});
export default store;