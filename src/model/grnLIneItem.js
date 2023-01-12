// 2.  grnLineItem
// {id,createdAt, updatedAt,deleted,  productName, quantity, stockPrice }

const mongoose = require("mongoose");

const grnLineItemSchema = new mongoose.Schema(
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
        stockPrice: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("grnLineItem", grnLineItemSchema);
