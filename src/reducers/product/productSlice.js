import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const getProduct = createAsyncThunk('product/getProduct', async (arg, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("https://api-shopee-three.vercel.app/api/product")
        return data
    } catch (err) {
        rejectWithValue(err.response.data)
    }
})
export const productSlice = createSlice({
    name: "product",
    initialState: {
        data: [],
        loading: false
    },
    reducers: {

    },
    extraReducers: {
        [getProduct.pending]: (state, { payload }) => {
            state.loading = true
        },
        [getProduct.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        [getProduct.rejected]: (state, { payload }) => {
            state.loading = false
        }
    }
})
export default productSlice