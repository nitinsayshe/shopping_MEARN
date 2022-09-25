const express = require("express")
const router = express.Router()
const { userRegister,userLogin,googleSignIn} = require('../controllers/userController')
const { createProducts, getAllProduct, getProductsById, UpdateProducts, DeleteProducts } = require('../controllers/productController')
const {createCart,getCartDeatils} =require("../controllers/cartController")
const {authentication} =require("../middleware/auth")


router.get("/",getAllProduct)
//============= User Routes============================================================================================//
router.post("/user/register",userRegister)
router.post("/user/login",userLogin)
router.post("/user/googleSignIn",googleSignIn)

//============= Products Routes============================================================================================//
router.post('/products/add', authentication,createProducts)
router.get('/products/get', getAllProduct)
router.get('/products/:id', getProductsById)
router.put('/products/:productId', UpdateProducts)
router.delete('/products/:productId', DeleteProducts)

///================cart////
router.post("/user/:userId/cart",createCart)
router.get("/user/:userId/cart",getCartDeatils)



module.exports = router