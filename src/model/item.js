// 5.  Item
// { id,createdAt, updatedAt,deleted, productName(unique), quantity, stockPrice, sellPrice }

const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
    {
        productName: {
            type: String,
            required: true,
            unique: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        stockPrice: {
            type: Number,
            required: true,
        },
        sellPrice: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("items", itemSchema);
