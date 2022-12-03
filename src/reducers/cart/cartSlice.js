import { createSlice } from "@reduxjs/toolkit"


const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItem: sessionStorage.getItem("cartItem") ? JSON.parse(sessionStorage.getItem("cartItem")) : [],
        cartTotalQuanlity: 0,
        cartTotalAmount: 0,
    },
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItem.findIndex((item) => item._id === action.payload._id)
            const quanlity = parseInt(sessionStorage.getItem('quantity'));
            if (itemIndex >= 0) {
                if (quanlity && quanlity > 1) {
                    state.cartItem[itemIndex].cartQuanlity += quanlity
                    sessionStorage.setItem('quantity', 1)
                }
                else
                    state.cartItem[itemIndex].cartQuanlity += 1
            }
            else {

                const tempProduct = (quanlity && quanlity > 1) ? { ...action.payload, cartQuanlity: quanlity } : { ...action.payload, cartQuanlity: 1 }
                state.cartItem.push(tempProduct)
            }
            sessionStorage.setItem("cartItem", JSON.stringify(state.cartItem))

        },
        deleteToCart(state, action) {
            const itemIndex = state.cartItem.findIndex((item) => item._id === action.payload._id)

            if (itemIndex >= 0) {
                state.cartItem.splice(itemIndex, 1)
            }
            sessionStorage.setItem("cartItem", JSON.stringify(state.cartItem))

        },
        updateTocart(state, action) {
            const itemIndex = state.cartItem.findIndex((item) => item._id === action.payload._id)
            const actionCart = sessionStorage.getItem('action').toString()

            if (itemIndex >= 0) {
                if (actionCart && actionCart === 'true')
                    state.cartItem[itemIndex].cartQuanlity += 1
                if (actionCart && actionCart === 'false') {
                    if (state.cartItem[itemIndex].cartQuanlity > 0) {
                        state.cartItem[itemIndex].cartQuanlity -= 1
                        if (state.cartItem[itemIndex].cartQuanlity === 0)
                            state.cartItem.splice(itemIndex, 1)
                    }

                }
            }
            sessionStorage.setItem("cartItem", JSON.stringify(state.cartItem))


        },
        clearCart(state, action) {
            state.cartItem = [];
            sessionStorage.setItem('cartItem', JSON.stringify(state.cartItem))

        }
    }
})
export const { addToCart, deleteToCart, updateTocart, clearCart } = cartSlice.actions;
export default cartSlice.reducer