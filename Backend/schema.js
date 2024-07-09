const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    image: { type: String, required: true },
    name: { type: String, required: true },
    category: {
        type: String,
        enum: ["crafts", "jewellery", "pottery", "painting"],
        required: true,
    },
    subcategory: {
        type: String,
        enum: ["Candles", "Soap", "PaperCrafts", "WoodenItems", "Necklace", "Earring", "Bangles", "JewellerySet", "CanvasPainting", "PaperPainting", "OilPainting", "WatercolorPainting", "Mug", "Bowl", "Planter", "Vase"],
    },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "admin",
        required: true,
    }
    
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
