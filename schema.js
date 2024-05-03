const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    category: {
        type: String,
        enum: ["crafts", "jewellery", "pottery", "painting"],
        required: true,
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
