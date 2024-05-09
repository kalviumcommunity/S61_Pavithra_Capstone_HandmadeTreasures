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
        enum: ["Candles", "Soap", "PaperCrafts", "WoodenItems", "Weaving", "Necklace", "Earring", "Bangles", "Bracelet", "JewellerySet", "CanvasPainting", "PaperPainting", "OilPainting", "WatercolorPainting", "Mug", "Bowl", "Planter", "Vase"],
    },
    description: { type: String, required: true },
    price: { type: Number, required: true }
    
});

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;
