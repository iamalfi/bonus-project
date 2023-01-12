// 4.  orderLIneItem
// {id,createdAt, updatedAt,deleted,  productName, quantity, sellPrice }

const mongoose = require("mongoose");

const orderLineItemSchema = new mongoose.Schema(
    {
        deleted: {
            type: Boolean,
            default: false,
        },
        productName: {
            type: String,
            required: true,
        },
        quantity: {
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

module.exports = mongoose.model("orderLineItem", orderLineItemSchema);
