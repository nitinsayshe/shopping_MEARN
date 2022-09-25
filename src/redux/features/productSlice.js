import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api"

export const addProduct = createAsyncThunk(
    "product/addProduct", async ({ updateProductData, navigate, toast }, { rejectWithValue }) => {
        try {
            console.log(">>>>>>>>>>>>>>>>>", updateProductData)
            const response = await api.addProduct(updateProductData);
            //toast.success("Login Successfully");
            alert("Product Added Succesfully")
            // navigate("/")
            console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    });


export const getProducts = createAsyncThunk(
    "product/getProducts", async (_, { rejectWithValue }) => {
        try {
            const response = await api.getProducts();
            console.log("getapiproduct", response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    });

export const getProduct = createAsyncThunk(
    "product/getProduct",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.getProduct(id);
            console.log("getapiproduct", response)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    });




const productSlice = createSlice({
    name: "product",
    initialState: {
        product: {},
        items: [],
        itemDetails:localStorage.getItem("itemDetails") ? JSON.parse(localStorage.getItem("itemDetails")) :{},
        error: "",
        loading: false
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        itemDetail(state, action) {
            state.itemDetails=action.payload;
            localStorage.setItem("itemDetails",JSON.stringify(state.itemDetails))
        }
    },
    extraReducers: {
        ///get products
        [getProducts.pending]: (state, action) => {
            state.status = "pending"
        },
        [getProducts.fulfilled]: (state, action) => {
            state.status = "success"
            state.items = action.payload.data;
        },
        [getProducts.rejected]: (state, action) => {
            state.status = "rejected"
            state.error = action.payload.message;
        },

        //add products
        [addProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [addProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.items = [action.payload];

        },
        [addProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        //get Productdetails
        [getProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [getProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.product = action.payload;
        },
        [getProduct.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },


    }
})

export const { setCurrentPage,itemDetail } = productSlice.actions;

export default productSlice.reducer;