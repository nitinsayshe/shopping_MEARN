import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api"
import { toast } from "react-toastify";

const addressSlice = createSlice({
    name: "address",
    initialState: {
        address:localStorage.getItem("address") ? JSON.parse(localStorage.getItem("address")) :{},
        error: "",
        loading: false
    },
    reducers: {
        addressItem(state, action) {
            state.address=action.payload.formValue;
            localStorage.setItem("address",JSON.stringify(state.address))
        }
    },
    extraReducers: {
        


    }
})

export const { addressItem } = addressSlice.actions;

export default addressSlice.reducer;