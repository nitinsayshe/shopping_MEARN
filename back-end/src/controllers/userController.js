const userModel = require('../models/userModel')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs');

const secret = "test";

exports.userRegister = async (req, res) => {
    try {
        let { name, mobile, email, password } = req.body;
        console.log(req.body)

        let findEmail = await userModel.findOne({ email: email });
        if (findEmail) return res.status(400).json({ status: false, message: "Email already register" })

        let findPhone = await userModel.findOne({ mobile: mobile })
        if (findPhone) return res.status(400).json({ status: false, message: "Mobile Number already exist" })

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await userModel.create({
            email,
            password: hashedPassword,
            name: name,
            mobile, mobile
        });
        const token = jwt.sign({ email: result.email, id: result._id }, secret, {
            expiresIn: "1h",
        });
        res.status(201).json({ result, token });
        // return res.status(201).send({ status: true, message: "User Created Successfully", data: creatUser })

    } catch (err) {
        return res.status(500).json({ status: false, message: err.message })
    }
}




exports.userLogin = async function (req, res) {
    const { email, password } = req.body;

    try {
        const finduser = await userModel.findOne({ email });
        if (!finduser)
            return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect =  bcrypt.compare(password, finduser.password);

        if (!isPasswordCorrect)
            return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: finduser.email, id: finduser._id }, secret, {
            expiresIn: "1h",
        });

        res.status(200).json({ result: finduser, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
}

exports.googleSignIn = async function (req, res) {
    try {
        //con
        const { email, name, mobile, token, googleId } = req.body;
        console.log(req.body)
        const oldUser = await userModel.findOne({ email });
        if (oldUser) {
            const result = { _id: oldUser._id.toString(), email, name };
            return res.status(200).json({ result, token });
        }

        const result = await userModel.create({
            email,
            name,
            mobile,
            googleId,
        });

        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(error);
    }
};