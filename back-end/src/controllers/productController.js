const productModel = require('../models/productModel')
const { isValid, validString } = require("../validator/validator")
const { uploadFile } = require("./awsController")
const mongoose = require('mongoose')
const validObjectId = mongoose.Types.ObjectId

const validTitle = /^[a-zA-Z0-9 ]{3,20}$/
const validPrice = /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/  ///------- we need to update the regex decimal 2 digits

function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}


exports.createProducts = async (req, res) => {
    try {
        let data = req.body
        data.userId=req.userId
        console.log(data)
        let checkTitle = await productModel.findOne({ title: data.title })
        if (checkTitle) return res.status(400).send({ status: false, message: "title already exists" })
        
        let product = await productModel.create(data);
        return res.status(201).send({ status: true, message: "Product created successfully", data: product })
    }
    catch (error) {
        return res.status(500).send({ status: true, message: error.message })
    }


}

exports.getAllProduct = async (req, res) => {
    try {
        const filterData = { isDeleted: false }
        priceSort = 1;
        const products = await productModel.find(filterData).sort({ price: priceSort })
        res.status(200).json({  data: products });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }



}

exports.getProductsById = async (req, res) => {
    try {
        const {id} = req.params

        if (!validObjectId.isValid(id)) return res.status(400).send({ status: false, message: "Product id not valid" })
        const productDetail = await productModel.findOne({ _id: id, isDeleted: false })

        if (!productDetail) return res.status(404).send({ status: false, message: "product not found" })
        res.status(200).json(productDetail);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

exports.UpdateProducts = async (req, res) => {
    try {

        let data = req.body
        let files = req.files
        let productId = req.params.productId

        data = JSON.parse(JSON.stringify(data));

        console.log(data, files)



        if (!validObjectId.isValid(productId)) return res.status(400).send({ status: false, message: "Product id not valid" })
        let { title, description, price, currencyId, currencyFormat, productImage, style, availableSizes, installments, isFreeShipping, ...rest } = data


        if (data.hasOwnProperty("isFreeShipping")) {
            if (!((isFreeShipping == "true") || (isFreeShipping == "false")))
                return res.status(400).send({ status: false, messsage: "isFreeShipping should be in boolean value" })
        }


        if (Object.keys(data).length == 0 && (!files)) return res.status(400).send({ status: false, message: "Please enter some data to update" })
        if (Object.keys(rest).length > 0) return res.status(400).send({ status: false, message: "Invalid attribute in request body" })

        let findProduct = await productModel.findOne({ _id: productId, isDeleted: false })
        if (!findProduct) return res.status(404).send({ status: false, message: "Product not found" })

        if (data.hasOwnProperty("title")) {
            if (!isValid(title)) return res.status(400).send({ status: false, message: "  please insert the title " })
            if (!validTitle.test(title)) return res.status(400).send({ status: false, message: 'Title is Invalid' })
            const duplicateTitle = await productModel.findOne({ title: title })
            if (duplicateTitle) return res.status(400).send({ status: false, message: 'Title already exists ' })
            findProduct.title = title
        }
        if (data.hasOwnProperty("description")) {
            if (!isValid(description)) return res.status(400).send({ status: false, message: "  please insert the description " })
            if (!isNaN(description.trim())) return res.status(400).send({ status: false, message: "description can't be a number" })
            findProduct.description = description
        }
        if (data.hasOwnProperty("price")) {
            if (!isValid(price)) return res.status(400).send({ status: false, message: " please insert the price" })
            if (!validPrice.test(price.trim())) return res.status(400).send({ status: false, message: "price is invalid " })
            findProduct.price = price
        }
        if (data.hasOwnProperty("currencyId")) { //we have to ask about updation in INR
            if (currencyId.trim() !== "INR") return res.status(400).send({ status: false, message: "currencyId is invalid " })
            findProduct.currencyId = currencyId
        }
        if (data.hasOwnProperty("currencyFormat")) { //we have to ask about updation in currency format
            if (currencyFormat.trim() !== "₹") return res.status(400).send({ status: false, message: "currencyFormat is invalid " })
            findProduct.currencyFormat = currencyFormat
        }
        if (data.hasOwnProperty("style")) {
            if (!isValid(style)) return res.status(400).send({ status: false, message: "Style is invalid" })
            findProduct.style = style
        }



        if (data.hasOwnProperty("availableSizes")) {
            if (!isValid(availableSizes)) return res.status(400).send({ status: false, message: " please insert the availableSizes" })
            availableSizes = availableSizes.toUpperCase().split(",");
            for (i of availableSizes) {
                if (!["S", "XS", "M", "X", "L", "XXL", "XL"].includes(i)) {
                    return res.status(400).send({
                        status: false,
                        message: " Enter a valid availableSizes S, XS, M, X, L, XXL, XL "
                    })
                }
            }
            findProduct.availableSizes = availableSizes
        }

        if (data.hasOwnProperty("installments")) {
            if (!isValid(installments)) return res.status(400).send({ status: false, message: " please insert the installments" })
            if (isNaN(installments)) return res.status(400).send({ status: false, message: "installments should be a number" })
            findProduct.installments = installments
        }


        if (data.hasOwnProperty("productImage")) return res.status(400).send({ status: false, message: " please insert the Product Image" })
        if (files.length && files) {
            mimetype = files[0].mimetype.split("/") //---["image",""]
            if (mimetype[0] !== "image") return res.status(400).send({ status: false, message: "Please Upload the Image File only" })
            if (files && files.length > 0) var uploadedFileURL = await uploadFile(files[0])
            findProduct.productImage = uploadedFileURL
        }



        const updatedata = await productModel.findOneAndUpdate({ _id: productId, isDeleted: false }, findProduct, { new: true })
        return res.status(200).send({ status: true, message: 'Data successfully updated', data: updatedata })



    } catch (error) {
        return res.status(500).send({ status: true, message: error.message })
    }

}

exports.DeleteProducts = async (req, res) => {
    try {
        const productId = req.params.productId

        if (!validObjectId.isValid(productId)) return res.status(400).send({ status: false, message: "Product id not valid" })
        const productDetail = await productModel.findOne({ _id: productId })
        if (!productDetail) return res.status(404).send({ status: false, message: "product not found" })

        if (productDetail.isDeleted == true) return res.status(400).send({ status: false, message: "Product already deleted" })

        await productModel.findOneAndUpdate({ _id: productId }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true })
        return res.status(200).send({ status: true, message: "Product Deleted Succesfully" })

    } catch (error) {
        return res.status(500).send({ status: true, message: error.message })
    }

}
