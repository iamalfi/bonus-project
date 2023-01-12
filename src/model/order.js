// 3.  order
// {id,createdAt, updatedAt,deleted,status(GENERATED, COMPLETED,CANCELLED),  invoiceNumber, customerName, customerFullAddress, orderLineItems: orderLIneItem[], date}
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        deleted: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["GENERATED", "COMPLETED", "CANCELLED"],
            default: "GENERATED",
            required: true,
        },
        invoiceNumber: {
            type: Number,
            required: true,
        },
        customerName: {
            type: String,
            required: true,
        },
        customerFullAddress: {
            type: String,
            required: true,
        },
        orderLineItems: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "orderLineItem",
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
