import axios from "axios"

const API =axios.create({baseURL:"https://react-shopping-site.herokuapp.com"})
// const API =axios.create({baseURL:"https://react-shopping-site.herokuapp.com"})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization=`Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req
})

export const login= (formData) =>API.post("/user/login",formData);
export const register= (formData) =>API.post("/user/register",formData);
export const googleSignIn= (result) =>API.post("/user/googleSignIn",result);

export const addProduct=(productData)=>API.post("/products/add",productData);
export const getProducts= () =>API.get("/products/get");
export const getProduct= (id) =>API.get(`/products/${id}`);

export const addToCart=(data)=>API.post(`/user/${data.userId}/cart`,data)
export const getCart=(userId)=>API.get(`/user/${userId}/cart`)
