import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const getAccount = createAsyncThunk('account/getAccount', async (arg, { rejectWithValue }) => {
    try {
        const { data } = await axios.get("https://api-shopee-three.vercel.app/api/customer")

        return data
    } catch (err) {
        rejectWithValue(err.response.data)
    }
})
export const accountSlice = createSlice({
    name: "account",
    initialState: {
        data: [],
        loading: false
    },
    reducers: {

    },
    extraReducers: {
        [getAccount.pending]: (state, { payload }) => {
            state.loading = true
        },
        [getAccount.fulfilled]: (state, { payload }) => {
            state.loading = false
            state.data = payload
        },
        [getAccount.rejected]: (state, { payload }) => {
            state.loading = false
        }
    }
})
export default accountSlice