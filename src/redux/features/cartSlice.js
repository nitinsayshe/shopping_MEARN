import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api"
import { toast } from "react-toastify";

export const addToCart = createAsyncThunk(
    "cart/addToCart", async ({ productData, navigate }, { rejectWithValue }) => {
        try {
            console.log("slice product", productData)
            const response = await api.addToCart(productData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    });

export const getCart = createAsyncThunk(
    "cart/getCart", async (userId, { rejectWithValue }) => {
        try {
            const response = await api.getCart(userId);
            console.log("get cart data", response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    });

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: {},
        carts: [],

        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        cartTotalQuantity: 0,
        cartTotalAmount: 0,

        error: "",
        loading: false
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        addToCart1(state, action) {
            console.log("action payload", action.payload)
            const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.itemDetails.id);
            if (itemIndex >= 0) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.info("Increased Product Quantity", {
                    position: "top-center"
                })
            } else {
                const tempProduct = { ...action.payload.itemDetails, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success(`added new Product to cart`, {
                    position: "top-center"
                });
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            )
            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
            toast.error(`${action.payload.title}  remove from cart`, {
                position: "top-center"
            });
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1;

                toast.info("Decreased product quantity", {
                    position: "top-center",
                });
            } else if (state.cartItems[itemIndex].cartQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );

                state.cartItems = nextCartItems;

                toast.error("Product removed from cart", {
                    position: "top-center",
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        IncreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (state.cartItems[itemIndex].cartQuantity >= 1) {
                state.cartItems[itemIndex].cartQuantity += 1;

                toast.info("Increased product quantity", {
                    position: "top-center",
                });
            }

            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        getTotals(state, action) {
            let { total, quantity } = state.cartItems.reduce(
              (cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;
      
                cartTotal.total += itemTotal;
                cartTotal.quantity += cartQuantity;
      
                return cartTotal;
              },
              {
                total: 0,
                quantity: 0,
              }
            );
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
          },
        clearCart(state, action) {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.error("Cart cleared", { position: "top-center" });
        },
    },
    extraReducers: {

        //add to Cart
        [addToCart.pending]: (state, action) => {
            state.loading = true;
        },
        [addToCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.cart = [action.payload];

        },
        [addToCart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

        //get all item from carts
        ///get products
        [getCart.pending]: (state, action) => {
            state.loading = true;
        },
        [getCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.carts = action.payload;

        },
        [getCart.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },

    }
})

export const { setCurrentPage, addToCart1, removeFromCart, decreaseCart, IncreaseCart,clearCart,getTotals} = cartSlice.actions;

export default cartSlice.reducer;
