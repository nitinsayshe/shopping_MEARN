const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
        name: { type: String, required: true ,trim:true},
        mobile:{type:Number,required:false,unique:true,trim:true},
        email: { type: String, required: true, unique:true,trim:true },
        password: { type: String, required: false ,trim:true},
        googleId: { type: String, required: false },
        id: { type: String },
});

module.exports = mongoose.model("User", userSchema)