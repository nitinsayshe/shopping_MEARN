const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const userModel = require('../models/userModel')

exports.authentication = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        if (!token) return res.status(400).send({ status: false, message: "Token is missing" });
        token = token.split(" ")

        jwt.verify(token[1], "my@fifth@project@product@management", { ignoreExpiration: true },
            function (err, decodedToken) {
                if (err) return res.status(401).send({ status: false, message: "Token is invalid" });
                if (Date.now() > decodedToken.exp * 1000)
                    return res.status(401).send({ status: false, message: "Token expired" })

                req.userId = decodedToken.userId;

                next();
            });
    } catch (error) { //hardcoded them
        return res.status(500).send({ status: false, message: error.message })
    }
}

exports.authorization = async (req, res, next) => {
    try {
        let userId = req.params.userId
        if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).send({ status: false, message: "User id not valid" })
        const checkUser = await userModel.findById(userId)
        if (!checkUser) return res.status(404).send({ status: false, message: "User not found" })
        req.checkUser = checkUser
        if (userId != req.userId) return res.status(403).send({ status: false, message: "user not authorized" })
        next();

    } catch (error) { //hardcoded them
        return res.status(500).send({ status: false, message: error.message })
    }
}