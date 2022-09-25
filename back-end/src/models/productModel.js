const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
        title: { type: String, required: true, unique: true, trim: true, lowercase: true },
        description: { type: String, required: true, trim: true },
        image: { type: String },
        price: { type: Number, required: true, trim: true },
        tags: [String],
        userId: {
                type: mongoose.Types.ObjectId, ref: "User"
            },
       
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema)