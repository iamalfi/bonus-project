const mongoose = require("mongoose");

// {id,createdAt, updatedAt, deleted, status(GENERATED,COMPLETED, CANCELLED),  invoiceNumber, vendorName, vendorFullAddress, grnLineItems: grnLineItem[] , date }
const grnSchema = new mongoose.Schema(
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
            type: String,
            required: true,
        },
        vendorName: {
            type: String,
            required: true,
        },
        vendorFullAddress: {
            type: String,
            required: true,
        },
        grnLineItems: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "grnLineItem",
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("grn", grnSchema);
